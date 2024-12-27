import {render, screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom';
import {describe, it, expect, vi, beforeEach} from "vitest";
import OrderSummaryList from "../components/ShoppingCart/OrderSummaryList";
import {useProducts} from "../hooks/useProducts";
import {getCart, clearCart} from "../utils/sessionStorage";
import {MemoryRouter, useNavigate} from "react-router-dom";

vi.mock("../hooks/useProducts", () => ({
    useProducts: vi.fn(),
}));

vi.mock("../utils/sessionStorage", () => ({
    getCart: vi.fn(),
    clearCart: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe("OrderSummaryList Component", () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    it("renders the loading state", () => {
        (useProducts as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        render(
            <MemoryRouter>
                <OrderSummaryList />
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
                <OrderSummaryList />
            </MemoryRouter>,
        );

        expect(screen.getByRole("alert", {name: /error fetching products/i})).toBeInTheDocument();
    });

    it("renders the order summary with calculated price", () => {
        const mockProducts = [
            {id: 1, title: "Product 1", price: 100},
            {id: 2, title: "Product 2", price: 200},
        ];

        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            isError: false,
        });

        (getCart as jest.Mock).mockReturnValue([{productId: 1}, {productId: 2}]);

        render(
            <MemoryRouter>
                <OrderSummaryList />
            </MemoryRouter>,
        );

        expect(screen.getByLabelText(/subtotal information/i)).toHaveTextContent("$ 300");
        expect(screen.getByLabelText(/total cost/i)).toHaveTextContent("$ 300");
    });

    it("disables the PAY button until terms are accepted", () => {
        const mockProducts = [{id: 1, title: "Product 1", price: 100}];

        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            isError: false,
        });

        (getCart as jest.Mock).mockReturnValue([{productId: 1}]);

        render(
            <MemoryRouter>
                <OrderSummaryList />
            </MemoryRouter>,
        );

        const payButton = screen.getByRole("button", {name: /pay/i});
        expect(payButton).toBeDisabled();

        const termsCheckbox = screen.getByRole("checkbox", {name: /terms and conditions/i});
        fireEvent.click(termsCheckbox);

        expect(payButton).toBeEnabled();
    });

    it("clears the cart and refreshes the page when PAY is clicked", () => {
        const mockProducts = [{id: 1, title: "Product 1", price: 100}];

        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            isError: false,
        });

        (getCart as jest.Mock).mockReturnValue([{productId: 1}]);

        render(
            <MemoryRouter>
                <OrderSummaryList />
            </MemoryRouter>,
        );

        const termsCheckbox = screen.getByRole("checkbox", {name: /terms and conditions/i});
        const payButton = screen.getByRole("button", {name: /pay/i});

        fireEvent.click(termsCheckbox);
        expect(payButton).toBeEnabled();

        fireEvent.click(payButton);

        expect(clearCart).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith(0);
    });

    it("matches the snapshot", () => {
        const mockProducts = [{id: 1, title: "Product 1", price: 100}];

        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            isError: false,
        });

        (getCart as jest.Mock).mockReturnValue([{productId: 1}]);

        const {container} = render(
            <MemoryRouter>
                <OrderSummaryList />
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });
});
