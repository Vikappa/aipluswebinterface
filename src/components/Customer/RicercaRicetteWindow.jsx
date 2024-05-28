import { useState } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import React from "react";

const RicercaRicetteWindow = () => {
  const [query, setQuery] = useState('')

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search(query);
  };

  const search = (query) => {
    console.log("Search query:", query)
  };

  return (
    <>
      <h3>Ricerca:</h3>
      <Form onSubmit={handleSubmit} className="d-flex my-2 my-lg-0">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={query}
          onChange={handleInputChange}
        />
        <Button variant="outline-success" type="submit">Search</Button>
      </Form>
    </>
  );
};

export default RicercaRicetteWindow;
