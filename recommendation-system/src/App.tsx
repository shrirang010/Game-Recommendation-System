import Head from "./components/head/head";
import Input from "./components/input/input";
import GameCard from "./components/gameCard/gameCard";
import Footer from "./components/footer/footer";
import allStore from "./store/store";
import "./App.css";

interface game_info {
  name: string;
  free: string;
  release_date: string;
  developer: string[];
  genres: string[];
  categories: string[];
  metric: string;
  review: string;
}

export default function MyApp() {
  const games = allStore((state) => state.games);

  return (
    <div className="container">
      <Head />
      <div className="inner">
        <Input />
      </div>
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
      <Footer />
    </div>
  );
}
