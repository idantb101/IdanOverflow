import React from 'react';
import SingleStack from './SingleStack';
import SingleUser from './SingleUser';
import '../App.css';

const ResultsBox = props => {
  const renderStacks = () => {
    if (props.isApiLoaded && props.stacks) {
      return (
        <main>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Link</th>
                <th scope="col">Score</th>
                <th scope="col">Answer Count</th>
                <th scope="col">View Count</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Tags</th>
              </tr>
            </thead>
            <tbody>
              {props.stacks.items.map((stack, i) => (
                <SingleStack key={i} stack={stack} />
              ))}
            </tbody>
          </table>

          <section className="flexWrapper">
            {props.owners.map((owner, i) => (
              <SingleUser
                key={i}
                owner={owner}
                filterByUser={props.filterByUser}
              />
            ))}
          </section>
        </main>
      );
    } else {
      if (props.isApiLoaded && props.error) {
        return;
      }
    }
  };

  return <div>{renderStacks()}</div>;
};

export default ResultsBox;
