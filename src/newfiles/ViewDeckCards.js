import React from "react";
import { Link } from "react-router-dom";  

function ViewDeckCards({ card, handleDeleteCard, deckId }) {

    return (
        <div className="card mb-4" style={{ width: "40rem" }}>
            <div className="card-body">
                <div className="container">
                    <div className="row">
                        <p className="col card-text text-muted">{card.front}</p>
                        <p className="col card-text text-muted float-right">{card.back}</p>
                    </div>
                </div>
                <Link onClick={() => handleDeleteCard(card.id)} className="btn btn-danger float-right mr-3" role="button">Delete</Link>
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary float-right mr-3" role="button">Edit</Link>
            </div>
        </div>
    )

}

export default ViewDeckCards;