import SignIn from "./SignIn";
import Root from "./Root";

export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
];
