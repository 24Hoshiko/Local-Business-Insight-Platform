import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';


import ScrollToTop from './ScrollToTop';
import Signin from './pages/Signin';


function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Signin />} />
      </Routes>
    </>
  );
}

export default AppRouter;
