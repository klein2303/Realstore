import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {Product} from "../models/Product";

const fetchProducts = async (
    category?: string,
    productId?: number,
    minPrice?: number,
    maxPrice?: number,
    minRating?: number,
): Promise<Product[]> => {
    let url = "https://fakestoreapi.com/products";

    if (productId) {
        url = `${url}/${productId}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching product");
        const product: Product = await response.json();
        return [product]; // Return a single product wrapped in an array
    } else if (category) {
        url = `${url}/category/${category}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching products");
    let products: Product[] = await response.json();

    // Filter products based on price and rating
    if (minPrice !== undefined) {
        products = products.filter((product) => product.price >= minPrice);
    }
    if (maxPrice !== undefined) {
        products = products.filter((product) => product.price <= maxPrice);
    }
    if (minRating !== undefined) {
        products = products.filter((product) => product.rating.rate >= minRating);
    }

    return products;
};

// Custom hook to fetch products with optional filters
export const useProducts = (
    category?: string,
    productId?: number,
    minPrice?: number,
    maxPrice?: number,
    minRating?: number,
): UseQueryResult<Product[]> => {
    const queryKey = ["products", category, productId, minPrice, maxPrice, minRating];

    return useQuery<Product[]>({
        queryKey,
        queryFn: () => fetchProducts(category, productId, minPrice, maxPrice, minRating),
    });
};
