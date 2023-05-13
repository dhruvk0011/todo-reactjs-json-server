/* eslint-disable react/prop-types */
const SearchItem = ({ searchItem, setSearchItem }) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault}>
      <label htmlFor='search'>Search</label>
      <input
        id='search'
        type='text'
        role='searchbox'
        placeholder='Search Items'
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
