import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { readDeck } from "./../utils/api/index.js"
import { updateDeck } from "./../utils/api/index.js"

function EditDeck() {

    const deckId = useParams().deckId;

    const [deck, setDeck] = useState([]);

    useEffect(() => {
        readDeck(deckId).then(setDeck);
    }, [deckId]);

    const handleChange = ({target}) => {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    };

    const history = useHistory();

    const handleSubmit = ((event) => {
        event.preventDefault();
        updateDeck(deck);
        history.push(`/decks/${deck.id}`);
    });

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        Name
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={deck.name}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={handleChange} 
                            value={deck.description}
                        >{deck.description}</textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-3" onClick={() => history.push(`/decks/${deck.id}`)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );    

};

export default EditDeck;