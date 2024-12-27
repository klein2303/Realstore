import styles from "./OrderSummaryItems.module.css";
import {Product} from "../../models/Product";
import {getCart, CartItem} from "../../utils/sessionStorage";
import {useProducts} from "../../hooks/useProducts.ts";
import {useEffect, useState} from "react";
import ClothingsCards from "../Scrolling/ClothingsCards/ClothingsCards";

const OrderSummaryItems = () => {
    const [cartItemData, setCartItemData] = useState<CartItem[]>([]);
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const {data: products, isLoading, isError} = useProducts();

    useEffect(() => {
        if (!products) {
            return;
        }
        const cartItemData = getCart();
        setCartItemData(cartItemData);
        const cartItemIds = cartItemData.map((cartId: CartItem) => {
            return cartId.productId;
        });
        const cartItems = products.filter((product: Product) => cartItemIds.includes(product.id));
        setCartItems(cartItems);
    }, [products]);

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
        <>
            <section className={styles.itembox} role="region" aria-label="Order Summary Items">
                {cartItemData.length === 0 ? (
                    <section
                        className={styles.message}
                        role="status"
                        aria-live="polite"
                        aria-label="No products available">
                        No products available.
                    </section>
                ) : (
                    cartItems.map((product: Product) => (
                        <ClothingsCards
                            key={product.id}
                            id={product.id}
                            title={product.title.substring(0, 20) + "..."}
                            price={product.price}
                            category={product.category.charAt(0).toUpperCase() + product.category.substring(1)}
                            image={product.image}
                            cart={true}
                            favorite={false}
                        />
                    ))
                )}
            </section>
        </>
    );
};

export default OrderSummaryItems;
