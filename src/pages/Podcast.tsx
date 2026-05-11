import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Clock, Calendar, Headphones, ArrowRight, Radio } from 'lucide-react';
import { PodcastEpisode } from '../types';

interface PodcastProps {
  onPlayPodcast: (ep: PodcastEpisode) => void;
}

export default function Podcast({ onPlayPodcast }: PodcastProps) {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);

  useEffect(() => {
    fetch('/data/podcast.json')
      .then(res => res.json())
      .then(data => setEpisodes(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 pb-40">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 border-b border-white/10 pb-12">
        <div className="text-center md:text-left">
          <h1 className="text-6xl md:text-9xl mb-2">PODCAST</h1>
          <p className="text-brand-red font-display text-2xl tracking-[0.2em] mb-4 uppercase">Explorando Nichos e Tendências</p>
          <div className="flex gap-4 justify-center md:justify-start">
             <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-white/10">
                <Headphones size={20} className="text-brand-gold" />
                <span className="font-display text-xl">{episodes.length} EPISÓDIOS</span>
             </div>
             <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-white/10">
                <Radio size={20} className="text-brand-red pulsate" />
                <span className="font-display text-xl uppercase tracking-widest">Temporada 1</span>
             </div>
          </div>
        </div>
        
        <div className="hidden lg:block w-72 h-72 rounded-3xl bg-brand-red/10 border-2 border-brand-red/30 relative transform rotate-6 hover:rotate-0 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800" 
              alt="Podcast Cover" 
              className="w-full h-full object-cover rounded-2xl shadow-2xl absolute -top-4 -left-4"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {episodes.map((ep, i) => (
          <motion.div
            key={ep.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-card group flex flex-col md:flex-row p-6 gap-6 hover:bg-white/10 transition-colors"
          >
            <div className="relative w-full md:w-40 aspect-square overflow-hidden rounded-xl flex-shrink-0 shadow-lg">
              <img src={ep.capa} alt={ep.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <button 
                onClick={() => onPlayPodcast(ep)}
                className="absolute inset-0 bg-brand-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                  <Play size={24} fill="currentColor" />
                </div>
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-brand-gold font-display text-xl">EPISÓDIO #{ep.episodio.toString().padStart(2, '0')}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{ep.data}</span>
                </div>
                <h2 className="text-3xl mb-3 group-hover:text-brand-red transition-colors leading-none tracking-tight">{ep.titulo}</h2>
                <p className="text-muted text-sm line-clamp-2">{ep.descricao}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Clock size={14} /> {ep.duracao}</span>
                  <span className="flex items-center gap-1 italic text-brand-red/80">S1 • E{ep.episodio}</span>
                </div>
                <button 
                  onClick={() => onPlayPodcast(ep)}
                  className="flex items-center gap-2 text-brand-gold hover:text-white transition-colors"
                >
                  OUVIR AGORA <Play size={14} fill="currentColor" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
