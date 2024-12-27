import {render, screen, fireEvent} from "@testing-library/react";
import {describe, it, expect, beforeEach, vi} from "vitest";
import ActionBox from "../components/Clothe/ActionBox";
import {useProducts} from "../hooks/useProducts";
import {getFavorites} from "../utils/localStorage";
import {getCart, addToCart} from "../utils/sessionStorage";
import {MemoryRouter} from "react-router-dom";

const setScreenSize = (width: number, height: number) => {
    window.innerWidth = width;
    window.innerHeight = height;
    window.dispatchEvent(new Event("resize"));
};

// Mock the hooks and utility functions
vi.mock("../hooks/useProducts", () => ({
    useProducts: vi.fn(),
}));

vi.mock("../utils/localStorage", () => ({
    getFavorites: vi.fn(),
    toggleFavorite: vi.fn(),
}));

vi.mock("../utils/sessionStorage", () => ({
    getCart: vi.fn(),
    addToCart: vi.fn(),
}));

beforeEach(() => {
    vi.resetAllMocks();

    (getFavorites as jest.Mock).mockReturnValue([]);
    (getCart as jest.Mock).mockReturnValue([]);
});

describe("ActionBox component", () => {
    it("renders loading state initially", () => {
        (useProducts as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        const {container} = render(
            <MemoryRouter>
                <ActionBox productId={1} />
            </MemoryRouter>,
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        expect(container).toMatchSnapshot(); // Snapshot test
    });

    it("renders error state when product fetching fails", () => {
        (useProducts as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        });

        const {container} = render(
            <MemoryRouter>
                <ActionBox productId={1} />
            </MemoryRouter>,
        );

        expect(screen.getByText(/Error fetching products./i)).toBeInTheDocument();
        expect(container).toMatchSnapshot(); // Snapshot test
    });

    it("renders product details and allows adding to cart", () => {
        const fakeProducts = [
            {
                id: 1,
                title: "Test Product",
                price: 99.99,
                description: "Test description",
                image: "test-image.jpg",
            },
        ];

        (useProducts as jest.Mock).mockReturnValue({
            data: fakeProducts,
            isLoading: false,
            isError: false,
        });

        (getFavorites as jest.Mock).mockReturnValue([]);
        (getCart as jest.Mock).mockReturnValue([]);

        render(
            <MemoryRouter>
                <ActionBox productId={1} />
            </MemoryRouter>,
        );

        // More specific queries for elements
        const productTitle = screen.getByRole("heading", {name: /Test Product/i});
        expect(productTitle).toBeInTheDocument();

        const productPrice = screen.getByText(/99.99 \$/i);
        expect(productPrice).toBeInTheDocument();

        const productImage = screen.getByAltText(/Test Product/i);
        expect(productImage).toHaveAttribute("src", "test-image.jpg");

        const addToCartButton = screen.getByRole("button", {name: /add to cart/i});
        fireEvent.click(addToCartButton);

        expect(addToCart).toHaveBeenCalledWith(1, 1);
    });

    it("renders correctly on mobile version", () => {
        setScreenSize(375, 667); // iPhone 6/7/8 size

        const fakeProducts = [
            {
                id: 1,
                title: "Sample Product",
                price: "$10.00",
                description: "Sample Description",
                image: "https://via.placeholder.com/150",
            },
        ];

        (useProducts as jest.Mock).mockReturnValue({
            data: fakeProducts,
            isLoading: false,
            isError: false,
        });

        const {container} = render(
            <MemoryRouter>
                <ActionBox productId={1} />
            </MemoryRouter>,
        );

        const elements = screen.getAllByAltText("Sample Product");
        expect(elements[0]).toBeVisible();
        expect(container).toMatchSnapshot(); // Snapshot test
    });

    it("renders correctly on desktop version", () => {
        setScreenSize(1920, 1080); // Desktop size

        const fakeProducts = [
            {
                id: 1,
                title: "Sample Product",
                price: "$10.00",
                description: "Sample Description",
                image: "https://via.placeholder.com/150",
            },
        ];

        (useProducts as jest.Mock).mockReturnValue({
            data: fakeProducts,
            isLoading: false,
            isError: false,
        });

        const {container} = render(
            <MemoryRouter>
                <ActionBox productId={1} />
            </MemoryRouter>,
        );

        const elements = screen.getAllByAltText("Sample Product");
        expect(elements[0]).toBeVisible();
        expect(container).toMatchSnapshot(); // Snapshot test
    });

    it('adds product to cart when "Add to Cart" button is clicked, for desktop version', () => {
        const fakeProducts = [
            {
                id: 1,
                title: "Sample Product",
                price: "$10.00",
                description: "Sample Description",
                image: "https://via.placeholder.com/150",
            },
        ];

        (useProducts as jest.Mock).mockReturnValue({
            data: fakeProducts,
            isLoading: false,
            isError: false,
        });

        const {container} = render(
            <MemoryRouter>
                <ActionBox productId={1} />
            </MemoryRouter>,
        );

        setScreenSize(1920, 1080); // Set screen size for desktop

        const addToCartButton = screen.getByRole("button", {name: /add to cart/i});
        fireEvent.click(addToCartButton);

        expect(addToCart).toHaveBeenCalledWith(1, 1);
        expect(container).toMatchSnapshot(); // Snapshot test
    });
});
