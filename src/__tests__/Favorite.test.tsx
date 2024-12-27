import {render, screen} from "@testing-library/react";
import {describe, it, expect, beforeEach, vi} from "vitest";
import Favorites from "../pages/Favorites";
import {useProducts} from "../hooks/useProducts";
import {getFavorites} from "../utils/localStorage";
import {MemoryRouter} from "react-router-dom";

// Mock useProducts and localStorage functions
vi.mock("../hooks/useProducts", () => ({
    useProducts: vi.fn(),
}));

vi.mock("../utils/localStorage", () => ({
    getFavorites: vi.fn(),
    setFavorites: vi.fn(),
    toggleFavorite: vi.fn(),
}));

// Reset mocks before each test
beforeEach(() => {
    vi.resetAllMocks();
    (getFavorites as jest.Mock).mockReturnValue([]);
});

describe("Favorites component", () => {
    it("renders loading state initially", () => {
        // Mock useProducts to simulate the loading state
        (useProducts as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        const {container} = render(
            <MemoryRouter>
                <Favorites />
            </MemoryRouter>,
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("renders error state when data fetching fails", () => {
        // Mock useProducts to simulate an error
        (useProducts as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        });

        const {container} = render(
            <MemoryRouter>
                <Favorites />
            </MemoryRouter>,
        );

        expect(screen.getByText(/Error fetching products./i)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("renders favorite products", () => {
        // Mock product data
        const fakeProducts = [
            {
                id: 1,
                title: "Product 1",
                price: 10,
                description: "Description 1",
                category: "category1",
                image: "image1.jpg",
                rating: {
                    rate: 4.5,
                    count: 10,
                },
            },
            {
                id: 2,
                title: "Product 2",
                price: 20,
                description: "Description 2",
                category: "category2",
                image: "image2.jpg",
                rating: {
                    rate: 4.0,
                    count: 20,
                },
            },
        ];

        // Mock useProducts to return the product data
        (useProducts as jest.Mock).mockReturnValue({
            data: fakeProducts,
            isLoading: false,
            isError: false,
        });

        // Mock getFavorites to return product IDs that exist in fakeProducts
        (getFavorites as jest.Mock).mockReturnValue([1, 2]);

        const {container} = render(
            <MemoryRouter>
                <Favorites />
            </MemoryRouter>,
        );

        expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it("renders 'No products available' message when there are no favorite products", () => {
        // Mock useProducts to return an empty product list
        (useProducts as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
        });

        // Mock getFavorites to return an empty list
        (getFavorites as jest.Mock).mockReturnValue([]);

        const {container} = render(
            <MemoryRouter>
                <Favorites />
            </MemoryRouter>,
        );

        expect(screen.getByText(/No products available./i)).toBeInTheDocument(); // Updated text matcher
        expect(container).toMatchSnapshot();
    });
});
