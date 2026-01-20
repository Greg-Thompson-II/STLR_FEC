import React, { useState } from "react";
import type { Gif } from "../../App";
import styles from "./GifVideoBlock.module.scss";
import CopyIcon from "../../assets/icons/CopyIcon";
import CheckIcon from "../../assets/icons/CheckIcon";

type Props = { gif: Gif };

export default function GifVideoBlock({ gif }: Props) {
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
    <div className={styles.masonryItem}>
      <video width="320" loop autoPlay muted key={gif.id}>
        <source src={gif.images.original.mp4} type="video/mp4"></source>
      </video>

      <button onClick={handleCopy} className={styles.copyButton}>
        {isCopied ? (
          <span>
            <CheckIcon className={styles.checkIcon} /> <p>Copied!</p>
          </span>
        ) : (
          <span>
            <CopyIcon /> <p>Copy URL</p>
          </span>
        )}
      </button>
    </div>
  );
}
