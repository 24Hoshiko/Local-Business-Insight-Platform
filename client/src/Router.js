import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';


import ScrollToTop from './ScrollToTop';


function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default AppRouter;
