import {Filter} from "../pages/Shopping";

export type CartItem = {productId: number; quantity: number};

// Helper function to store items in session storage
const setSessionStorageItems = <T>(key: string, items: T[]): void => {
    sessionStorage.setItem(key, JSON.stringify(items));
};

// Helper function to get items from session storage
const getSessionStorageItems = <T>(key: string): T[] => {
    const storedItems = sessionStorage.getItem(key);
    return storedItems ? JSON.parse(storedItems) : [];
};

// Cart-specific functions
export const getCart = (): CartItem[] => {
    return getSessionStorageItems<CartItem>("cart");
};

export const addToCart = (productId: number, quantity: number = 1): void => {
    const cart = getCart();
    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity; // Increment quantity
    } else {
        cart.push({productId, quantity});
    }

    setSessionStorageItems("cart", cart);
};

export const clearCart = (): void => {
    setSessionStorageItems("cart", []);
};

export const updateCartQuantity = (productId: number, quantity: number): void => {
    const cart = getCart();
    const index = cart.findIndex((item) => item.productId === productId);

    if (index !== -1) {
        // Product exists in the cart
        if (quantity > 0) {
            cart[index].quantity = quantity; // Update quantity
        } else {
            cart.splice(index, 1); // Remove if quantity is 0
        }
    } else if (quantity > 0) {
        // Product doesn't exist in the cart, add it
        cart.push({productId, quantity});
    }

    setSessionStorageItems("cart", cart); // Save updated cart to sessionStorage
};

// Filtered items-specific functions
export const getFilter = (): Filter[] => {
    return getSessionStorageItems<Filter>("filter");
};

export const setFilter = (filter: Filter[]): void => {
    setSessionStorageItems("filter", filter);
};

export const clearFilter = (): void => {
    setSessionStorageItems("filter", []);
};
