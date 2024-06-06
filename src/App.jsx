import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import { fetchItems } from "./api";
import ItemList from "./components/ItemList";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
      setLoading(false);
    };
    getItems();
  }, []);

  useEffect(() => {
    const results = items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setNoResults(results.length === 0);
  }, [searchQuery, items]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="Container">
      <Typography variant="h4" gutterBottom>
        GoBananas Assignment
      </Typography>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {noResults ? (
            <Typography variant="h6" gutterBottom>
              No results found
            </Typography>
          ) : (
            <ItemList items={filteredItems} />
          )}
        </>
      )}
    </Container>
  );
};

export default App;
