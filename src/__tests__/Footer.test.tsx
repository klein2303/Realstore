import {render, screen} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import {MemoryRouter} from "react-router-dom";
import Footer from "../components/Footer/Footer";

describe("Footer component", () => {
    it("renders the footer with all elements", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        // Verify the footer role and label
        const footer = screen.getByRole("contentinfo", {name: /website footer/i});
        expect(footer).toBeInTheDocument();

        // Verify the decorative image
        const decorativeImage = screen.getByAltText(/decorative footer image/i);
        expect(decorativeImage).toBeInTheDocument();

        // Verify the title text
        const title = screen.getByText(/explore our catalog/i);
        expect(title).toBeInTheDocument();

        // Verify the footer navigation region
        const navRegion = screen.getByRole("region", {name: /footer navigation/i});
        expect(navRegion).toBeInTheDocument();

        // Verify the general links
        const homeLink = screen.getByRole("link", {name: /home link/i});
        const shopLink = screen.getByRole("link", {name: /shop/i});
        expect(homeLink).toHaveAttribute("href", "/");
        expect(shopLink).toHaveAttribute("href", "/Shopping");

        // Verify the logo section
        const logoImage = screen.getByAltText(/realstore logo/i);
        expect(logoImage).toBeInTheDocument();
        const logoInfo = screen.getByText(/@2024 realstore.com/i);
        expect(logoInfo).toBeInTheDocument();
    });

    it("renders navigation links correctly", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        // Check the "Home" link
        const homeLink = screen.getByRole("link", {name: /home link/i});
        expect(homeLink).toHaveAttribute("href", "/");

        // Check the "Shop" link
        const shopLink = screen.getByRole("link", {name: /shop/i});
        expect(shopLink).toHaveAttribute("href", "/Shopping");
    });

    it("renders the logo and company information", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        // Verify the logo
        const logoImage = screen.getByAltText(/realstore logo/i);
        expect(logoImage).toBeInTheDocument();

        // Verify the company information text
        const companyInfo = screen.getByText(/@2024 realstore.com/i);
        expect(companyInfo).toBeInTheDocument();
    });

    it("matches snapshot", () => {
        const {container} = render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );
        expect(container).toMatchSnapshot();
    });
});
