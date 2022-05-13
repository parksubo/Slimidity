import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './routes/Main/Main';
const App: FC = () => {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
};

export default App;
