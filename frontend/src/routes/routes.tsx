import CreateAccount from "./account/CreateAccount";
import ResetPassword from "./account/ResetPassword";
import PaymentInfo from "./account/PaymentInfo";
import SignIn from "./account/SignIn";
import App from "./App";
import Cart from "./order/Cart";
import Browse from "./browse/Browse";
import ProductPage from "./browse/ProductPage";
import Checkout from "./order/Checkout";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Browse />,
      },

      // Product Routes
      {
        path: "/product/:id",
        element: <ProductPage />,
      },

      // User Routes
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
      {
        path: "/cart/checkout",
        element: <Checkout />,
      },
    ],
  },
];
