import Head from "./components/head/head";
import Input from "./components/input/input";
import GameCard from "./components/gameCard/gameCard";
import Footer from "./components/footer/footer";
import allStore from "./store/store";
import Statistics from "./components/statistics/statistics";
import "./App.css";

export default function MyApp() {
  const games = allStore((state) => state.games);

  return (
    <div className="container">
      <Head />
      <div className="inner">
        <Input />
      </div>
      {/* <Statistics /> */}
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
      <Footer />
    </div>
  );
}
