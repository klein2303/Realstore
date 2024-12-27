import {useParams} from "react-router-dom";
import ActionBox from "../components/Clothe/ActionBox";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styles from "../styles/Clothe.module.css";

const Clothe = () => {
    const {id} = useParams<{id: string}>();
    const productId = id ? parseInt(id) : 0; // Ensure id is parsed correctly

    return (
        <>
            <Navbar />
            <main className={styles.page}>
                <ActionBox productId={productId} />
            </main>
            <Footer />
        </>
    );
};

export default Clothe;
