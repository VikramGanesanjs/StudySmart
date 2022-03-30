import React, { createContext, useEffect, useState } from "react";
import {
  doc,
  getDocs,
  onSnapshot,
  collection,
  query,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";

export const CurrentDataContext = createContext({});

const CurrentDataProvider = ({ children }) => {
  const [data, setData] = useState({});

  useEffect(async () => {
    const ref = query(
      collection(db, "Users", auth.currentUser.uid, `S-${auth.currentUser.uid}`)
    );
    const unsub = onSnapshot(ref, (querySnap) => {
      let dat = {};
      querySnap.forEach((doc) => {
        dat[doc.id] = doc.data();
      });
      setData(dat);
    });
    return () => unsub;
  }, []);
  return (
    <CurrentDataContext.Provider value={{ data, setData }}>
      {children}
    </CurrentDataContext.Provider>
  );
};

export { CurrentDataProvider };
