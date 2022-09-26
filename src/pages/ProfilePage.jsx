import React from "react";
import NoHeaderLayout from "../components/common/NoHeaderLayout";
import Profile from "../components/startProfile/Profile";
import MobileProfile from "../components/startProfile/Mobileprofile";
import { useMediaQuery } from "react-responsive";

const MyProfilePage = () => {
    const MobileSize = useMediaQuery({ maxWidth: 430 });

    return (
        <NoHeaderLayout>
            {MobileSize ? <MobileProfile /> : <Profile />}
        </NoHeaderLayout>
    );
};

export default MyProfilePage;
