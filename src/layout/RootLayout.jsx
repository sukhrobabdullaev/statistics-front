import Navbar from "../components/Navbar";

const RootLayout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
