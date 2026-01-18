import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { API_KEY, BASE_URL } from "../store/apiFetchHelper";
import type { Gif } from "../App";

type Props = {
  searchedGifs: Gif[];
  setSearchGifs: React.Dispatch<React.SetStateAction<Gif[]>>;
};

export default function SearchBar({ searchedGifs, setSearchGifs }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmitSearch = () => {
    const fetchSearchedGifs = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}search?api_key=${API_KEY}&q=${encodeURIComponent(
            searchTerm,
          )}&limit=10`,
        );
        const json = await response.json();
        setSearchGifs(json.data);
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
          <SearchIcon className={styles.searchIcon} />
        </div>
        <button onClick={handleSubmitSearch}>Search</button>
      </div>
      <div>
        {searchedGifs.map((gif) => (
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
        ))}
      </div>
    </>
  );
}
