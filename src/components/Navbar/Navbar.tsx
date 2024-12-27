import {CiHeart} from "react-icons/ci";
import {HiOutlineShoppingBag} from "react-icons/hi2";
import {Link} from "react-router-dom";
import styles from "./Navbar.module.css";
import {RxHamburgerMenu, RxCross1} from "react-icons/rx";
import {useState} from "react";
import logo from "/Logo.svg";

const Navbar = () => {
    //For Hamburgermenu in mobile-version
    const [isOpen, setIsOpen] = useState(false);

    return (
        <main>
            <nav className={styles.navbar} role="navigation" aria-label="Main Navigation">
                {isOpen && (
                    <div className={styles.mobilemenu} role="dialog" aria-label="Mobile Navigation Menu">
                        <div className={styles.crosspos}>
                            <RxCross1
                                className={styles.cross}
                                onClick={() => setIsOpen(false)}
                                aria-label="Close Menu"
                            />
                        </div>
                        <Link to={"/"} className={styles.navlink}>
                            <p>HOME</p>
                        </Link>
                        <Link to={"/Shopping"} className={styles.navlink}>
                            <p>SHOP</p>
                        </Link>
                        <Link to={"/Favorites"} className={styles.navlink}>
                            <p>FAVORITES</p>
                        </Link>
                    </div>
                )}
                <RxHamburgerMenu
                    className={styles.hamburgmenu}
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Menu"
                />
                <div className={styles.navpage} role="navigation" aria-label="Desktop Navigation Links">
                    <Link to={"/"} className={styles.navlink}>
                        <p>HOME</p>
                    </Link>
                    <Link to={"/Shopping"} className={styles.navlink}>
                        <p>SHOP</p>
                    </Link>
                </div>
                <div className={styles.navlogo}>
                    <Link to={"/"}>
                        <img src={logo} alt="RealStore logo" className={styles.logoimg} aria-label="RealStore Logo" />
                    </Link>
                </div>
                <div className={styles.navlinks} role="navigation" aria-label="User Navigation">
                    <Link to={"/ShoppingCart"} className={styles.cartbutton}>
                        <p>MY CART</p>
                        <HiOutlineShoppingBag className={styles.whiteicon} />
                    </Link>
                    <Link to={"/Favorites"} className={styles.navlink}>
                        <CiHeart className={styles.heart} aria-label="View My Favorites" />
                    </Link>
                </div>
                <Link to={"/ShoppingCart"} className={styles.shoppingButton} aria-label="View My Cart">
                    <HiOutlineShoppingBag className={styles.whiteicon} />
                </Link>
            </nav>
        </main>
    );
};

export default Navbar;
