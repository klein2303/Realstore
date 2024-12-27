import {render, screen} from "@testing-library/react";
import {describe, it, expect, vi, beforeEach} from "vitest";
import Scrolling from "../components/Scrolling/Scrolling";
import {useProducts} from "../hooks/useProducts";
import {MemoryRouter} from "react-router-dom";
import {Filter} from "../pages/Shopping";

vi.mock("../hooks/useProducts", () => ({
    useProducts: vi.fn(),
}));

describe("Scrolling Component", () => {
    const mockFilter: Filter = {
        category: "electronics",
        values: {
            min: 10,
            max: 100,
        },
    };

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
                <Scrolling favorite={false} cart={false} selectedFilter={mockFilter} />
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
                <Scrolling favorite={false} cart={false} selectedFilter={mockFilter} />
            </MemoryRouter>,
        );

        expect(screen.getByRole("alert", {name: /error fetching products/i})).toBeInTheDocument();
    });

    it("renders the product list when products are available", () => {
        const mockProducts = [
            {
                id: 1,
                title: "Mock Product 1",
                price: 50,
                category: "electronics",
                image: "mock-image-1.jpg",
            },
            {
                id: 2,
                title: "Mock Product 2",
                price: 75,
                category: "electronics",
                image: "mock-image-2.jpg",
            },
        ];

        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            isError: false,
        });

        render(
            <MemoryRouter>
                <Scrolling favorite={false} cart={false} selectedFilter={mockFilter} />
            </MemoryRouter>,
        );

        const productList = screen.getByRole("list", {name: /product list/i});
        expect(productList).toBeInTheDocument();
        expect(screen.getAllByRole("region", {name: /product card for/i})).toHaveLength(2);
    });

    it("renders the 'No products available' message when the product list is empty", () => {
        (useProducts as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
        });

        render(
            <MemoryRouter>
                <Scrolling favorite={false} cart={false} selectedFilter={mockFilter} />
            </MemoryRouter>,
        );

        const noProductsMessage = screen.getByRole("status", {name: /no products available/i});
        expect(noProductsMessage).toBeInTheDocument();
    });

    it("matches the snapshot when products are available", () => {
        const mockProducts = [
            {
                id: 1,
                title: "Mock Product 1",
                price: 50,
                category: "electronics",
                image: "mock-image-1.jpg",
            },
        ];

        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            isError: false,
        });

        const {container} = render(
            <MemoryRouter>
                <Scrolling favorite={false} cart={false} selectedFilter={mockFilter} />
            </MemoryRouter>,
        );

        expect(container).toMatchSnapshot();
    });
});
