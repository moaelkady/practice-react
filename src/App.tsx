import { useState, useEffect, useCallback, useMemo, ChangeEvent } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import { fetchMonsters } from "./utils/data.utils";
import "./App.css";

export type Monster = {
  id: number;
  name: string;
  email: string;
}
const App = () => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [title, setTitle] = useState("");

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }, []);

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const filteredMonsters = useMemo(() => {
    const lowercasedSearchKeyword = searchKeyword.toLowerCase();
    return monsters.filter((monster) =>
      monster.name.toLowerCase().includes(lowercasedSearchKeyword)
    );
  }, [monsters, searchKeyword]);

  useEffect(() => {
    const fetchData = async () => {
      const monsters = await fetchMonsters<Monster[]>("https://jsonplaceholder.typicode.com/users");
      setMonsters(monsters);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="app-title">{title || "Monster Rolodex"}</h1>
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

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
