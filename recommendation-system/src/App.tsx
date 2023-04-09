import { useState } from "react";
import "./App.css";

import Head from "./components/head/head";
import Free from "./components/free/free";
import Calendar from "./components/year/year";
import Options from "./components/options/options";
import Input from "./components/input/input";

export default function MyApp() {
  const [data, setData] = useState({
    genres: [],
    category: [],
    developer: [],
  });

  return (
    <div className="container">
      <Head />
      <div className="inner">
        <Input />
      </div>
    </div>
  );
}
