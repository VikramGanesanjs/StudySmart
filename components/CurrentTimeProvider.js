import React, { createContext, useEffect, useState } from "react";

const CurrentTimeContext = createContext({});

const CurrentTimeProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <CurrentTimeContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </CurrentTimeContext.Provider>
  );
};

export { CurrentTimeProvider };
