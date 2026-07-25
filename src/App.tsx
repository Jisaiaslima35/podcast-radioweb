import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Radio, MessageSquare, Info, Mic, Layout, Tv2, Menu, X, Users, Camera, Mic2, Plus } from 'lucide-react';
import { AppConfig, Post, PodcastEpisode, PresenterStatus } from './types';

// Components
import Navbar from './components/Navbar';
import RadioPlayer from './components/RadioPlayer';
import PodcastPlayer from './components/PodcastPlayer';
import TawkWidget from './components/TawkWidget';

// Pages
import Home from './pages/Home';
import Locutores from './pages/Locutores';
import Programacao from './pages/Programacao';
import Videos from './pages/Videos';
import Contato from './pages/Contato';
import Recados from './pages/Recados';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import Podcast from './pages/Podcast';

export default function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [activePodcast, setActivePodcast] = useState<PodcastEpisode | null>(null);

  useEffect(() => {
    fetch('/data/config.json')
      .then(res => res.json())
      .then(data => setConfig(data));
  }, []);

  if (!config) return <div className="h-screen bg-brand-black flex items-center justify-center font-display text-4xl text-brand-red animate-pulse">CARREGANDO...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-brand-black text-white flex flex-col">
        {/* Navigation Bar */}
        <Navbar config={config} />
        
        {/* Main Area */}
        <main className="flex-grow pt-24 pb-36">
          <PageRoutes config={config} onPlayPodcast={setActivePodcast} />
        </main>

        {/* Global Floating Custom Radio Player (Fixed at the bottom across the entire site) */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center gap-3 pointer-events-none p-4 md:p-6">
          <AnimatePresence>
            {activePodcast && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="pointer-events-auto w-full max-w-xl"
              >
                <PodcastPlayer episode={activePodcast} onClose={() => setActivePodcast(null)} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="pointer-events-auto w-full max-w-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            <RadioPlayer config={config} />
          </div>
        </div>

        <TawkWidget propertyId={config.tawkPropertyId} />
      </div>
    </Router>
  );
}

function PageRoutes({ config, onPlayPodcast }: { config: AppConfig, onPlayPodcast: (ep: PodcastEpisode) => void }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={
          <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Home config={config} onPlayPodcast={onPlayPodcast} />
          </motion.div>
        } />
        <Route path="/locutores" element={
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Locutores />
          </motion.div>
        } />
        <Route path="/programacao" element={
          <motion.div key={location.pathname} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
            <Programacao />
          </motion.div>
        } />
        <Route path="/videos" element={
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Videos />
          </motion.div>
        } />
        <Route path="/contato" element={
          <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Contato />
          </motion.div>
        } />
        <Route path="/recados" element={
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Recados />
          </motion.div>
        } />
        <Route path="/posts" element={
          <motion.div key={location.pathname} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Posts />
          </motion.div>
        } />
        <Route path="/post/:id" element={
          <motion.div key={location.pathname} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
            <PostDetail />
          </motion.div>
        } />
        <Route path="/podcast" element={
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Podcast onPlayPodcast={onPlayPodcast} />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}
