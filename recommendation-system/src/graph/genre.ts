import data from "../info.json" assert { type: "json" };
import type { genres } from "../types/genres";
import type { game_info } from "../types/gameInfo";

interface gameInfoObj {
  [id: string]: game_info;
}

const localData: gameInfoObj = data;

const get_genre_rank = (genrelist: genres) => {
  let user_games: game_info[] = [];

  for (let gameid in localData) {
    localData[gameid].genres.forEach((genre) => {
      if (genre == "Action") {
        genrelist[genre].push(Number(localData[gameid].metric));
      } else if (genre == "Adventure") {
        genrelist[genre].push(Number(localData[gameid].metric));
      } else if (genre == "Indie") {
        genrelist[genre].push(Number(localData[gameid].metric));
      } else if (genre == "RPG") {
        genrelist[genre].push(Number(localData[gameid].metric));
      } else if (genre == "Racing") {
        genrelist[genre].push(Number(localData[gameid].metric));
      } else if (genre == "Simulation") {
        genrelist[genre].push(Number(localData[gameid].metric));
      } else if (genre == "Strategy") {
        genrelist[genre].push(Number(localData[gameid].metric));
      } else if (genre == "Sports") {
        genrelist[genre].push(Number(localData[gameid].metric));
      }
    });
  }
  let action = 0;
  let adventure = 0;
  let indie = 0;
  let rpg = 0;
  let racing = 0;
  let simulation = 0;
  let strategy = 0;
  let sports = 0;
  let genre_info: number[] = [];
  let genre_el: string[] = [
    "Action",
    "Adventure",
    "Indie",
    "RPG",
    "Simulation",
    "Racing",
    "Sports",
    "Strategy",
  ];
  for (let el of genre_el) {
    if (el == "Action") {
      genrelist[el].forEach((metric, index) => {
        action = action + metric;
        if (index == genrelist["Action"].length - 1) {
          genre_info.push(action / genrelist["Action"].length);
        }
      });
    } else if (el == "Adventure") {
      genrelist[el].forEach((metric, index) => {
        adventure = adventure + metric;
        if (index == genrelist["Adventure"].length - 1) {
          genre_info.push(adventure / genrelist["Adventure"].length);
        }
      });
    } else if (el == "Indie") {
      genrelist[el].forEach((metric, index) => {
        indie = indie + metric;
        if (index == genrelist["Indie"].length - 1) {
          genre_info.push(indie / genrelist["Indie"].length);
        }
      });
    } else if (el == "RPG") {
      genrelist[el].forEach((metric, index) => {
        rpg = rpg + metric;
        if (index == genrelist["RPG"].length - 1) {
          genre_info.push(rpg / genrelist["RPG"].length);
        }
      });
    } else if (el == "Simulation") {
      genrelist[el].forEach((metric, index) => {
        simulation = simulation + metric;
        if (index == genrelist["Simulation"].length - 1) {
          genre_info.push(simulation / genrelist["Simulation"].length);
        }
      });
    } else if (el == "Racing") {
      genrelist[el].forEach((metric, index) => {
        racing = racing + metric;
        if (index == genrelist["Racing"].length - 1) {
          genre_info.push(racing / genrelist["Racing"].length);
        }
      });
    } else if (el == "Sports") {
      if (genrelist["Sports"].length == 0) {
        genre_info.push(0);
      }
      genrelist[el].forEach((metric, index) => {
        sports = sports + metric;

        if (index == genrelist["Sports"].length - 1) {
          genre_info.push(sports / genrelist["Sports"].length);
        }
      });
    } else if (el == "Strategy") {
      genrelist[el].forEach((metric, index) => {
        strategy = strategy + metric;
        if (index == genrelist["Strategy"].length - 1) {
          genre_info.push(strategy / genrelist["Strategy"].length);
        }
      });
    }
  }

  let myObject: { [key: string]: any } = {};
  for (let i = 0; i < genre_el.length; i++) {
    myObject[genre_el[i]] = genre_info[i];
  }
  console.log(myObject);
  return myObject;
};

export default get_genre_rank;
