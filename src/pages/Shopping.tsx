import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styling from "../styles/Shopping.module.css";
import Scrolling from "../components/Scrolling/Scrolling";
import Filters from "../components/Filters/Filters";
import {useEffect, useState} from "react";
import {getFilter} from "../utils/sessionStorage";

export type Filter = {
    category: string;
    values: {
        min?: number;
        max?: number;
    };
};

const Shopping = () => {
    const [selectedFilters, setSelectedFilters] = useState<Filter>({
        category: "",
        values: {min: undefined, max: undefined},
    });
    useEffect(() => {
        if (getFilter().length > 0) {
            setSelectedFilters(getFilter()[0]);
        }
    }, []);
    return (
        <>
            <Navbar />
            <main className={styling.shoppingpage}>
                <Filters selectedFilter={selectedFilters} setSelectedFilters={setSelectedFilters} />
                <Scrolling favorite={true} cart={true} selectedFilter={selectedFilters} />
            </main>
            <Footer />
        </>
    );
};

export default Shopping;
