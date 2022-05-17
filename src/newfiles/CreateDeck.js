import React from "react";

import { useState } from "react"
import { useHistory } from "react-router-dom"
import { createDeck } from "./../utils/api/index.js"


function CreateDeck() {    

    const initialFormState = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const history = useHistory();

    const handleSubmit = ((event) => {
        event.preventDefault();
        createDeck(formData);
        setFormData({ ...initialFormState });
        history.push("/");
    });

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        Name
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Deck Name"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Brief description of the deck"
                            onChange={handleChange}
                            value={formData.description}
                        ></textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-3" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    ) 
};

export default CreateDeck;