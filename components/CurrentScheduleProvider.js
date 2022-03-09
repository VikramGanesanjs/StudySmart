import React, { createContext, useEffect, useState } from "react";

export const CurrentScheduleContext = createContext({});

const CurrentScheduleProvider = ({ children }) => {
  const [currentSchedule, setCurrentSchedule] = useState("");

  return (
    <CurrentScheduleContext.Provider
      value={{ currentSchedule, setCurrentSchedule }}
    >
      {children}
    </CurrentScheduleContext.Provider>
  );
};

export { CurrentScheduleProvider };
