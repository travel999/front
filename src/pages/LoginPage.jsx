import React from "react";
import NoHeaderLayout from "../components/common/NoHeaderLayout";
import Login from "../components/loginRegister/Login"
import MobileLogin from "../components/loginRegister/MobileLogin";
import { useMediaQuery } from "react-responsive";

const LoginPage = () => {
    const MobileSize = useMediaQuery({ maxWidth: 430 });
    
    return (
        <NoHeaderLayout>
            {MobileSize ? <MobileLogin /> : <Login />}
        </NoHeaderLayout>
    );
};

export default LoginPage;
