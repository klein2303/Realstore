import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import Navbar from "../components/Navbar/Navbar"; // Adjust the import path
import {MemoryRouter} from "react-router-dom";

// Helper function to render the Navbar component
const renderNavbar = () => {
    return render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>,
    );
};

test("Navbar snapshot", () => {
    const {asFragment} = renderNavbar();
    expect(asFragment()).toMatchSnapshot();
});

test("renders all navigation links", () => {
    renderNavbar();

    // Check for the presence of navigation links
    expect(screen.getByText(/HOME/i)).toBeInTheDocument();
    expect(screen.getByText(/SHOP/i)).toBeInTheDocument();
    expect(screen.getByText(/MY CART/i)).toBeInTheDocument();
    expect(screen.getByAltText(/RealStore logo/i)).toBeInTheDocument();
});
