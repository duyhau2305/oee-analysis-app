import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayOut';
import Dashboard1 from '../Pages/Overview/Dashboard';
import DataEntry from '../Pages/DataEntry/DataEntry';
import AvailableRate from '../Pages/AvailableRate/AvailableRate';
import NotFound from '../Pages/NotFound';

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={
        <MainLayout>
          <Dashboard1 />
        </MainLayout>
      } />
      <Route path="/DiCore/oee/data-entry" element={
        <MainLayout>
          <DataEntry />
        </MainLayout>
      } />
      <Route path="/DiCore/oee/available-rate" element={
        <MainLayout>
          <AvailableRate />
        </MainLayout>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;