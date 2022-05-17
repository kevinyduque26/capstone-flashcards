import React from "react";

import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import { readDeck } from "./../utils/api/index.js"
import { createCard } from "./../utils/api/index.js"
import Form from "./../newfiles/Form.js"

function AddCard() {

    const deckId = useParams().deckId;

    const initialCardData = {
        front: "",
        back: "",
        deckId: deckId
    }

    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({...initialCardData});

    useEffect(() => {
      readDeck(deckId).then(setDeck);
    }, [deckId]);

    const handleChange = ({target}) => {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    };

    const history = useHistory();

    const handleSubmit = ((event) => {
        event.preventDefault();
        createCard(deck.id, card);
        setCard({ ...initialCardData });
    });

    const handleCancel = () => {
        history.push(`/decks/${deck.id}`)
    };

    return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
        <h1>{deck.name}: Add Card</h1>
        <Form 
            type="add" 
            card={card} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit}
            handleCancel={handleCancel} 
        />

    </>
    );
}

export default AddCard;

/*
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea
                        className="form-control"
                        id="front"
                        name="front"
                        placeholder="Front side of card"
                        onChange={handleChange}
                        value={card.front}
                    ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                    <textarea
                        className="form-control"
                        id="back"
                        name="back"
                        placeholder="Back side of card"
                        onChange={handleChange} 
                        value={card.back}
                    ></textarea>
            </div>
            <button type="button" className="btn btn-secondary mr-3" onClick={() => history.push(`/decks/${deck.id}`)}>Done</button>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
*/