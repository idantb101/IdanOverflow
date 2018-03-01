import React from 'react';

const SingleStack = props => {
  return (
    <tr>
      <th scope="row">{props.stack.title}</th>
      <th>
        <a href={props.stack.link} target="_blank">
          Link
        </a>
      </th>
      <th>{props.stack.score}</th>
      <th>{props.stack.answer_count}</th>
      <th>{props.stack.view_count}</th>
      <th>{props.stack.creation_date}</th>
      <th>{props.stack.tags.map((tag, i) => <span key={i}> {tag} </span>)}</th>
    </tr>
  );
};

export default SingleStack;
