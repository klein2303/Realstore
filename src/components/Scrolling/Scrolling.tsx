import styles from "./Scrolling.module.css";
import ClothingsCards from "./ClothingsCards/ClothingsCards.tsx";
import {useProducts} from "../../hooks/useProducts.ts";
import {Product} from "../../models/Product.ts";
import {Filter} from "../../pages/Shopping.tsx";

interface scrollingProps {
    favorite: boolean;
    cart: boolean;
    selectedFilter: Filter;
}

const Scrolling = ({favorite, cart, selectedFilter}: scrollingProps) => {
    const {
        data: products,
        isLoading,
        isError,
    } = useProducts(
        selectedFilter.category,
        undefined,
        selectedFilter.values.min,
        selectedFilter.values.max,
        undefined,
    );

    if (isLoading) {
        return (
            <section role="status" aria-live="polite" aria-label="Loading">
                Loading...
            </section>
        );
    }
    if (isError) {
        return (
            <section role="alert" aria-live="assertive" aria-label="Error fetching products">
                Error fetching products.
            </section>
        );
    }

    return (
        <section className={styles.clothesSections} role="region">
            <article className={styles.rows} role="list" aria-label="Product list">
                {products && products.length > 0 ? (
                    products.map((product: Product) => (
                        <ClothingsCards
                            key={product.id}
                            id={product.id}
                            title={product.title.substring(0, 20) + "..."}
                            price={product.price}
                            category={product.category.charAt(0).toUpperCase() + product.category.substring(1)}
                            image={product.image}
                            cart={cart}
                            favorite={favorite}
                        />
                    ))
                ) : (
                    <section
                        className={styles.message}
                        role="status"
                        aria-live="polite"
                        aria-label="No products available">
                        No products available.
                    </section>
                )}
            </article>
        </section>
    );
};

export default Scrolling;
