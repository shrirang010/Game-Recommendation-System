import Input from "../../components/input/input";
import GameCard from "../../components/gameCard/gameCard";
import allStore from "../../store/store";
import { Link } from "react-router-dom";
import style from "./home.module.css";

const home = () => {
  const games = allStore((state) => state.games);

  return (
    <div className={style.container}>
      <div className={style.inner}>
        <Input />

        <Link to="/stats" className={style.statsbtn}>
          Show stats
        </Link>
      </div>
      {
        <div className={style.gameList}>
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
};

export default home;
