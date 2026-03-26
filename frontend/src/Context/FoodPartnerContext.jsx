import React, { createContext, useState, useContext } from "react";

export const FoodPartnerContext = createContext(null);

export function FoodPartnerProvider({ children }) {
  
  const [foodpartner, setfoodpartner] = useState(null);
  return (
    <FoodPartnerContext.Provider value={{ foodpartner, setfoodpartner }}>
      {children}
    </FoodPartnerContext.Provider>
  );
}

export function useFoodPartner() {
  const context = useContext(FoodPartnerContext);
  if (!context) {
    throw new Error("useFoodPartner must be used within a FoodPartnerProvider");
  }
  return context;
}

