import {PiHeartStraightThin, PiHeartStraightFill} from "react-icons/pi";
import styles from "./ActionBox.module.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import {toggleFavorite, getFavorites} from "../../utils/localStorage";
import {addToCart, CartItem, getCart} from "../../utils/sessionStorage";
import {useProducts} from "../../hooks/useProducts";

interface ActionBoxProps {
    productId: number;
}

const ActionBox = ({productId}: ActionBoxProps) => {
    //Ensures only one item is added to cart
    const quantity: number = 1;

    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

    //Get the specific item with the hook
    const {data: products, isLoading, isError} = useProducts(undefined, productId, undefined, undefined, undefined);

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

    const product = Array.isArray(products) ? products.find((p) => p.id === productId) : null;

    const favorites = getFavorites();
    const isAlreadyFavorited = favorites.includes(productId);

    const productsInCart = getCart();
    const isAlreadyInCart = productsInCart.some((product: CartItem) => product.productId === productId);

    if (!isAddedToCart && isAlreadyInCart) {
        setIsAddedToCart(true);
    }

    const addFavorite = (productId: number) => {
        if (!isAlreadyFavorited) {
            toggleFavorite(productId);
            console.log("Added this product as favorite:", product?.title);
        } else {
            toggleFavorite(productId);
            console.log("Removed this product as favorite:", product?.title);
        }
        setIsFavorited(!isFavorited);
    };

    const addProductToCart = (productId: number, quantity: number) => {
        addToCart(productId, quantity);
        setIsAddedToCart(true);
    };

    return (
        <>
            <nav className={styles.link} aria-label="Navigation">
                <Link to={"/"} className={styles.linkstyle}>
                    Home
                </Link>{" "}
                /
                <Link to={"/shopping"} className={styles.linkstyle}>
                    {" "}
                    Shop
                </Link>{" "}
                /
                <p className={styles.pstyle} id="product-title">
                    {" "}
                    {product?.title?.split(" ").slice(0, 3).join(" ")}
                </p>
            </nav>
            <h1 className={styles.title}>SHOP - {product?.title}</h1>
            <section className={styles.content} role="region" aria-label="product-information">
                <img src={product?.image} alt={product?.title} className={styles.imageView} />
                <article className={styles.information} role="region">
                    <section className={styles.productInfoAndHeart}>
                        <section className={styles.productInfo}>
                            <p className={styles.titleInDesc} id="product-description">
                                {product?.title}
                            </p>
                            <p className={styles.price}>{product?.price} $</p>
                            <p className={styles.taxes}>Taxes are included</p>
                        </section>
                        {isAlreadyFavorited ? (
                            <PiHeartStraightFill
                                className={`${styles.heartButton} ${styles.likedHeartButton}`}
                                onClick={() => addFavorite(productId)}
                                tabIndex={0}
                                onKeyDown={(e) => e.key === "Enter" && addFavorite(productId)}
                                aria-label="Remove from favorites"
                                role="button"
                            />
                        ) : (
                            <PiHeartStraightThin
                                className={`${styles.heartButton} ${styles.notLikedheartButton}`}
                                onClick={() => addFavorite(productId)}
                                tabIndex={0}
                                onKeyDown={(e) => e.key === "Enter" && addFavorite(productId)}
                                aria-label="Add to favorites"
                                role="button"
                            />
                        )}
                    </section>
                    <p className={styles.clotheDesc}>{product?.description}</p>
                    {isAddedToCart ? (
                        <div className={styles.alreadyInCart} role="status" aria-live="polite">
                            ADDED TO CART
                        </div>
                    ) : (
                        <button
                            className={styles.cartButton}
                            onClick={() => addProductToCart(productId, quantity)}
                            aria-label="Add to cart">
                            ADD TO CART
                        </button>
                    )}
                </article>
            </section>
        </>
    );
};

export default ActionBox;
