/* eslint-disable react/prop-types */
import LineItem from "./LineItem";
const ItemList = ({ item, handleCheck, handleDelete }) => {
  return (
    <ul>
      {item.map((it) => (
        <LineItem
          key = {it.id}
          it={it}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ItemList;
