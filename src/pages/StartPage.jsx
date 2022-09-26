import React from "react";
import Start from "../components/startProfile/Start";
import MobileStart from "../components/startProfile/MobileStart";
import NoHeaderLayout from "../components/common/NoHeaderLayout";
import { useMediaQuery } from "react-responsive";

const StartPage = () => {
    const MobileSize = useMediaQuery({ maxWidth: 430 });

    return (
        <NoHeaderLayout>
            {MobileSize ? <MobileStart /> : <Start />}
        </NoHeaderLayout>
    );
};

export default StartPage;
