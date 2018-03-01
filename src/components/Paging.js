import React from 'react';
import '../App.css';

const Paging = props => {
  return (
    <section className="centerButton">
      {props.pageNumber < props.numberOfPages ? (
        <button className="btn btn-primary m-1" onClick={props.nextPage}>
          Next page
        </button>
      ) : (
        ''
      )}
      {props.pageNumber > 1 ? (
        <button className="btn btn-primary m-1" onClick={props.previesPage}>
          Previes page
        </button>
      ) : (
        ''
      )}
    </section>
  );
};

export default Paging;
