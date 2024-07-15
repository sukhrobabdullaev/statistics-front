import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [templateDetails, setTemplateDetails] = useState([]);
  const [letterDates, setLetterDates] = useState([]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        templateDetails,
        setTemplateDetails,
        letterDates,
        setLetterDates,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
