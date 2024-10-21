import React from 'react';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Talks from './components/Talks';
import Podcasts from './components/Podcasts';
import Blog from './components/Blog';
import ContactMe from './components/ContactMe';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [activeTab, setActiveTab] = React.useState('about');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-200">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {activeTab === 'about' && <AboutMe />}
          {activeTab === 'talks' && <Talks />}
          {activeTab === 'podcasts' && <Podcasts />}
          {activeTab === 'blog' && <Blog />}
          {activeTab === 'contact' && <ContactMe />}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;