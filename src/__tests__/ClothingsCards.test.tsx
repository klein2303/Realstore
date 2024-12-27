import {render, screen, fireEvent} from "@testing-library/react";
import {describe, it, expect, vi, beforeEach} from "vitest";
import '@testing-library/jest-dom';
import ClothingsCards from "../components/Scrolling/ClothingsCards/ClothingsCards";
import {MemoryRouter} from "react-router-dom";
import {getCart, addToCart, updateCartQuantity} from "../utils/sessionStorage";
import {getFavorites, toggleFavorite} from "../utils/localStorage";

// Mock sessionStorage and localStorage functions
vi.mock("../utils/sessionStorage", () => ({
    getCart: vi.fn(),
    addToCart: vi.fn(),
    updateCartQuantity: vi.fn(),
}));

vi.mock("../utils/localStorage", () => ({
    getFavorites: vi.fn(),
    toggleFavorite: vi.fn(),
}));

describe("ClothingsCards Component", () => {
    const mockProduct = {
        id: 1,
        title: "Test Product",
        price: 100,
        image: "test-image.jpg",
        category: "Clothing",
        cart: true,
        favorite: true,
    };

    beforeEach(() => {
        vi.resetAllMocks();
        // Default mocks to avoid undefined errors
        (getCart as jest.Mock).mockReturnValue([]);
        (getFavorites as jest.Mock).mockReturnValue([]);
    });

    it("renders the product card with correct details", () => {
        render(
            <MemoryRouter>
                <ClothingsCards {...mockProduct} />
            </MemoryRouter>,
        );

        // Check if the product card renders with correct details
        const productCard = screen.getByRole("region", {name: /product card for test product/i});
        expect(productCard).toBeInTheDocument();

        const productImage = screen.getByAltText(/image of test product/i);
        expect(productImage).toHaveAttribute("src", "test-image.jpg");

        expect(screen.getByText(/test product/i)).toBeInTheDocument();
        expect(screen.getByText(/\$ 100/i)).toBeInTheDocument();
        expect(screen.getByText(/clothing/i)).toBeInTheDocument();
    });

    it("handles adding and removing items from the cart", () => {
        (getCart as jest.Mock).mockReturnValue([{productId: 1}]);

        render(
            <MemoryRouter>
                <ClothingsCards {...mockProduct} />
            </MemoryRouter>,
        );

        const cartIcon = screen.getByRole("button", {name: /cart/i});

        // Simulate removing from the cart
        fireEvent.click(cartIcon);
        expect(updateCartQuantity).toHaveBeenCalledWith(1, 0);

        // Simulate adding to the cart
        fireEvent.click(cartIcon);
        expect(addToCart).toHaveBeenCalledWith(1);
    });

    it("handles adding and removing items from favorites", () => {
        (getFavorites as jest.Mock).mockReturnValue([1]);

        render(
            <MemoryRouter>
                <ClothingsCards {...mockProduct} />
            </MemoryRouter>,
        );

        const favoriteIcon = screen.getByRole("button", {name: /favorite/i});

        // Simulate removing from favorites
        fireEvent.click(favoriteIcon);
        expect(toggleFavorite).toHaveBeenCalledWith(1);

        // Simulate adding to favorites
        fireEvent.click(favoriteIcon);
        expect(toggleFavorite).toHaveBeenCalledWith(1);
    });

    it("matches the snapshot", () => {
        const {container} = render(
            <MemoryRouter>
                <ClothingsCards {...mockProduct} />
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });

    it("initializes states based on localStorage and sessionStorage", () => {
        (getCart as jest.Mock).mockReturnValue([{productId: 1}]);
        (getFavorites as jest.Mock).mockReturnValue([1]);

        render(
            <MemoryRouter>
                <ClothingsCards {...mockProduct} />
            </MemoryRouter>,
        );

        // Check that initial cart state is correct
        const cartIcon = screen.getByRole("button", {name: /cart/i});
        expect(cartIcon).toBeInTheDocument();

        // Check that initial favorites state is correct
        const favoriteIcon = screen.getByRole("button", {name: /favorite/i});
        expect(favoriteIcon).toBeInTheDocument();
    });
});
