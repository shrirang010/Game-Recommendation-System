import Input from "../../components/input/input";
import GameCard from "../../components/gameCard/gameCard";
import allStore from "../../store/store";
import { Link } from 'react-router-dom';
export default function MyApp() {
  const games = allStore((state) => state.games);

  return (
    <div className="container">
      <div className="inner">
        <Input />
        <div>
        {/* <a  href="/stats" className="statsbtn">Show stats !</a> */}
        <Link  aria-current="page" to="/stats">Show stats</Link>
        </div>
      </div>
      {
        <div className="game-list">
          {games.map((el, index) => {
            return (
              <GameCard
                name={el.name}
                review={el.review}
                genres={el.genres}
                categories={el.categories}
                developer={el.developer}
                release_date={el.release_date}
                free={el.free}
                rank={index + 1}
              />
            );
          })}
        </div>
      }
    </div>
  );
}
