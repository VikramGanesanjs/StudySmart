import React, { createContext, useEffect, useState } from "react";

export const CurrentDataContext = createContext({});

const CurrentDataProvider = ({ children }) => {
  const [data, setData] = useState({});

  return (
    <CurrentDataContext.Provider value={{ data, setData }}>
      {children}
    </CurrentDataContext.Provider>
  );
};

export { CurrentDataProvider };
