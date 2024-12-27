import {useEffect, useState} from "react";
import styles from "./OrderSummaryList.module.css";
import {useProducts} from "../../hooks/useProducts";
import {Product} from "../../models/Product";
import {getCart, clearCart, CartItem} from "../../utils/sessionStorage";
import {useNavigate} from "react-router-dom";

const OrderSummaryList = () => {
    const [clicked, setClicked] = useState(false);
    const [price, setPrice] = useState<number>();
    const [cartItemData, setCartItemData] = useState<CartItem[]>([]);
    const {data: products, isLoading, isError} = useProducts();
    const navigate = useNavigate();

    useEffect(() => {
        if (!products) {
            return;
        }
        const cartItemData = getCart();
        setCartItemData(cartItemData);
        const cartItemIds = cartItemData.map((cartId: CartItem) => {
            return cartId.productId;
        });
        const currentPrice = products
            .filter((product: Product) => cartItemIds.includes(product.id))
            .map((product: Product) => product.price)
            .reduce((x: number, y: number) => (x = x + y), 0);
        setPrice(currentPrice);
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

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = e.target.checked;
        setClicked(isChecked);
    }

    function handleClick() {
        if (cartItemData) {
            clearCart();
            navigate(0);
        }
    }

    return (
        <>
            <section className={styles.box} role="region" aria-label="Order Summary Section">
                <h2 className={styles.title}>ORDER SUMMARY</h2>
                <div className={styles.textbox} aria-label="Subtotal Information">
                    <p className={styles.text}>Subtotal</p>
                    <p className={styles.text}>$ {price}</p>
                </div>
                <div className={styles.textbox} aria-label="Shipping Information">
                    <p className={styles.text}>Shipping</p>
                    <p className={styles.text}>$ Free</p>
                </div>
                <div className={styles.totalbox} aria-label="Total Cost">
                    <p className={styles.totaltext}>TOTAL</p>
                    <p className={styles.taxtext}>(TAX INCL.)</p>
                    <p className={styles.totaltext}>$ {price}</p>
                </div>
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        className={styles.check}
                        tabIndex={0}
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // Prevent default scrolling or form submission behavior
                                const target = e.target as HTMLInputElement;
                                target.checked = !target.checked;
                                handleChange({
                                    ...e,
                                    target,
                                } as React.ChangeEvent<HTMLInputElement>);
                            }
                        }}
                        aria-labelledby="termsCheckbox"
                    />
                    <p id="termsCheckbox" className={styles.checkboxtext}>
                        I agree to the Terms and Conditions
                    </p>
                </label>

                <button
                    type="button"
                    disabled={!clicked}
                    aria-disabled={!clicked}
                    className={styles.button}
                    onClick={() => handleClick()}>
                    PAY
                </button>
            </section>
        </>
    );
};

export default OrderSummaryList;
