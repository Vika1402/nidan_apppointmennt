import { createContext } from "react";
import { doctors } from "../assets/assets/assets";
export const AppContext = createContext(0);

const AppContextProvider = (props) => {
  const currencySymbol = "₹";

  const value = {
    doctors,
    currencySymbol,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
