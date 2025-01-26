import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:category/:id" element={<Detail />} />
        <Route path="*" element={<h2>Page non trouvée</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
