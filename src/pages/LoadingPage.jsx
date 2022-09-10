import React from "react";
import NoHeaderLayout from "../components/common/NoHeaderLayout";
import Loading from "../components/loginRegister/Loading"

const LoadingPage = () => {
    return (
        <NoHeaderLayout>
            <Loading />
        </NoHeaderLayout>
    );
};

export default LoadingPage;
