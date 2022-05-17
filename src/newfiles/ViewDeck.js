import React from "react";  
import { useState, useEffect } from "react";
import { useParams, useHistory, Switch, Route, Link } from "react-router-dom";
import { readDeck } from "./../utils/api/index.js"
import { deleteCard } from "./../utils/api/index.js"
import { deleteDeck } from "./../utils/api/index.js"
import ViewDeckCards from "./ViewDeckCards.js"
import EditDeck from "./../newfiles/EditDeck.js"
import AddCard from "./../newfiles/AddCard.js"
import EditCard from "./../newfiles/EditCard.js"
import StudyDeck from "./../newfiles/StudyDeck.js"


function ViewDeck() {

    const deckId = useParams().deckId;
    const [deck, setDeck] = useState([]);

    useEffect(() => {
      readDeck(deckId).then(setDeck);
    }, [deckId]);

    let cards = "";

    const history = useHistory();

    const handleDeleteCard = async (id) => {
        const result = window.confirm("Delete this card? You will not be able to recover it.");         
        if (result) {
          await deleteCard(id);
          history.go(0)
        };    
    };

    const handleDeleteDeck = async (id) => {
        const result = window.confirm("Delete this deck? You will not be able to recover it.");         
        if (result) {
          await deleteDeck(id);
          history.push("/")
        };    
    };

    if(deck.id) {
        cards = deck.cards.map((card) => (
            <ViewDeckCards card={card} handleDeleteCard={handleDeleteCard} deckId={deck.id} />
        ))
    };

    return (
        <section>
            <Switch>
                <Route exact path="/decks/:deckId">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                        </ol>
                    </nav>
                    <div>
                        <h1>{deck.name}</h1>
                        <p>{deck.description}</p>
                        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-3" role="button">Edit</Link>
                        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-3" role="button">Study</Link>
                        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mr-3" role="button">Add Cards</Link>
                        <Link onClick={() => handleDeleteDeck(deck.id)} className="btn btn-danger" role="button">Delete</Link>
                    </div>
                    <h1 className="mt-5">Cards</h1>
                    {cards}
                </Route>
                <Route path="/decks/:deckId/edit">
                    <EditDeck />
                </Route>
                <Route path="/decks/:deckId/cards/new">
                    <AddCard />
                </Route>
                <Route path="/decks/:deckId/cards/:cardId/edit">
                    <EditCard />
                </Route>
                <Route path="/decks/:deckId/study">
                    <StudyDeck />
                </Route>
            </Switch>
        </section>

    )
};

export default ViewDeck;