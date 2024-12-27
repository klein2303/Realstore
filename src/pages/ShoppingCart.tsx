import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styles from "../styles/ShoppingCart.module.css";
import OrderSummaryList from "../components/ShoppingCart/OrderSummaryList";
import OrderSummaryItems from "../components/ShoppingCart/OrderSummaryItems";
import {Link} from "react-router-dom";

const ShoppingCart = () => {
    return (
        <>
            <Navbar />
            <main className={styles.shoppingcart}>
                <section className={styles.cartbox} role="region" aria-label="Shopping Cart Summary">
                    <header className={styles.titles}>
                        <nav className={styles.path} aria-label="Navigation">
                            <Link className={styles.pathlink} to={"/"}>
                                Home
                            </Link>{" "}
                            / Cart
                        </nav>
                        <h1 className={styles.title}>MY CART</h1>
                    </header>
                    <section className={styles.cart} role="region" aria-label="Order Summary">
                        <OrderSummaryItems />
                        <OrderSummaryList />
                    </section>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ShoppingCart;
