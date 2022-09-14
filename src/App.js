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
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(false);
      });
  };

  const useGetKeywords = () => {
    useEffect(() => {
      setIsLoading(true);
      console.log(isLoading);
      fetch(catAPI)
        .then((res) => res.json())
        .then((data) => {
          setFact(data?.fact || "Data not found");
          getGifs(data?.fact?.split(" ", 3).join(" "));
        });
    }, []);
  };

  useGetKeywords();

  if (!isLoading) {
    return (
      <div className="App">
        <header className="app__header">
          <h1>GIFS, CATS and FACTS</h1>
          <p>Website that search gifs with cat's facts</p>
          <h3>Refresh to get new gifs and facts! ...... and cats!!</h3>
        </header>
        <section id="main-section">
          <header>
            <h3>Fact:</h3>
            <strong>{fact}</strong>
          </header>
          <div className="images__section">
            {image &&
              image.map((element, index) => {
                return <GenImg image={image} index={index} key={element[1]} />;
              })}
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="app__header">
          <h1>GIFS, CATS and FACTS</h1>
          <p>Website that search gifs with cat's facts</p>
          <h3>Refresh to get new gifs and facts! ...... and cats!!</h3>
        </header>
        <section id="main-section">
          <header>
            <div className="skeleton skeleton__title"></div>
            <div className="skeleton skeleton__title"></div>
            <div className="skeleton skeleton__title"></div>
          </header>
          <div className="images__section">
            <i className="skeleton skeleton__image"></i>
            <i className="skeleton skeleton__image"></i>
            <i className="skeleton skeleton__image"></i>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
