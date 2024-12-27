import styles from "../styles/NoPage.module.css";

const NoPage = () => {
    return (
        <main className={styles.page} role="main" aria-label="Page not found">
            <h1 id="Error-404">404</h1>
        </main>
    );
};

export default NoPage;
