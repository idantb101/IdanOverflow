import React from 'react';

const SearchBar = props => {
  let filterTermElem = '';
  const formSubmit = event => {
    event.preventDefault();
    props.setSearchTermToState(event);
    if(filterTermElem){
      filterTermElem.value = ''
    }
    // clearing filter for every search
  };
  return (
    <div>
      <form className="input-group" onSubmit={formSubmit}>
        <input
          type="text"
          className="form-control"
          name="searchTerm"
          placeholder="search term"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="submit">
            Button
          </button>
        </div>
      </form>
      {props.isApiLoaded && props.stacks ? (
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="filter by title"
            name="filterTerm"
            onChange={props.filterTermUpdate}
            ref={el => (filterTermElem = el)}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SearchBar;