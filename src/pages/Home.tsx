import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Calendar, Clock, ArrowRight, Camera, Mic2, Users, Radio, MessageCircle, Plus } from 'lucide-react';
import { AppConfig, Post, PodcastEpisode, PresenterStatus } from '../types';

interface HomeProps {
  config: AppConfig;
  onPlayPodcast: (ep: PodcastEpisode) => void;
}

export default function Home({ config, onPlayPodcast }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [status, setStatus] = useState<PresenterStatus | null>(null);

  useEffect(() => {
    fetch('/data/posts.json').then(res => res.json()).then(data => setPosts(data.slice(0, 3)));
    fetch('/data/podcast.json').then(res => res.json()).then(data => setEpisodes(data.slice(0, 3)));
    
    const fetchStatus = () => {
      fetch(config.statusApiUrl).then(res => res.json()).then(data => setStatus(data));
    };
    
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [config.statusApiUrl]);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={config.banner} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-9xl mb-4"
          >
            {config.nome}
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-3xl text-brand-gold font-light tracking-widest uppercase mb-10"
          >
            {config.slogan}
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="btn-primary flex items-center gap-2">
              <Radio size={24} /> OUVIR AGORA
            </button>
            <Link to="/posts" className="btn-outline flex items-center gap-2">
              VER POSTS <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-20">
          {/* Latest Posts */}
          <section>
            <div className="flex items-center justify-between mb-8 border-l-4 border-brand-red pl-4">
              <h2 className="text-4xl uppercase">Últimas Publicações</h2>
              <Link to="/posts" className="text-brand-gold hover:text-brand-red transition-colors font-display text-xl">VER TODOS +</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/post/${post.id}`} className="glass-card group flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.imagem} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-brand-red text-white font-display px-3 py-1 text-sm rounded">{post.categoria}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-muted text-[10px] uppercase tracking-widest mb-2 font-bold">{post.data} • Por {post.autor}</span>
                    <h3 className="text-2xl mb-3 group-hover:text-brand-red transition-colors leading-tight">{post.titulo}</h3>
                    <p className="text-muted text-sm line-clamp-3 mb-6">{post.resumo}</p>
                    <div className="mt-auto flex items-center gap-2 text-brand-gold font-display text-lg group-hover:gap-4 transition-all">
                      LER MAIS <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Podcast Section */}
          <section>
            <div className="flex items-center justify-between mb-8 border-l-4 border-brand-gold pl-4">
              <h2 className="text-4xl uppercase">Episódios Recentes</h2>
              <Link to="/podcast" className="text-brand-red hover:text-brand-gold transition-colors font-display text-xl">EPISÓDIOS +</Link>
            </div>
            
            <div className="space-y-4">
              {episodes.map((ep) => (
                <div key={ep.id} className="glass-card flex items-center p-4 gap-4 hover:bg-white/10 transition-colors">
                  <img src={ep.capa} alt={ep.titulo} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-muted mb-1">
                      <span>{ep.data}</span>
                      <span>•</span>
                      <span>{ep.duracao}</span>
                    </div>
                    <h3 className="text-xl truncate">{ep.titulo}</h3>
                    <p className="text-muted text-xs truncate">{ep.descricao}</p>
                  </div>
                  <button 
                    onClick={() => onPlayPodcast(ep)}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all"
                  >
                    <Play size={20} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar (Right 1 col) */}
        <aside className="space-y-12">
          {/* Status Widget */}
          <section className="glass-card p-6 border-brand-red/30">
            <h3 className="text-2xl mb-4 border-b border-white/10 pb-2">STATUS DO AR</h3>
            {status ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${status.online ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500'}`}></div>
                  <span className="font-display text-xl tracking-wide">{status.online ? 'PROGRAMAÇÃO AO VIVO' : 'PROGRAMAÇÃO AUTOMÁTICA'}</span>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <p className="text-brand-gold text-[10px] uppercase mb-1 tracking-widest font-bold">Apresentador</p>
                  <p className="text-xl font-display">{status.apresentador}</p>
                  {status.online && <p className="text-muted text-[10px] mt-1">Desde as {status.horarioEntrada}</p>}
                </div>
                <div className="bg-brand-red/10 border border-brand-red/20 rounded-lg p-3 italic text-sm text-center">
                  "{status.mensagem}"
                </div>
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center animate-pulse text-white/20">Sincronizando...</div>
            )}
          </section>

          {/* Meeting Widget */}
          <section className="glass-card overflow-hidden bg-brand-red/5 border-brand-red/20">
             <div className="p-6 text-center space-y-4">
               <div className="flex justify-center">
                 <div className="w-16 h-16 bg-brand-red/20 rounded-full flex items-center justify-center text-brand-red">
                   <Users size={32} />
                 </div>
               </div>
               <h3 className="text-3xl uppercase tracking-wider text-brand-gold">Reunião ao Vivo</h3>
               <p className="text-sm text-muted">Entre em nossa sala de reuniões agora e participe do debate.</p>
               <div className="flex flex-wrap justify-center gap-2">
                 {config.wherebyHorarios.map((h, i) => (
                   <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-white/80">{h}</span>
                 ))}
               </div>
               <a 
                href={config.wherebyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary w-full block text-lg py-4 flex items-center justify-center gap-3"
               >
                 ENTRAR AGORA <Plus />
               </a>
               <div className="flex justify-center gap-4 text-white/40">
                  <Camera size={16} />
                  <Mic2 size={16} />
                  <MessageCircle size={16} />
               </div>
             </div>
          </section>

          {/* Social Links */}
          <section className="glass-card p-6">
            <h3 className="text-2xl mb-6">SIGA-NOS</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(config.redesSociais).map(([name, url]) => (
                <a 
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center justify-center hover:bg-brand-red transition-all group"
                >
                  <span className="font-display text-lg uppercase tracking-widest group-hover:scale-110 transition-transform">{name}</span>
                </a>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Whereby Iframe Embed as a "Live Event" */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center pulsate">
                <Radio className="text-white" size={24} />
            </div>
            <div>
                <h2 className="text-4xl uppercase leading-none">Estúdio Virtual</h2>
                <p className="text-brand-gold text-sm tracking-widest uppercase mt-1">Interaja com os locutores em tempo real</p>
            </div>
        </div>
        <div className="glass-card h-[700px] relative">
            <iframe 
                src={config.wherebyUrl} 
                allow="camera; microphone; fullscreen; speaker; display-capture; compute-pressure" 
                style={{ height: '700px', width: '100%', border: 'none' }}
                className="rounded-xl"
            ></iframe>
        </div>
      </section>
    </div>
  );
}
