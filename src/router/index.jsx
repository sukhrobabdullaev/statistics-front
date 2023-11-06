import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import RootLayout from "../layout/RootLayout";
import Main from "../pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/adminPanel",
    element: (
      <RootLayout>
        <Main />
      </RootLayout>
    ),
  },
]);

export default router;
