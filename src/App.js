import { useState, useEffect, useCallback, useMemo } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = useCallback((e) => {
    setSearchKeyword(e.target.value);
  }, []);

  const filteredMonsters = useMemo(() => {
    const lowercasedSearchKeyword = searchKeyword.toLowerCase();
    return monsters.filter((monster) =>
      monster.name.toLowerCase().includes(lowercasedSearchKeyword)
    );
  }, [monsters, searchKeyword]);

  useEffect(() => {
    console.log("App component mounted");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setMonsters(data);
        setIsLoading(false);
      });

    return () => {
      console.log("App component unmounted");
    };
  }, []);

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        placeholder="search monsters"
        className="search-box"
        onChangeHandler={handleSearchChange}
      />
      <CardList monsters={filteredMonsters} isLoading={isLoading} />
    </div>
  );
};

export default App;
