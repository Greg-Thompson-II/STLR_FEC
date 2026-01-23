import styles from "./Alerts.module.scss";
import CheckIcon from "../../assets/icons/CheckIcon";

export function CopyAlert() {
  return (
    <div className={styles.copiedNotification}>
      <span>
        <CheckIcon /> <p>GIF URL copied to clipboard</p>
      </span>
    </div>
  );
}

type ErrorAlertProps = {
  errorMessage: string;
};

export function ErrorAlert({ errorMessage }: ErrorAlertProps) {
  return (
    <div className={styles.tooManyRequestsNotification}>
      <span>
        <p>{errorMessage}</p>
      </span>
    </div>
  );
}
