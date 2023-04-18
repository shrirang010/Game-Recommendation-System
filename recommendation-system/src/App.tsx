import { BrowserRouter, Routes, Route } from "react-router-dom";
import Head from "./components/head/head";
import Input from "./components/input/input";
import GameCard from "./components/gameCard/gameCard";
import Footer from "./components/footer/footer";
import allStore from "./store/store";
import Statistics from "./components/statistics/statistics";
import Home from "../src/routes/home/home"
import "./App.css";



export default function MyApp() {
  const games = allStore((state) => state.games);

  return (

      <div className="container">
    <BrowserRouter>
        <Routes>
        <Route  path="/home"  element={<Home/>}/>
        <Route  path='/stats' element={<Statistics />}/>
        <Footer/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
