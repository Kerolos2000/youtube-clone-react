import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
export const userDataContext = createContext();
export function UserDataContextProvider(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);
  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setData(decodedToken);
  }
  return (
    <userDataContext.Provider
      value={{
        data,
        setData,
        saveUserData,
      }}
    >
      {props.children}
    </userDataContext.Provider>
  );
}
