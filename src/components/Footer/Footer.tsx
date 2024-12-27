import {Link} from "react-router-dom";
import styles from "./Footer.module.css";
import footer from "/footer.svg";
import logo from "/Logo.svg";

const Footer = () => {
    return (
        <footer className={styles.footer} role="contentinfo" aria-label="Website Footer">
            <section className={styles.imageholder}>
                <img src={footer} alt="Decorative footer image" className={styles.image} />
                <p className={styles.title}>EXPLORE OUR CATALOG</p>
                <div className={styles.box} role="region" aria-label="Footer Navigation">
                    <div className={styles.informationbox}>
                        <p className={styles.informationtitle}>GENERAL</p>
                        <Link to={"/"} className={styles.informationlink}>
                            <p className={styles.informationtext} aria-label="Home Link">
                                Home
                            </p>
                        </Link>
                        <Link to={"/Shopping"} className={styles.informationlink}>
                            <p className={styles.informationtext}>Shop</p>
                        </Link>
                    </div>
                    <div className={styles.divider} role="separator" aria-hidden="true" />
                    <div className={styles.logobox} aria-label="Footer Logo and Information">
                        <Link to={"/"}>
                            <img
                                src={logo}
                                alt="RealStore logo"
                                className={styles.logoimg}
                                aria-label="RealStore Logo"
                            />
                        </Link>
                        <p className={styles.logoinformation}>@2024 RealStore.com</p>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
