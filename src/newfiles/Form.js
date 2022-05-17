import React from "react";

function Form({ type, card, handleChange, handleSubmit, handleCancel }) {

    return (
        <form onSubmit={() => handleSubmit()}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea
                        className="form-control"
                        id="front"
                        name="front"
                        placeholder={type === "add" && "Front side of card"}
                        onChange={() => handleChange()}
                        value={card.front}
                    >{type === "edit" && card.front}</textarea>
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                    <textarea
                        className="form-control"
                        id="back"
                        name="back"
                        placeholder={type === "add" && "Back side of card"}
                        onChange={() => handleChange()}
                        value={card.back}
                    >{type === "edit" && card.back}</textarea>
            </div>
            <button type="button" className="btn btn-secondary mr-3" onClick={() => handleCancel()}>{type ==="edit" ? "Cancel" : "Done"}</button>
            <button type="submit" className="btn btn-primary">{type === "edit" ? "Submit" : "Save"}</button>
        </form>
    )

}

export default Form;