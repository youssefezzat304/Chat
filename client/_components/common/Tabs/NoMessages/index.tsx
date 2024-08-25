import styles from "./index.module.css";

const NoMessages = () => {
  return (
    <main className={`${styles.noMessages}`}>
      <strong>No new messages.</strong>
      <p>Start new conversation.</p>
    </main>
  );
};

export default NoMessages;
