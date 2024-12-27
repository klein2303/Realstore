import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styles from "../styles/Home.module.css";
import {FaArrowRight} from "react-icons/fa6";
import {Link} from "react-router-dom";
import woman from "/woman.svg";

const Home = () => {
    return (
        <>
            <Navbar />
            <main className={styles.homepage}>
                <section className={styles.homebox} role="region" aria-label="Introduction and Shop Promotion">
                    <article className={styles.informationbox} role="article" aria-label="Store Information">
                        <p className={styles.descriptiontext}>Real Materials</p>
                        <p className={styles.descriptiontext}>Real Style</p>
                        <h1 className={styles.shoptext}>RealStore</h1>
                        <p className={styles.informationtext}>
                            Experience premium clothing, jewelry, and electronics made from authentic materials. Choose
                            us for timeless fashion and exceptional craftsmanship.
                        </p>
                        <Link className={styles.link} to="/Shopping">
                            <button className={styles.shoppingbutton} onClick={() => "/Shopping"}>
                                Explore <FaArrowRight className={styles.arrow} />
                            </button>
                        </Link>
                    </article>
                    <img src={woman} alt="Illustration of a woman showcasing the fashion" className={styles.image} />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Home;
