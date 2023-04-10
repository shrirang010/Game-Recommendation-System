import data from "../../info.json" assert { type: "json" };

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

  for (let gameid in data) {
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

  user_games.sort((a, b) => Number(b.metric) - Number(a.metric));
  console.log("User Games are:", user_games);

  return user_games;
};

export { get_data };
