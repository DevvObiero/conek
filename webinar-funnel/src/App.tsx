import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import OptIn from './pages/OptIn';
import Confirmation from './pages/Confirmation';
import { pageview } from './lib/pixel';
import Background from './components/Background';

/** Fires a Meta Pixel PageView on every route change (once per navigation, StrictMode-safe). */
function PixelRouteTracker() {
  const location = useLocation();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (lastTracked.current === location.key) return;
    lastTracked.current = location.key;
    pageview();
    window.scrollTo(0, 0);
  }, [location.key]);

  return null;
}

export default function App() {
  return (
    <>
      <Background />
      <PixelRouteTracker />
      <Routes>
        <Route path="/" element={<OptIn />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}