import Card from "../card/card.component";
import "./card-list.styles.css";

const CardList = ({ monsters, isLoading }) => {
  return (
    <div className="card-list">
      {isLoading && "Loading..."}
      {!isLoading &&
        monsters.map((monster) => {
          const { id, name, email } = monster;
          return <Card key={id} id={id} name={name} email={email} />;
        })}
    </div>
  );
};

export default CardList;
