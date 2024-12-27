import {Routes, Route, HashRouter} from "react-router-dom";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NoPage from "./pages/NoPage";
import Shopping from "./pages/Shopping";
import Clothe from "./pages/Clothe";

const Router = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="*"
                    element={
                        <>
                            <Navbar />
                            <NoPage />
                            <Footer />
                        </>
                    }
                />
                <Route path="/ShoppingCart" element={<ShoppingCart />} />
                <Route path="/Favorites" element={<Favorites />} />
                <Route path="/Shopping" element={<Shopping />} />
                <Route path="/Clothe/:id" element={<Clothe />} />
            </Routes>
        </HashRouter>
    );
};

export default Router;
