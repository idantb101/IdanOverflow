import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ResultsBox from './components/ResultsBox';
import Paging from './components/Paging';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      stacks: {},
      notFilteredStacks: {},
      owners: [],
      pageNumber: 1,
      numberOfPages: 1,
      searchTerm: ''
    };
  }
  searchStackOver = event => {
    fetch(
      `https://api.stackexchange.com/2.2/search?site=stackoverflow&order=desc&sort=votes&intitle=${
        this.state.searchTerm
      }&page=${this.state.pageNumber}&pagesize=30`
    )
      .then(res => res.json())
      .then(
        result => {
          if (result.items && result.items.length > 0) {
            // grouping the stacks array by users id (owner)
            const usersToSort = result.items.reduce((acc, { owner }) => {
              // seting id to be reused
              const id = owner.user_id;
              return acc[id] // creating an object based on user id with a counter
                ? // if an object with the id exists -> add to counter
                  {
                    ...acc,
                    [id]: {
                      ...acc[id],
                      localAnswerCount: acc[id].localAnswerCount + 1
                    }
                  }
                : // else create one and add a counter with value one
                  { ...acc, [id]: { ...owner, localAnswerCount: 1 } };
            }, {});
            const owners = Object.values(usersToSort).sort(
              // sorting the users by the counter and creatnig the object to and array
              (a, b) => b.localAnswerCount - a.localAnswerCount
            );
            this.setState({
              isLoaded: true,
              stacks: result,
              notFilteredStacks: result,
              owners: owners,
              numberOfPages: result.quota_remaining
            });
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error,
            pageNumber: 0,
            numberOfPages: 0
          });
        }
      );
  };
  // maintaining controlled components
  setSearchTermToState = event => {
    this.setState({ searchTerm: event.target.searchTerm.value }, () => {
      this.searchStackOver();
    });
  };

  nextPage = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 }, () => {
      this.searchStackOver();
    });
  };

  previesPage = () => {
    this.setState({ pageNumber: this.state.pageNumber - 1 }, () => {
      this.searchStackOver();
    });
  };

  filterByUser = userId => {
    let stacksObject = Object.assign({}, this.state.notFilteredStacks);
    const filteredItems = stacksObject.items.filter(
      stack => stack.owner.user_id === userId
    );
    stacksObject.items = filteredItems;
    this.setState({ stacks: stacksObject });
  };

  filterTermUpdate = event => {
    let stacksObject = Object.assign({}, this.state.notFilteredStacks);
    const filteredItems = stacksObject.items.filter(stack =>
      stack.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    stacksObject.items = filteredItems;
    this.setState({ stacks: stacksObject });
  };

  render() {
    return (
      <div>
        <header>
          <h1 className="text-center text-primary">Idan Overflow</h1>
        </header>
        <SearchBar
          setSearchTermToState={this.setSearchTermToState}
          filterTermUpdate={this.filterTermUpdate}
          isApiLoaded={this.state.isLoaded}
          stacks={this.state.stacks}
        />
        <ResultsBox
          isApiLoaded={this.state.isLoaded}
          stacks={this.state.stacks}
          owners={this.state.owners}
          apiError={this.state.error}
          filterByUser={this.filterByUser}
          filterTerm={this.state.filterTerm}
        />
        <Paging
          pageNumber={this.state.pageNumber}
          numberOfPages={this.state.numberOfPages}
          nextPage={this.nextPage}
          previesPage={this.previesPage}
        />
      </div>
    );
  }
}

export default App;
