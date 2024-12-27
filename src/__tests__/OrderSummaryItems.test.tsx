import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {describe, it, expect, vi, beforeEach} from "vitest";
import OrderSummaryItems from "../components/ShoppingCart/OrderSummaryItems";
import {useProducts} from "../hooks/useProducts";
import {getCart} from "../utils/sessionStorage";
import {MemoryRouter} from "react-router-dom";

vi.mock("../hooks/useProducts", () => ({
    useProducts: vi.fn(),
}));

vi.mock("../utils/sessionStorage", () => ({
    getCart: vi.fn(),
}));

describe("OrderSummaryItems Component", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("renders the loading state", () => {
        (useProducts as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        render(
            <MemoryRouter>
                <OrderSummaryItems />
            </MemoryRouter>,
        );

        expect(screen.getByRole("status", {name: /loading/i})).toBeInTheDocument();
    });

    it("renders the error state", () => {
        (useProducts as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        });

        render(
            <MemoryRouter>
                <OrderSummaryItems />
            </MemoryRouter>,
        );

        expect(screen.getByRole("alert", {name: /error fetching products/i})).toBeInTheDocument();
    });

    it("renders 'No products available' when cart is empty", () => {
        (useProducts as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
        });

        (getCart as jest.Mock).mockReturnValue([]);

        render(
            <MemoryRouter>
                <OrderSummaryItems />
            </MemoryRouter>,
        );

        expect(screen.getByRole("status", {name: /no products available/i})).toBeInTheDocument();
    });

    it("renders products from the cart", () => {
        const mockProducts = [
            {
                id: 1,
                title: "Mock Product 1",
                price: 100,
                category: "electronics",
                image: "mock-image-1.jpg",
            },
            {
                id: 2,
                title: "Mock Product 2",
                price: 200,
                category: "clothing",
                image: "mock-image-2.jpg",
            },
        ];

        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            isError: false,
        });

        (getCart as jest.Mock).mockReturnValue([{productId: 1}, {productId: 2}]);

        render(
            <MemoryRouter>
                <OrderSummaryItems />
            </MemoryRouter>,
        );

        expect(screen.getByRole("region", {name: /order summary items/i})).toBeInTheDocument();
        expect(screen.getAllByRole("region", {name: /product card for/i})).toHaveLength(2);
    });

    it("matches the snapshot when products are available", () => {
        const mockProducts = [
            {
                id: 1,
                title: "Mock Product 1",
                price: 100,
                category: "electronics",
                image: "mock-image-1.jpg",
            },
        ];

        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            isError: false,
        });

        (getCart as jest.Mock).mockReturnValue([{productId: 1}]);

        const {container} = render(
            <MemoryRouter>
                <OrderSummaryItems />
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });
});
