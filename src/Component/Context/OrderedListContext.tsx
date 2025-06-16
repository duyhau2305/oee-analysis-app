import React, { createContext, useState, useEffect, ReactNode } from 'react';


interface OrderedListContextType {
  orderedList: string[]; 
  setOrderedList: React.Dispatch<React.SetStateAction<string[]>>; 
}

export const OrderedListContext = createContext<OrderedListContextType | undefined>(undefined);

interface OrderedListProviderProps {
  children: ReactNode; 
}

export const OrderedListProvider: React.FC<OrderedListProviderProps> = ({ children }) => {
  const [orderedList, setOrderedList] = useState<string[]>(() => {
    
    const savedOrder = localStorage.getItem('orderedList');
    return savedOrder ? JSON.parse(savedOrder) : [];
  });

  
  useEffect(() => {
    localStorage.setItem('orderedList', JSON.stringify(orderedList));
  }, [orderedList]);

  return (
    <OrderedListContext.Provider value={{ orderedList, setOrderedList }}>
      {children}
    </OrderedListContext.Provider>
  );
};
