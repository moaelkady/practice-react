import React, { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      isLoading: true,
      searchKeyword: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) =>
        this.setState({ monsters: data, isLoading: false }, () =>
          console.log(this.state)
        )
      );
  }

  handleSearchChange = (e) => {
    this.setState({ searchKeyword: e.target.value });
  };

  render() {
    const { monsters, searchKeyword, isLoading } = this.state;
    const { handleSearchChange } = this;

    const lowercasedSearchKeyword = searchKeyword.toLowerCase();
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(lowercasedSearchKeyword);
    });

    return (
      <div className="App">
        <SearchBox
          placeholder="search monsters"
          className="search-box"
          onChangeHandler={handleSearchChange}
        />
        <CardList monsters={filteredMonsters} isLoading={isLoading} />
      </div>
    );
  }
}

export default App;
