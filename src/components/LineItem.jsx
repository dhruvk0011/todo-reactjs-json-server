/* eslint-disable react/prop-types */
import { FaTrashAlt } from "react-icons/fa";
const LineItem = ({ it, handleCheck, handleDelete }) => {
  return (
    <li className='item' key={it.id}>
      <input
        type='checkbox'
        onChange={() => handleCheck(it.id)}
        checked={it.checked}
      />

      <label style={it.checked ? { textDecoration: "line-through" } : null}>
        {it.content}
      </label>

      <FaTrashAlt
        onClick={() => handleDelete(it.id)}
        role='button'
        tabIndex={0}
        aria-label={`Delete ${it.content}`}
      />
    </li>
  );
};

export default LineItem;
