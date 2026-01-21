import React, { useRef } from "react";
import styles from "./SearchBar.module.scss";
import { SearchIcon } from "../../assets/icons/SearchIcon";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitSearch: (debouncedSearchTerm?: string) => void;
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  handleSubmitSearch,
}: Props) {
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedHandleSubmitSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = setTimeout(() => {
      handleSubmitSearch(newSearchTerm);
    }, 1000);
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
            onChange={debouncedHandleSubmitSearch}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmitSearch(searchTerm);
              }
            }}
          />
          <button
            className={styles.searchButton}
            onClick={() => handleSubmitSearch(searchTerm)}
          >
            <SearchIcon className={styles.searchIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
