import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { readDeck } from "./../utils/api/index.js"
import { readCard } from "./../utils/api/index.js"
import { updateCard } from "./../utils/api/index.js"
import Form from "./../newfiles/Form.js"

function EditCard() {

    const cardId = useParams().cardId;
    const deckId = useParams().deckId;

    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState([]);

    useEffect(() => {
      readDeck(deckId).then(setDeck);
    }, [deckId]);

    useEffect(() => {
        readCard(cardId).then(setCard);
    }, [cardId]);

    const handleChange = ({target}) => {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    };

    const history = useHistory();

    const handleSubmit = ((event) => {
        event.preventDefault();
        updateCard(card);
        history.push(`/decks/${deck.id}`);
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
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
                </ol>
            </nav>            
            <h1>Edit Card</h1>
            <Form 
                type="edit" 
                card={card} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                handleCancel={handleCancel} 
            />

        </>
    )

};

export default EditCard;

