import React from 'react';
import AppRouter from './Routes/AppRouter';
import { LanguageProvider } from './Locales/LanguageContext';


const App: React.FC = () => {
 return (
      <LanguageProvider>     
        <AppRouter />   
      </LanguageProvider>
 
   
 );
}

export default App;