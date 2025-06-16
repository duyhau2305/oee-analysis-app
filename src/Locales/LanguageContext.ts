import React, { createContext, useContext, useState, useEffect } from "react";

import en from "./en.json";
import vi from "./vi.json";
import zh from "./zh.json";

const translations: Record<string, Record<string, string>> = { en, vi, zh };

type LanguageContextType = {
 language: string;
 setLanguage: (language: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
 language: "en",
 setLanguage: () => {},
});

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
 const [language, setLanguage] = useState(
   localStorage.getItem("selectedLang") || "en"
 );

 useEffect(() => {
   localStorage.setItem("selectedLang", language);
   updateTranslations(language);
 }, [language]);

 const updateTranslations = (lang: string) => {
   document.querySelectorAll("[data-translate]").forEach((element) => {
     const key = element.getAttribute("data-translate");
     if (key) {
       element.textContent = translations[lang][key] || key;
     }
   });
 };

 const contextValue = {
   language,
   setLanguage,
 };

 return React.createElement(
   LanguageContext.Provider,
   { value: contextValue },
   children
 );
};

export const useLanguage = () => useContext(LanguageContext);