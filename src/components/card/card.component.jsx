import { useEffect } from "react";
import "./card.styles.css";
const Card = ({ id, name, email }) => {
  useEffect(() => {
    return () => {
      console.log(`Card ${id} component unmounted`);
    };
  }, []);
  return (
    <div className="card-container">
      <img
        src={`https://robohash.org/${id}?set=set2&size=180x180`}
        alt="monster"
      />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};
export default Card;
