import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { isFirebaseConfigured } from './firebase';
import { HomePage } from './pages/HomePage';
import { ActivityPage } from './pages/ActivityPage';

export default function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <div className="container">
          <strong>Horse Management</strong>
        </div>
      </header>
      <main className="container">
        {isFirebaseConfigured ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activity/:id" element={<ActivityPage />} />
          </Routes>
        ) : (
          <div className="card">
            <h2>Firebase is not configured</h2>
            <p>
              Copy <code>.env.example</code> to <code>.env</code>, fill in your Firebase web app settings, then restart
              the dev server.
            </p>
          </div>
        )}
      </main>
    </BrowserRouter>
  );
}
