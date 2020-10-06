import React, { Component } from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      robots: [],
      searchfield: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users', {
      'Access-Control-Allow-Origin:': 'http://localhost:3000/'
    })
      .then((res) => res.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (e) => {
    this.setState({ searchfield: e.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;

    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">Robofriends</h1>
        <Searchbox searchChange={this.onSearchChange}></Searchbox>
        <Scroll>
          <CardList robots={filteredRobots}></CardList>
        </Scroll>
      </div>
    );
  }
}

// 19. 00:00

export default App;
