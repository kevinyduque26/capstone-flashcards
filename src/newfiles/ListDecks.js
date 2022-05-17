import React from "react";

import { Link } from "react-router-dom";

function ListDecks({ decks, handleDeleteDeck }) {
    
    const list = decks.map((deck) => (    
        <div className="card mb-4" style={{ width: "30rem" }}>
            <div className="card-body">
                <h5 className="d-inline-block card-title">{deck.name}</h5>
                <h6 className="d-inline-block card-subtitle mb-2 text-muted float-right">{`${deck.cards.length} cards`}</h6>
                <p className="card-text">{deck.description}</p>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-3" role="button">View</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary" role="button">Study</Link>
                <Link onClick={() => handleDeleteDeck(deck.id)} className="btn btn-danger float-right" role="button">Delete</Link>
            </div>
        </div>
    ));

    return list;


};

export default ListDecks;