import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Main from "../pages/Main";
import LoginForm from "../pages/LoginForm";
import Revision from "../components/Hisobotlar/Revision";
import InnUpload from "../components/Hisobotlar/InnUpload";
import SuperUser from "../pages/SuperUser";
import BossReview from "../components/Boss/BossReview";
import TemplateDetails from "../components/Boss/TemplateDetails";
import Signed from "../components/Hisobotlar/Signed";
import SignedXat from "../components/Hisobotlar/SignedXat";
import InnUploadUpdate from "../components/Hisobotlar/InnUploadUpdate";
import SignedContent from "../components/Hisobotlar/SignedContent";

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
    path: "/superuser",
    element: (
      <RootLayout>
        <SuperUser />
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
    path: "/signed-letters/:id",
    element: (
      <RootLayout>
        <Signed />
      </RootLayout>
    ),
  },
  {
    path: "/signed-letters/:id/:xat",
    element: (
      <RootLayout>
        <SignedXat />
      </RootLayout>
    ),
  },
  {
    path: "/signed/:id",
    element: (
      <RootLayout>
        <SignedContent />
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
  {
    path: "/revison/:id/inn_upload/:xat",
    element: (
      <RootLayout>
        <InnUploadUpdate />
      </RootLayout>
    ),
  },
  {
    path: "/boss-review/:id",
    element: (
      <RootLayout>
        <BossReview />
      </RootLayout>
    ),
  },
  {
    path: "/boss-review/:id/template-details",
    element: (
      <RootLayout>
        <TemplateDetails />
      </RootLayout>
    ),
  },
]);

export default router;
