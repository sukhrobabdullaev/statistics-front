import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
