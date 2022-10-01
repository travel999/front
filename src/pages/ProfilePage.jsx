import React from "react";
import Layout from "../components/common/Layout";
import Profile from "../components/startProfile/Profile";
import MobileProfile from "../components/startProfile/Mobileprofile";
import { useMediaQuery } from "react-responsive";

const MyProfilePage = () => {
    const MobileSize = useMediaQuery({ maxWidth: 430 });

    return (
        <Layout>
            {MobileSize ? <MobileProfile /> : <Profile />}
        </Layout>
    );
};

export default MyProfilePage;
