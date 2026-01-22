import { useState } from "react";
import type { Gif } from "../../../App";
import BackArrowIcon from "../../../assets/icons/BackArrowIcon";
import styles from "./GifViewPage.module.scss";
import CopyAlert from "../../CopyAlert/CopyAlert";

type Props = {
  gif: Gif;
  returnToPreviousPage: () => void;
};

export function GifViewPage({ gif, returnToPreviousPage }: Props) {
  const gifURL = gif.images.original.url;

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (!gif.images.original.url) return;

    try {
      await navigator.clipboard.writeText(gif.images.original.url);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };
  return (
    <div className={styles.GifContentPage}>
      <button
        onClick={returnToPreviousPage}
        className={styles.returnToHomeButton}
      >
        <span>
          <BackArrowIcon /> <p>Back</p>
        </span>
      </button>

      <div>
        <h2>{gif.title}</h2>
        <video loop autoPlay muted key={gif.id}>
          <source src={gif.images.original.mp4} type="video/mp4"></source>
        </video>
      </div>

      <div>
        <span className={styles.urlContainer}>
          <p>Direct URL: </p>
          <p className={styles.urlLink} onClick={handleCopy}>
            {gifURL}
          </p>
        </span>
      </div>

      {isCopied && <CopyAlert />}
    </div>
  );
}
