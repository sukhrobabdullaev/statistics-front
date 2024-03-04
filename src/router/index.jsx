import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Main from "../pages/Main";
import LoginForm from "../pages/LoginForm";
import Revision from "../components/Hisobotlar/Revision";
import InnUpload from "../components/Hisobotlar/InnUpload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/staff-dashboard",
    element: (
      <RootLayout>
        <Main />
      </RootLayout>
    ),
  },
  {
    path: "/boss-dashboard",
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
  {
    path: "/revison/:id/inn_upload",
    element: (
      <RootLayout>
        <InnUpload />
      </RootLayout>
    ),
  },
]);

export default router;
