import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { readDeck } from "./../utils/api/index.js";
import { Switch, Route, Link } from "react-router-dom";
import AddCard from "./../newfiles/AddCard.js"

function StudyDeck() {

    const deckId = useParams().deckId;

    const [deck, setDeck] = useState([]);
    const [cardCount, setCardCount] = useState(0)
    const [cardFront, setCardFront] = useState(true)

    useEffect(() => {
        readDeck(deckId).then(setDeck);
    }, [deckId]);

    const handleFinalNext = () => {
        setCardFront(true);
        setCardCount(cardCount + 1);
    };

    const history = useHistory();

    const handleRestart = () => {
        const result = window.confirm("Restart cards? Click 'cancel' to return to the home page.");         
        if (result) {
            setCardFront(true);
            setCardCount(0);
        } else {
          history.push("/")  
        }    
    };
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>Study: {deck.name}</h1>
            {deck.id && deck.cards.length > 2 && 
                <div className="card mt-4" style={{ width: "40rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Card {cardCount + 1} of {deck.cards.length}</h5>
                        <p className="card-text">{cardFront ? deck.cards[cardCount].front : deck.cards[cardCount].back}</p>
                        <Link onClick={() => setCardFront(!cardFront)} className="btn btn-secondary mr-3" role="button">Flip</Link>
                        {!cardFront && <Link onClick={()=> cardCount !== deck.cards.length - 1 ? handleFinalNext() : handleRestart(deck.id)} className="btn btn-primary" role="button">Next</Link>} 
                    </div>
                </div>
            }
            {deck.id && deck.cards.length < 3 && 
                <div>
                    <h2>Not enough cards.</h2>
                    <p>You need at least 3 cards to study. There are {deck.cards.length} cards in the deck.</p>
                    <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mr-3" role="button">Add Cards</Link>
                </div>
            }
            <Switch>
                <Route path="/decks/:deckId/cards/new">
                    <AddCard />
                </Route>
            </Switch>
        </>
    );  

};

export default StudyDeck;