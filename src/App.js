import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NewsList from './pages/NewsList/NewsList';
import NewsDetails from './pages/NewsDetails/NewsDetails';
import NewsCreate from './pages/News/NewsCreate';
import ScrollToTop from './ScrollToTop';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Quiz from './pages/Quiz/Quiz';
import VerifyDiploma from './pages/VerifyDiploma/VerifyDiploma';
import Olympiad from './pages/Olympiad/Olympiad';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import { useEffect } from 'react';
import Admin from './pages/Admin/Admin';
import Order from './pages/Order/Order';
import Faq from './pages/Faq/Faq';
import NotFound from './pages/NotFound/NotFound';
import AdminMessages from './pages/AdminMessages/AdminMessages';
import Committee from './pages/SchoolPages/Committee/Committee';
import Safety from './pages/SchoolPages/Safety/Safety';
import Director from './pages/Director/Director';

const ProtectedRoute = ({ children, tokenKey }) => {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    return <Navigate to={`/admin`} replace />;
  }
  return children;
};

function App() {
  useEffect(() => {
    const onStorageChange = () => {
      if (!localStorage.getItem('token')) {
        window.location.href = '/admin';
      }
    };
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/school/safety" element={<Safety />} />
          <Route path="/school/director" element={<Director />} />
          <Route path="/order" element={<Order />} />
          <Route path="/quiz/start" element={<Quiz />} />
          <Route path="/quiz" element={<Olympiad />} />
          <Route path="/quiz/document/verify" element={<VerifyDiploma />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<NewsList />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/articles/:slug" element={<NewsDetails />} />
          
          <Route
            path="/admin"
            element={
              localStorage.getItem('token') ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLogin />
              )
            }
          />
          <Route
            path="/admin/articles/create"
            element={
              <ProtectedRoute tokenKey="token">
                <NewsCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute tokenKey="token">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute tokenKey="token">
                <AdminMessages />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
