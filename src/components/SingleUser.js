import React from 'react';
import '../App.css';

const SingleUser = props => {
  return (
    <div className="card userProfileWidth">
      <img
        className="imgSize card-img-top"
        src={props.owner.profile_image}
        alt={`profile for ${props.owner.display_name}`}
      />
      <div className="card-body">
        <h5 className="card-title">{props.owner.display_name}</h5>
        <p className="card-text">
          Reputation {props.owner.reputation} <br />
          Local answer count : {props.owner.localAnswerCount}
        </p>
        <a
          href={props.owner.link}
          target="_blank"
          className="buttonCustomSize btn btn-primary"
        >
          Link to profile
        </a>
        <button
          className="buttonCustomSize btn btn-primary"
          onClick={() => props.filterByUser(props.owner.user_id)}
        >
          Filter by user
        </button>
      </div>
    </div>
  );
};

export default SingleUser;
