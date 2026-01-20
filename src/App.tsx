import { useEffect, useState } from "react";
// import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { BASE_URL, API_KEY } from "./store/apiFetchHelper";
import styles from "./App.module.scss";
import GifVideoBlock from "./components/GifVideoBlock/GifVideoBlock";

export type Gif = {
  id: string;
  title: string;
  images: {
    original: {
      mp4: string;
      url: string;
    };
  };
};

function App() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}trending?api_key=${API_KEY}&limit=10&bundle=low_bandwidth`,
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
      // console.log("Fetched trending GIFs");
    } else {
      console.error("GIPHY API Key not found in environment variables.");
    }
  }, [API_KEY]);

  return (
    <div className={styles.App}>
      {loading ? (
        <p>Loading GIFs...</p>
      ) : (
        <div className={styles.trendingContent}>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setGifs={setGifs}
          />
          <section>
            <p>Trending Gifs:</p>
            <div className={styles.masonryContainer}>
              {gifs.map((gif) => (
                <GifVideoBlock key={gif.id} gif={gif} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
