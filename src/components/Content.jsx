/* eslint-disable react/prop-types */
import React from 'react'
import ItemList from "./ItemList";

const Content = ({ item, handleCheck, handleDelete }) => {
  return (
    <React.Fragment>
      {item.length ? (
        <ItemList
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </React.Fragment>
  );
};

export default Content;
