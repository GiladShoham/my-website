import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Talks from './components/Talks';
import Podcasts from './components/Podcasts';
import Blog from './components/Blog';
import ContactMe from './components/ContactMe';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

const AppContent = () => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || 'about';
  const [activeTab, setActiveTab] = React.useState(currentPath);

  React.useEffect(() => {
    setActiveTab(currentPath);
  }, [currentPath]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/talks" element={<Talks />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;