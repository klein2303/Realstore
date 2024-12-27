// Function to store favorite items in local storage
export const setFavorites = (items: number[]): void => {
    localStorage.setItem("favorites", JSON.stringify(items));
};

// Function to get favorite items from local storage
export const getFavorites = (): number[] => {
    const storedItems = localStorage.getItem("favorites");
    return storedItems ? JSON.parse(storedItems) : [];
};

export const toggleFavorite = (productId: number): void => {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(productId);

    const updatedFavorites = isFavorite ? favorites.filter((id) => id !== productId) : [...favorites, productId];

    setFavorites(updatedFavorites);
};
