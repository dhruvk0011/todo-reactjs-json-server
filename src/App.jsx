import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import apiRequest from "./api/apiRequest.js";

function App() {
  const API_URL = `http://localhost:3500/items`;
  const [items, setItem] = useState([]);

  const [newItem, setNewItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // using useEffect (to occur only on load time)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        setItem(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    // Rest API simulation (loading time)
    setTimeout(() => {
      fetchItems(); // immediately invoked function expression also can be used
    }, 1100);
  }, []);

  const changeItems = (newItemList) => {
    setItem(newItemList);
  };
  // add item to list
  const addItem = async (it) => {
    const id = items.length ? items[items.length - 1].id + 1 : 0;
    const myNewItem = { id, checked: false, content: it };
    const listItem = [...items, myNewItem];
    changeItems(listItem);

    // updating list in JSON file
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  // marks list item check.
  const handleCheck = async (id) => {
    const listItems = items.map((it) =>
      it.id === id ? { ...it, checked: !it.checked } : it
    );
    changeItems(listItems);

    const updatedItem = listItems.filter((it) => it.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: updatedItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`; // new URL to update specific item
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  // handles deletion of list item
  const handleDelete = async (id) => {
    const listItem = items.filter((it) => it.id !== id);
    changeItems(listItem)

    const deleteOptions = {method : "DELETE"};
    const reqUrl = `${API_URL}/${id}`; // new URL to update specific item
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  //handle new list item submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    // addItem
    addItem(newItem); // calls addItem() to update list (coded above).
    setNewItem("");
    console.log({ newItem });
  };

  return (
    <React.Fragment>
      <div className='App'>
        <Header title='Todo List' />

        <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />

        <SearchItem searchItem={searchItem} setSearchItem={setSearchItem} />

        <main>
          {isLoading && <p>Loading Items...</p>}
          {/* error won't occur untill happens */}
          {fetchError && (
            <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
          )}
          {!fetchError && !isLoading && (
            <Content
              item={
                searchItem === undefined // no value in search bar
                  ? items
                  : items.filter((it) =>
                      it.content
                        .toLowerCase()
                        .includes(searchItem.toLowerCase())
                    )
              }
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          )}
        </main>
        <Footer length={items.length} />
      </div>
    </React.Fragment>
  );
}

export default App;
