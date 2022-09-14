import { useEffect, useState } from "react";
import GenImg from "./GenImg";
import "./App.css";

const catAPI = "https://catfact.ninja/fact";
const API_KEY = "BQohfWTMf75GYBcGNWH74YXkKLiUqS92";
const limit = 3;
const offset = Math.floor(Math.random() * 5);
const lang = "en";

const getGifAPIurl = (keywords) => {
  return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keywords}&limit=${limit}&offset=${offset}&rating=g&lang=${lang}`;
};

function App() {
  const [fact, setFact] = useState();
  const [image, setImage] = useState();

  const getGifs = (keywords) => {
    fetch(getGifAPIurl(keywords))
      .then((res) => res.json())
      .then((data) => {
        setImage(
          data.data.map((element) => {
            return [element.title, element.images.fixed_width.url];
          })
        );
      });
  };

  const useGetKeywords = () => {
    useEffect(() => {
      fetch(catAPI)
        .then((res) => res.json())
        .then((data) => {
          setFact(data?.fact || "Data not found");
          getGifs(data?.fact?.split(" ", 3).join(" "));
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
          {image &&
            image.map((element, index) => {
              return <GenImg image={image} index={index} key={element[1]}/>;
            })}
        </div>
      </section>
    </div>
  );
}

export default App;
