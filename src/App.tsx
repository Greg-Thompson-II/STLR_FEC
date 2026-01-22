import { useEffect, useState } from "react";
// import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { BASE_URL, API_KEY } from "./store/apiFetchHelper";
import styles from "./App.module.scss";
import GifVideoBlock from "./components/GifVideoBlock/GifVideoBlock";
import { GifViewPage } from "./components/Pages/GifViewPage/GifViewPage";
import { useQueryParam } from "./store/QueryParams";

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
  const [searchURLValue, setSearchURLValue] = useQueryParam("search", "");

  const [_loading, setLoading] = useState<boolean>(true);

  const [gifs, setGifs] = useState<Gif[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);

  const fetchSearchedGifs = async (newSearchTerm: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}search?api_key=${API_KEY}&q=${encodeURIComponent(
          newSearchTerm,
        )}&limit=10`,
      );
      const json = await response.json();
      setGifs(json.data);
    } catch (error) {
      console.error("Error fetching searched GIFs:", error);
    }
  };

  const fetchTrendingGifs = async () => {
    try {
      // setLoading(true);
      const response = await fetch(
        `${BASE_URL}trending?api_key=${API_KEY}&limit=10&bundle=low_bandwidth`,
      );
      const json = await response.json();
      setGifs(json.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    setSearchTerm(searchURLValue);
  }, [searchURLValue]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (searchURLValue) {
          await fetchSearchedGifs(searchURLValue);
        } else {
          await fetchTrendingGifs();
        }
      } catch (error) {
        console.error("Error fetching gifs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchURLValue]);

  const handleSubmitSearch = (debouncedSearchTerm?: string) => {
    setSearchURLValue(debouncedSearchTerm || searchTerm);
  };

  return (
    <div className={styles.App}>
      {selectedGif ? (
        <GifViewPage
          gif={selectedGif}
          returnToPreviousPage={() => setSelectedGif(null)}
        />
      ) : (
        <div className={styles.trendingContent}>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSubmitSearch={handleSubmitSearch}
          />
          <section>
            {searchURLValue ? <p>Search Results:</p> : <p>Trending Gifs:</p>}
            <div className={styles.masonryContainer}>
              {gifs.map((gif) => (
                <GifVideoBlock
                  key={gif.id}
                  gif={gif}
                  setSelectedGif={setSelectedGif}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
