import CreateAccount from "./account/CreateAccount";
import ResetPassword from "./account/ResetPassword";
import PaymentInfo from "./account/PaymentInfo";
import SignIn from "./account/SignIn";
import App from "./App";
import Cart from "./order/Cart";
import Browse from "./browse/Browse";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Browse />,
      },
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
        path: "/user/payment",
        element: <PaymentInfo />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
];
