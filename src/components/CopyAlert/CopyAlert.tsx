import styles from "./CopyAlert.module.scss";
import CheckIcon from "../../assets/icons/CheckIcon";

export default function CopyAlert() {
  return (
    <div className={styles.copiedNotification}>
      <span>
        <CheckIcon /> <p>GIF URL copied to clipboard</p>
      </span>
    </div>
  );
}
