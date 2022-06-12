import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { Navbar, Footer } from "../components";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Real Estate App</title>
      </Head>
      <Box maxWidth="1280px" m="auto">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
};
export default Layout;
