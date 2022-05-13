import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './routes/Main/Main';
import Marketplace from './routes/Marketplace/Marketplace';
const App: FC = () => {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Marketplace" element={<Marketplace />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
};

export default App;
