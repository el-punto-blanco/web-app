import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './app/page';
import SelectCountryPage from './app/select/page';
import GamePage from './app/game/page';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/select" element={<SelectCountryPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
