import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Main from "../pages/Main";
import LoginForm from "../pages/LoginForm";
import Revision from "../components/Hisobotlar/Revision";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: (
      <RootLayout>
        <Main />
      </RootLayout>
    ),
  },
  {
    path: "/revison/:id",
    element: (
      <RootLayout>
        <Revision />
      </RootLayout>
    ),
  },
]);

export default router;
