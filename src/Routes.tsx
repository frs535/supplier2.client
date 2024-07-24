import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from "./App.tsx";
import {Error404, MainLayout, MainLayoutProvider} from "@frs535/react-ui-components";
import {sitemap } from "./sitemap.tsx";
import SignIn from "./pages/authentication/SignIn";
import SignOut from "./pages/authentication/SignOut";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import ResetPassword from "./pages/authentication/ResetPassword";
import LockScreen from "./pages/authentication/LockScreen";
import TwoFA from "./pages/authentication/TwoFA";
import SignUp from "./pages/authentication/SignUp";
import AuthLayout from "./Layouts/AuthLayout";
import EcommerceLayout from "./Layouts/EcommerceLayout";
import Cart from "./pages/proposal/customer/Cart.tsx";

const routes: RouteObject[]=[

    {
        element: <App/>,
        children:[
            {
                path: '/',
                element: (
                    <AuthLayout>
                        <MainLayoutProvider>
                            <MainLayout routes={sitemap}/>
                        </MainLayoutProvider>
                    </AuthLayout>
                )
            },
            {
                path: 'authentication',
                children:[
                    {
                        path: 'sign-in',
                        element: <SignIn/>
                    },
                    {
                        path: 'sign-up',
                        element: <SignUp/>
                    },
                    {
                        path: 'sign-out',
                        element: <SignOut/>
                    },
                    {
                        path: 'forgot-password',
                        element: <ForgotPassword />
                    },
                    {
                        path: 'reset-password',
                        element: <ResetPassword />
                    },
                    {
                        path: 'lock-screen',
                        element: <LockScreen />
                    },
                    {
                        path: '2FA',
                        element: <TwoFA />
                    }
                ]
            },
            {
                path: 'proposal',
                element: <EcommerceLayout />,
                children:[
                    {
                        path: ':id',
                        element: <Cart/>
                    }
                ]
            },
            {
                path: '*',
                element: <Error404 />
            }
        ]
    }
];

export const router = createBrowserRouter(routes);

export default routes;