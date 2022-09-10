import React from "react";
import Footer from "./Footer";

const NoHeaderLayout = ({ children }) => {
    return (
        <>
            {children}
            <Footer />
        </>
    );
};

export default NoHeaderLayout;
