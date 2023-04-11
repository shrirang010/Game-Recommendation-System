import data from "../../info.json" assert { type: "json" };
import { developers } from "../input/options";

interface gameInfoObj {
  [id: string]: game_info;
}

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

const localData: gameInfoObj = data;

const get_data = (
  genres: string[],
  categories: string[],
  studio: string[],
  free_flag: string
) => {
  let user_games: game_info[] = [];
  console.log("Generes", genres, "categories", categories, "studio", studio, "Free ?", free_flag)

  if (genres.length != 0 && categories.length != 0 && studio.length != 0) {
  
    for (let gameid in localData) {
      if (localData[gameid].free === free_flag) {
        localData[gameid].genres.forEach((genre) => {
          if (genres.includes(genre)) {
            localData[gameid].categories.forEach((category) => {
              if (categories.includes(category)) {
                console.log(gameid);
                localData[gameid]["developer"].forEach((developer) => {
                  if (studio.includes(developer)) {
                    if (!user_games.includes(localData[gameid])) {
                      user_games.push(localData[gameid]);
                    }
                  }
                });
              }
            });
          }
        });
      }
    }
  }

  else if (genres.length == 0 || studio.length == 0 || categories.length == 0) {
    if (genres.length != 0 && studio.length == 0 && categories.length == 0) {
      for (let gameid in localData) {
        if (localData[gameid].free == free_flag) {

          localData[gameid].genres.forEach(genre => {
            if (genres.includes(genre)) {
              if (!user_games.includes(localData[gameid])) {
                user_games.push(localData[gameid])
              }
            }
          });
        }
      }
    }
    else if (studio.length != 0 && genres.length == 0 && categories.length == 0) {
      for (let gameid in localData) {
        if (localData[gameid].free == free_flag) {

          localData[gameid].developer.forEach(developer => {
            if (studio.includes(developer)) {
              if (!user_games.includes(localData[gameid])) {
                user_games.push(localData[gameid])
              }
            }
          });
        }
      }
    }
    else if (categories.length != 0 && genres.length == 0 && studio.length == 0) {
      for (let gameid in localData) {
        if (localData[gameid].free == free_flag) {

          localData[gameid].categories.forEach(category => {
            if (categories.includes(category)) {
              if (!user_games.includes(localData[gameid])) {
                user_games.push(localData[gameid])
              }
            }
          });
        }
      }
    }
    else if (genres.length != 0 && categories.length != 0 && studio.length == 0) {
      for (let gameid in localData) {
        if (localData[gameid].free == free_flag) {

          localData[gameid].genres.forEach((genre) => {
            if (genres.includes(genre)) {
              localData[gameid].categories.forEach((category) => {
                if (categories.includes(category)) {
                  if (!user_games.includes(localData[gameid])) {
                    user_games.push(localData[gameid])
                  }
                }
              })
            }
          })
        }
      }
    }
  
    else if (genres.length != 0 && studio.length != 0 && categories.length == 0) {
      for (let gameid in localData) {
        if (localData[gameid].free == free_flag) {

          localData[gameid].genres.forEach((genre) => {
            if (genres.includes(genre)) {
              localData[gameid].developer.forEach((developer) => {
                if (studio.includes(developer)) {
                  if (!user_games.includes(localData[gameid])) {
                    user_games.push(localData[gameid])
                  }
                }
              })
            }
          })
        }
      }
    }
    else if (studio.length != 0 && categories.length != 0 && genres.length == 0) {
      for (let gameid in localData) {
        if (localData[gameid].free == free_flag) {

          localData[gameid].developer.forEach((developer) => {
            if (studio.includes(developer)) {
              localData[gameid].categories.forEach((category) => {
                if (categories.includes(category)) {
                  if (!user_games.includes(localData[gameid])) {
                    user_games.push(localData[gameid])
                  }
                }
              })
            }
          })
        }
      }
    }
  }
  user_games.sort((a, b) => Number(b.metric) - Number(a.metric));
  console.log("User Games are:", user_games);

  return user_games;
};

export { get_data };
