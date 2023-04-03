import CreateAccount from "./account/CreateAccount";
import ResetPassword from "./account/ResetPassword";
import SignIn from "./account/SignIn";
import App from "./App";
import Cart from "./Cart";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/user/signin",
        element: <SignIn />,
      },
      {
        path: "/user/create",
        element: <CreateAccount />,
      },
      {
        path: "/user/forgot",
        element: <ResetPassword />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
];
