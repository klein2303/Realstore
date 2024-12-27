import {useState, useEffect} from "react";
import styles from "./Filters.module.css";
import {IoIosArrowForward, IoIosArrowDown} from "react-icons/io";
import {Filter} from "../../pages/Shopping.tsx";
import {setFilter} from "../../utils/sessionStorage.ts";

type filterTabs = {
    filter: boolean;
    category: boolean;
    priceRange: boolean;
};

interface FiltersProps {
    selectedFilter: Filter;
    setSelectedFilters: (filter: Filter) => void;
}
const Filters = ({selectedFilter, setSelectedFilters}: FiltersProps) => {
    const [filterTabs, setFilterTabs] = useState<filterTabs>({filter: false, category: false, priceRange: false});
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
    const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"];
    const values = ["0-10", "10-50", "50-100", "100-500", "500-1000"];

    const toggleFiltersSection = () =>
        setFilterTabs({filter: !filterTabs.filter, category: filterTabs.category, priceRange: filterTabs.priceRange});

    const toggleCategoriesSection = () => {
        setFilterTabs({filter: filterTabs.filter, category: !filterTabs.category, priceRange: filterTabs.priceRange});
    };

    const togglePriceRangeSection = () => {
        setFilterTabs({filter: filterTabs.filter, category: filterTabs.category, priceRange: !filterTabs.priceRange});
    };

    const handleFilterChange = (category: string, min?: number, max?: number) => {
        const filter: Filter = {
            category: category,
            values: {
                min: min,
                max: max,
            },
        };
        setFilter([filter]); // Session storage
        setSelectedFilters(filter);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 780);
    };

    const capitalize = (text: string) => {
        return text.charAt(0).toUpperCase() + text.substring(1);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className={filterTabs.filter ? styles.filterSection : styles.closed} aria-label="Filter Options">
            <header className={styles.categoryAndArrow}>
                {isMobile && (
                    <div
                        className={styles.mobilefilter}
                        onClick={toggleFiltersSection}
                        role="button"
                        aria-expanded={filterTabs.filter}
                        tabIndex={0}
                        aria-controls="filter-options"
                        onKeyDown={(e) => e.key === "Enter" && toggleFiltersSection()}
                        aria-label="Toggle Filters Section">
                        <h2 className={styles.h2text}>Filters</h2>
                        <span className={styles.arrow}>
                            {filterTabs.filter ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        </span>
                    </div>
                )}
            </header>
            {!isMobile && <h2 className={styles.h2text}>Filters</h2>}
            {(!isMobile || filterTabs.filter) && (
                <>
                    <section className={styles.filterCategory}>
                        <header
                            className={styles.categoryAndArrow}
                            onClick={toggleCategoriesSection}
                            role="button"
                            aria-expanded={filterTabs.category}
                            aria-controls="category-options"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && toggleCategoriesSection()}
                            aria-label="Toggle Categories Section">
                            <h3 className={styles.h3text}>Categories</h3>
                            <span className={styles.arrow}>
                                {filterTabs.category ? <IoIosArrowDown /> : <IoIosArrowForward />}
                            </span>
                        </header>
                        {filterTabs.category && (
                            <ul id="category-options" aria-label="Filter by Category" className={styles.filterStyling}>
                                {categories.map((title) => {
                                    let value = "";
                                    if (selectedFilter.category !== title) {
                                        value = title;
                                    }
                                    return (
                                        <li
                                            key={title}
                                            className={styles.selectionSection}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() =>
                                                handleFilterChange(
                                                    value,
                                                    selectedFilter.values.min,
                                                    selectedFilter.values.max,
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                handleFilterChange(
                                                    value,
                                                    selectedFilter.values.min,
                                                    selectedFilter.values.max,
                                                )
                                            }
                                            aria-label={`Filter by ${capitalize(title)}`}>
                                            <button
                                                className={
                                                    selectedFilter.category == title
                                                        ? styles.clickedBox
                                                        : styles.clickBox
                                                }
                                                aria-pressed={selectedFilter.category === title}
                                                aria-label={
                                                    selectedFilter.category === title
                                                        ? `Selected ${capitalize(title)}`
                                                        : `Select ${capitalize(title)}`
                                                }
                                            />
                                            <h5 className={styles.line}>{capitalize(title)}</h5>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        <h5 className={styles.h5text}>------------------------------------------</h5>
                    </section>
                    <section className={styles.filterCategory}>
                        <header
                            className={styles.categoryAndArrow}
                            onClick={togglePriceRangeSection}
                            role="button"
                            aria-expanded={filterTabs.priceRange}
                            aria-controls="price-range-options"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && togglePriceRangeSection()}
                            aria-label="Toggle Price Range Section">
                            <h3 className={styles.h3text}>Price Range</h3>
                            <span className={styles.arrow}>
                                {filterTabs.priceRange ? <IoIosArrowDown /> : <IoIosArrowForward />}
                            </span>
                        </header>
                        {filterTabs.priceRange && (
                            <ul
                                id="price-range-options"
                                aria-label="Filter by Price Range"
                                className={styles.filterStyling}>
                                {values.map((value: string) => {
                                    const values = value.split("-");
                                    let min: number | undefined = parseInt(values[0]);
                                    let max: number | undefined = parseInt(values[1]);
                                    const selectedFilterValue = `${selectedFilter.values.min}-${selectedFilter.values.max}`;
                                    if (selectedFilterValue == value) {
                                        min = undefined;
                                        max = undefined;
                                    }
                                    return (
                                        <li
                                            key={value}
                                            className={styles.selectionSection}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => handleFilterChange(selectedFilter.category, min, max)}
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                handleFilterChange(selectedFilter.category, min, max)
                                            }
                                            aria-label={`Filter by price range ${value} dollars`}>
                                            <button
                                                className={
                                                    selectedFilterValue == value ? styles.clickedBox : styles.clickBox
                                                }
                                                aria-pressed={selectedFilterValue === value}
                                                aria-label={
                                                    selectedFilterValue === value
                                                        ? `Selected price range ${value}`
                                                        : `Select price range ${value}`
                                                }
                                            />
                                            <h5 className={styles.h5text}>{value} $</h5>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        <h5 className={styles.h5text}>------------------------------------------</h5>
                    </section>
                </>
            )}
        </section>
    );
};

export default Filters;
