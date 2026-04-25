import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import Template4 from './templates/Template4';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/template/1" element={<Template1 />} />
          <Route path="/template/2" element={<Template2 />} />
          <Route path="/template/3" element={<Template3 />} />
          <Route path="/template/4" element={<Template4 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
