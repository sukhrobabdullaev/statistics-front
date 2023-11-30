import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Main from "../pages/Main";
import LoginForm from "../pages/LoginForm";

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
]);

export default router;
