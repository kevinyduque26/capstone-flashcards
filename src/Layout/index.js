import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";

import { useState, useEffect } from "react"
import { Route, Switch, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { listDecks } from "./../utils/api/index.js";
import { deleteDeck } from "./../utils/api/index.js";
import ListDecks from "./../newfiles/ListDecks.js";
import CreateDeck from "./../newfiles/CreateDeck.js";
import ViewDeck from "./../newfiles/ViewDeck.js";
import StudyDeck from "./../newfiles/StudyDeck.js";

function Layout() {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks);
    return () => abortController.abort();
  }, []);

  const history = useHistory();

  const handleDeleteDeck = async (id) => {
    const result = window.confirm("Delete this deck? You will not be able to recover it.");         
    if (result) {
      await deleteDeck(id);
      history.go(0)
    };    
  };
 
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new" className="btn btn-secondary mb-4" role="button">Create</Link>
            <ListDecks decks={decks} handleDeleteDeck={handleDeleteDeck}/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Layout;
