import React from "react";
import styles from "./SearchBar.module.scss";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { API_KEY, BASE_URL } from "../../store/apiFetchHelper";
import type { Gif } from "../../App";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setGifs: React.Dispatch<React.SetStateAction<Gif[]>>;
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  setGifs,
}: Props) {
  const handleSubmitSearch = () => {
    const fetchSearchedGifs = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}search?api_key=${API_KEY}&q=${encodeURIComponent(
            searchTerm,
          )}&limit=10`,
        );
        const json = await response.json();
        setGifs(json.data);
      } catch (error) {
        console.error("Error fetching searched GIFs:", error);
      }
    };

    fetchSearchedGifs();
  };

  return (
    <>
      <div className={styles.searchContent}>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search for gifs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmitSearch();
              }
            }}
          />
          <button className={styles.searchButton} onClick={handleSubmitSearch}>
            <SearchIcon className={styles.searchIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
