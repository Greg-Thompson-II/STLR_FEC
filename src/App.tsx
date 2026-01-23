import { useEffect, useState } from "react";
// import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchTrendingGifs, fetchSearchedGifs } from "./store/apiFetchHelper";
import styles from "./App.module.scss";
import GifVideoBlock from "./components/GifVideoBlock/GifVideoBlock";
import { GifViewPage } from "./components/Pages/GifViewPage/GifViewPage";
import { useQueryParam } from "./store/QueryParams";
import { ErrorAlert } from "./components/Alerts/Alerts";

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

  const [gifs, setGifs] = useState<Gif[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setSearchTerm(searchURLValue);
  }, [searchURLValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchURLValue) {
          await fetchSearchedGifs(searchURLValue, setGifs, setErrorMessage);
        } else {
          await fetchTrendingGifs(setGifs, setErrorMessage);
        }
      } catch (error) {
        console.error("Error fetching gifs:", error);
      } finally {
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

      {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
    </div>
  );
}

export default App;
