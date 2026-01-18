import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { BASE_URL, API_KEY } from "./store/apiFetchHelper";
import styles from "./App.module.scss";

export type Gif = {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
};

function App() {
  // const [count, setCount] = useState(0);

  const [gifs, setGifs] = useState<Gif[]>([]);
  const [searchedGifs, setSearchGifs] = useState<Gif[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}trending?api_key=${API_KEY}&limit=10`,
        );
        const json = await response.json();
        setGifs(json.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
        setLoading(false);
      }
    };

    if (API_KEY) {
      fetchTrendingGifs();
    } else {
      console.error("GIPHY API Key not found in environment variables.");
    }
  }, [API_KEY]);

  return (
    <>
      {loading ? (
        <p>Loading GIFs...</p>
      ) : (
        <div className={styles.trendingContent}>
          <p>Trending Gifs:</p>
          <span>
            {gifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
              />
            ))}
          </span>
        </div>
      )}
      <SearchBar searchedGifs={searchedGifs} setSearchGifs={setSearchGifs} />
    </>
  );
}

export default App;
