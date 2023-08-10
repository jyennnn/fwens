const SearchBar = (props) => {
    return ( 
        <div className="search-bar">
          <input 
            value={props.searchQuery}
            onChange={props.searchChange}/>
          <button className="search" autoComplete="off">search</button>
        </div>
     );
}
 
export default SearchBar;