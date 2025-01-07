import { useState, useEffect, useCallback, useMemo } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [title, setTitle] = useState("");

  const handleSearchChange = useCallback((e) => {
    setSearchKeyword(e.target.value);
  }, []);

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const filteredMonsters = useMemo(() => {
    const lowercasedSearchKeyword = searchKeyword.toLowerCase();
    return monsters.filter((monster) =>
      monster.name.toLowerCase().includes(lowercasedSearchKeyword)
    );
  }, [monsters, searchKeyword]);

  useEffect(() => {
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
      <h1 className="app-title">{title}</h1>
      <SearchBox
        placeholder="search"
        className="search-box"
        onChangeHandler={handleSearchChange}
      />
      <br />
      <SearchBox
        placeholder="Write Title"
        className="search-box"
        onChangeHandler={handleTitleChange}
      />

      <CardList monsters={filteredMonsters} isLoading={isLoading} />
    </div>
  );
};

export default App;
