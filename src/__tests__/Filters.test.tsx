import {render, screen, fireEvent} from "@testing-library/react";
import {describe, it, expect, beforeEach, vi} from "vitest";
import Filters from "../components/Filters/Filters";
import {setFilter} from "../utils/sessionStorage";
import {Filter} from "../pages/Shopping";

vi.mock("../utils/sessionStorage", () => ({
    setFilter: vi.fn(),
}));

describe("Filters component", () => {
    const mockSetSelectedFilters = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
        mockSetSelectedFilters.mockClear();
        Object.defineProperty(window, "innerWidth", {writable: true, configurable: true, value: 1024});
    });

    it("renders correctly in desktop view", () => {
        const initialFilter: Filter = {
            category: "",
            values: {
                min: undefined,
                max: undefined,
            },
        };

        render(<Filters selectedFilter={initialFilter} setSelectedFilters={mockSetSelectedFilters} />);

        expect(screen.getByText(/Filters/i)).toBeInTheDocument();
        expect(screen.getByText(/Categories/i)).toBeInTheDocument();
        expect(screen.getByText(/Price Range/i)).toBeInTheDocument();
    });

    it("toggles filter sections correctly in mobile view", () => {
        Object.defineProperty(window, "innerWidth", {value: 500});
        window.dispatchEvent(new Event("resize"));

        const initialFilter: Filter = {
            category: "",
            values: {
                min: undefined,
                max: undefined,
            },
        };

        render(<Filters selectedFilter={initialFilter} setSelectedFilters={mockSetSelectedFilters} />);

        const filtersHeader = screen.getByRole("button", {name: /toggle filters section/i});
        expect(filtersHeader).toBeInTheDocument();

        fireEvent.click(filtersHeader);
        expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    });

    it("calls setFilter and setSelectedFilters when a category is selected", () => {
        const initialFilter: Filter = {
            category: "",
            values: {
                min: undefined,
                max: undefined,
            },
        };

        render(<Filters selectedFilter={initialFilter} setSelectedFilters={mockSetSelectedFilters} />);

        const categoriesHeader = screen.getByRole("button", {name: /toggle categories section/i});
        fireEvent.click(categoriesHeader);

        const categoryButton = screen.getByRole("button", {name: /select Men's clothing/i});
        fireEvent.click(categoryButton);

        expect(setFilter).toHaveBeenCalledWith([
            {
                category: "men's clothing",
                values: {min: undefined, max: undefined},
            },
        ]);
        expect(mockSetSelectedFilters).toHaveBeenCalledWith({
            category: "men's clothing",
            values: {min: undefined, max: undefined},
        });
    });

    it("calls setFilter and setSelectedFilters when a price range is selected", () => {
        const initialFilter: Filter = {
            category: "",
            values: {
                min: undefined,
                max: undefined,
            },
        };

        render(<Filters selectedFilter={initialFilter} setSelectedFilters={mockSetSelectedFilters} />);

        const priceRangeHeader = screen.getByRole("button", {name: /toggle price range section/i});
        fireEvent.click(priceRangeHeader);

        const priceRangeButton = screen.getByRole("button", {name: /select price range 10-50/i});
        fireEvent.click(priceRangeButton);

        expect(setFilter).toHaveBeenCalledWith([
            {
                category: "",
                values: {min: 10, max: 50},
            },
        ]);
        expect(mockSetSelectedFilters).toHaveBeenCalledWith({
            category: "",
            values: {min: 10, max: 50},
        });
    });

    it("renders correctly on resize", () => {
        const initialFilter: Filter = {
            category: "",
            values: {
                min: undefined,
                max: undefined,
            },
        };

        Object.defineProperty(window, "innerWidth", {writable: true, configurable: true, value: 500});
        window.dispatchEvent(new Event("resize"));

        render(<Filters selectedFilter={initialFilter} setSelectedFilters={mockSetSelectedFilters} />);

        const filtersHeader = screen.getByRole("button", {name: /toggle filters section/i});
        expect(filtersHeader).toBeInTheDocument();

        fireEvent.click(filtersHeader);

        expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    });

    it("matches snapshot for desktop view", () => {
        const initialFilter: Filter = {
            category: "",
            values: {
                min: undefined,
                max: undefined,
            },
        };

        const {container} = render(
            <Filters selectedFilter={initialFilter} setSelectedFilters={mockSetSelectedFilters} />,
        );

        expect(container).toMatchSnapshot();
    });

    it("matches snapshot for mobile view", () => {
        Object.defineProperty(window, "innerWidth", {value: 500});
        window.dispatchEvent(new Event("resize"));

        const initialFilter: Filter = {
            category: "",
            values: {
                min: undefined,
                max: undefined,
            },
        };

        const {container} = render(
            <Filters selectedFilter={initialFilter} setSelectedFilters={mockSetSelectedFilters} />,
        );

        expect(container).toMatchSnapshot();
    });

    it("matches snapshot when categories are expanded in mobile view", () => {
        const initialFilter: Filter = {
            category: "",
            values: {
                min: undefined,
                max: undefined,
            },
        };

        // Set the viewport to mobile dimensions
        Object.defineProperty(window, "innerWidth", {writable: true, configurable: true, value: 500});
        window.dispatchEvent(new Event("resize"));

        // Render the component
        const {container} = render(
            <Filters selectedFilter={initialFilter} setSelectedFilters={mockSetSelectedFilters} />,
        );

        // Find and interact with the "Toggle Filters Section" button
        const filtersHeader = screen.getByRole("button", {name: /toggle filters section/i});
        fireEvent.click(filtersHeader);

        // Expand the categories section
        const categoryHeader = screen.getByRole("button", {name: /toggle categories section/i});
        fireEvent.click(categoryHeader);

        // Match snapshot
        expect(container).toMatchSnapshot();
    });

    it("matches snapshot when price range is expanded", () => {
        const initialFilter: Filter = {
            category: "",
            values: {
                min: undefined,
                max: undefined,
            },
        };

        // Render the component
        const {container} = render(
            <Filters selectedFilter={initialFilter} setSelectedFilters={mockSetSelectedFilters} />,
        );

        // For mobile view, toggle filters section first
        const filtersHeader = screen.queryByRole("button", {name: /toggle filters section/i});
        if (filtersHeader) {
            fireEvent.click(filtersHeader);
        }

        // Expand the price range section
        const priceRangeHeader = screen.getByRole("button", {name: /toggle price range section/i});
        fireEvent.click(priceRangeHeader);

        // Match the snapshot
        expect(container).toMatchSnapshot();
    });
});
