import style from "./head.module.css";
import controller from "../../../src/assets/controller.svg";

const head = () => {
  return (
    <div className={style.container}>
      Game Recommender <img src={controller} alt="" />
    </div>
  );
};

export default head;
