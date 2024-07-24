import {PropsWithChildren, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {ConfigState} from "../store/config.ts";

function AuthLayout({ children }: PropsWithChildren) {
    const navigate = useNavigate();

    const token = useSelector((state: ConfigState) => state.ecom.token);

    useEffect(() => {
        if (!token) {
            navigate("/authentication/sign-in");
        }
    }, [navigate, token]);

    return (<>{children}</>);
}

export default AuthLayout;