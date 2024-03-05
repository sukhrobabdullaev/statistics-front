import React from "react";
import { decodedToken } from "../helpers";

const SuperUser = () => {
  console.log(decodedToken);
  return <div>SuperUser</div>;
};

export default SuperUser;
