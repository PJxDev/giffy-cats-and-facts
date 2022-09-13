import { useEffect, useState } from "react";
import GenImg from "./GenImg";
import "./App.css";

const catAPI = "https://catfact.ninja/fact";
const API_KEY = "BQohfWTMf75GYBcGNWH74YXkKLiUqS92";
const limit = 10;
const offset = Math.floor(Math.random() * 10);
const lang = "en";

const getGifAPIurl = (keywords) => {
  return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keywords}&limit=${limit}&offset=${offset}&rating=g&lang=${lang}`;
};

function App() {
  const [fact, setFact] = useState("");
  const [image, setImage] = useState([[], [], []]);

  const getGifs = (keywords) => {
    fetch(getGifAPIurl(keywords))
      .then((res) => res.json())
      .then((data) => {
        setImage([
          [data.data[0].title, data.data[0].images.fixed_width.url],
          [data.data[1].title, data.data[1].images.fixed_width.url],
          [data.data[2].title, data.data[2].images.fixed_width.url],
        ]);
      });
  };

  const useGetKeywords = () => {
    useEffect(() => {
      fetch(catAPI)
        .then((res) => res.json())
        .then((data) => {
          setFact(data.fact || "Data not found");
          getGifs(data?.fact?.split(" ", 5).join(" "));
        });
    }, []);
  };

  useGetKeywords();

  return (
    <div className="App">
      <h1>GIFS, CATS and FACTS</h1>
      <section id="main-section">
        <header>
          <h3>{fact}</h3>
        </header>
        <div className="images__section">
          <GenImg image={image[0]} />
          <GenImg image={image[1]} />
          <GenImg image={image[2]} />
        </div>
      </section>
    </div>
  );
}

export default App;
