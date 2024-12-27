import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styles from "../styles/Favorites.module.css";
import {Link} from "react-router-dom";
import ClothingsCards from "../components/Scrolling/ClothingsCards/ClothingsCards";
import {Product} from "../models/Product";
import {useProducts} from "../hooks/useProducts";
import {getFavorites} from "../utils/localStorage";
import {useEffect, useState} from "react";

const Favorites = () => {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
    const {data: products, isLoading, isError} = useProducts();

    useEffect(() => {
        if (!products) {
            return;
        }
        const favorites = getFavorites();
        setFavorites(favorites);
        const currentFavoriteProducts = products.filter((product: Product) => favorites.includes(product.id));
        setFavoriteProducts(currentFavoriteProducts);
    }, [products]);

    if (isLoading) {
        return (
            <section role="status" aria-live="polite">
                Loading...
            </section>
        );
    }
    if (isError) {
        return (
            <section role="alert" aria-live="assertive">
                Error fetching products.
            </section>
        );
    }

    return (
        <>
            <Navbar />
            <main className={styles.favoritepage} role="region" aria-label="Favorite Products">
                <div className={styles.favoritecontainer}>
                    <nav className={styles.path} aria-label="Navigation">
                        <Link className={styles.pathlink} to={"/"}>
                            Home
                        </Link>{" "}
                        / Favorites
                    </nav>
                    <p className={styles.title}>FAVORITES</p>
                    <section className={styles.favoriteitems} role="list" aria-description="List of favorite products">
                        {favorites.length === 0 ? (
                            <section className={styles.message} role="status" aria-live="polite">
                                No products available.
                            </section>
                        ) : (
                            favoriteProducts.map((product: Product) => (
                                <ClothingsCards
                                    key={product.id}
                                    id={product.id}
                                    title={product.title.substring(0, 20) + "..."}
                                    price={product.price}
                                    category={product.category.charAt(0).toUpperCase() + product.category.substring(1)}
                                    image={product.image}
                                    cart={true}
                                    favorite={true}
                                />
                            ))
                        )}
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Favorites;
