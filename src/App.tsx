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
    original: {
      mp4: string;
    };
  };
};

function App() {
  // const [count, setCount] = useState(0);

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
          <SearchBar setGifs={setGifs} />
          <section>
            <p>Trending Gifs:</p>
            <div className={styles.masonryContainer}>
              {gifs.map((gif) => (
                <video
                  className={styles.masonryItem}
                  width="320"
                  loop
                  autoPlay
                  muted
                  key={gif.id}
                >
                  <source
                    src={gif.images.original.mp4}
                    type="video/mp4"
                  ></source>
                </video>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
