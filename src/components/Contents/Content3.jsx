import React from "react";
import Reports from "../Hisobotlar/Reports";
import { decodedToken } from "../../helpers";
import BossReports from "../Boss/BossReports";

const Content3 = () => {
  return (
    <div>
      {decodedToken.is_staff && <Reports />}
      {decodedToken.is_boss && <BossReports />}
    </div>
  );
};

export default Content3;
