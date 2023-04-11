import style from "./gameCard.module.css";

interface proptype {
  name: string;
  review: string;
  genres: string[];
  categories: string[];
  developer: string[];
  release_date: string;
  free: string;
}

const gameCard = (props: proptype) => {
  return (
    <div className={style.container}>
      <div className={style.name}>{props.name}</div>

      <div>
        <div className={style.title}>Review</div>
        <div className={style.review}>{props.review}</div>
      </div>

      <div>
        <div className={style.title}>Genre</div>
        <div className={style.grid}>
          {props.genres.map((el) => {
            return <div>{el},</div>;
          })}
        </div>
      </div>

      <div>
        <div className={style.title}>Category</div>
        <div className={style.grid}>
          {props.categories.map((el) => {
            return <div>{el},</div>;
          })}
        </div>
      </div>

      <div>
        <div className={style.title}>Developer</div>
        <div className={style.grid}>
          {props.developer.map((el) => {
            return <div>{el},</div>;
          })}
        </div>
      </div>

      <div className={style.title}>Release Date</div>
      <div>{props.release_date}</div>

      <div className={style.title}>Free</div>
      <div>{props.free === "TRUE" ? "Yes" : "No"}</div>
    </div>
  );
};

export default gameCard;
