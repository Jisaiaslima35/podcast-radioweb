import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Tv, Eye, Share2, Star, Clock, X } from 'lucide-react';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  views: string;
  duration: string;
  thumbnail: string;
  featured: boolean;
}

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videosList: Video[] = [
    {
      id: "1",
      youtubeId: "vB004b-fGfA",
      title: "Clamor Especial da Meia-Noite - O Clamor Que Abre Portas",
      category: "Clamor & Oração",
      views: "18k views",
      duration: "45:10",
      thumbnail: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=600",
      featured: true
    },
    {
      id: "2",
      youtubeId: "Wn_E86rWqYQ",
      title: "Seleção Especial dos Melhores Louvores que Libertam 2026",
      category: "Louvores",
      views: "52k views",
      duration: "1:24:15",
      thumbnail: "https://images.unsplash.com/photo-1452421820064-a0357a9332bbc?q=80&w=600",
      featured: false
    },
    {
      id: "3",
      youtubeId: "mNul5h3z2Xg",
      title: "Tempo de Adoração Contínua - Clássicos Gospel de Unção",
      category: "Adoração",
      views: "24k views",
      duration: "2:10:00",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600",
      featured: false
    },
    {
      id: "4",
      youtubeId: "f9D_J3t3Q80",
      title: "Culto de Quebra de Correntes e Curas Divinas",
      category: "Mensagens",
      views: "12k views",
      duration: "58:30",
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600",
      featured: false
    }
  ];

  const featuredVideo = videosList.find(v => v.featured) || videosList[0];
  const regularVideos = videosList.filter(v => v.id !== featuredVideo.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl mb-2 tracking-wider text-brand-gold">VÍDEOS DA FÉ</h1>
        <p className="text-muted uppercase tracking-[0.2em] text-sm">Transmissões de unção, louvores inspiradores e cultos especiais gravados</p>
        <div className="w-24 h-1 bg-brand-red mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Featured Video Marquee */}
      {featuredVideo && (
        <div className="glass-card mb-12 overflow-hidden border-brand-gold/20 flex flex-col lg:flex-row relative group">
          <div className="lg:w-7/12 relative aspect-video bg-black overflow-hidden group">
            <img 
              src={featuredVideo.thumbnail} 
              alt={featuredVideo.title} 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
            />
            {/* Play overlay button */}
            <button 
              onClick={() => setSelectedVideo(featuredVideo)}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-red text-white flex items-center justify-center hover:scale-110 active:scale-95 shadow-lg transition-transform"
            >
              <Play size={28} fill="currentColor" className="ml-1" />
            </button>
            <span className="absolute bottom-4 left-4 bg-black/70 border border-white/10 px-3 py-1 rounded text-xs font-bold text-brand-gold uppercase tracking-wider">
              DESTAQUE
            </span>
          </div>

          <div className="lg:w-5/12 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3 text-brand-gold font-bold uppercase tracking-wider text-xs">
                <span className="bg-brand-gold/10 border border-brand-gold/20 px-2 py-0.5 rounded text-[10px]">
                  {featuredVideo.category}
                </span>
                <span className="flex items-center gap-1"><Clock size={12} /> {featuredVideo.duration}</span>
              </div>

              <h2 
                className="text-4xl text-white font-medium mb-4 leading-tight hover:text-brand-gold cursor-pointer transition-colors"
                onClick={() => setSelectedVideo(featuredVideo)}
              >
                {featuredVideo.title}
              </h2>
              
              <p className="text-muted text-sm leading-relaxed mb-6">
                Assista a esta mensagem maravilhosa sobre a restauração da esperança e o poder libertador da unção divina. Deixe este louvor entrar na sua casa agora mesmo.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-muted font-mono">
              <span className="flex items-center gap-1.5"><Eye size={14} /> {featuredVideo.views}</span>
              <button 
                onClick={() => setSelectedVideo(featuredVideo)}
                className="flex items-center gap-1 text-brand-red font-bold uppercase tracking-wider text-sm hover:gap-2 transition-all"
              >
                ASSISTIR AGORA <Play size={14} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Videos List Grid */}
      <h3 className="text-3xl text-white mb-6 uppercase tracking-wider border-l-4 border-brand-red pl-3">Mais Vídeos</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {regularVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card flex flex-col hover:border-brand-red/20 transition-all duration-300 group"
          >
            <div className="relative aspect-video bg-black overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" 
              />
              <button 
                onClick={() => setSelectedVideo(video)}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center scale-90 group-hover:scale-100 opacity-90 group-hover:opacity-100 shadow-xl transition-all"
              >
                <Play size={20} fill="currentColor" className="ml-1" />
              </button>
              <span className="absolute bottom-3 right-3 bg-black/80 border border-white/10 text-white font-mono px-2 py-0.5 rounded text-[10px]">
                {video.duration}
              </span>
            </div>

            <div className="p-5 flex flex-col justify-between flex-grow">
              <div>
                <span className="text-[10px] text-brand-gold uppercase tracking-wider font-bold mb-1.5 block">{video.category}</span>
                <h4 
                  className="text-xl text-white font-medium mb-3 line-clamp-2 leading-snug hover:text-brand-red cursor-pointer transition-colors"
                  onClick={() => setSelectedVideo(video)}
                >
                  {video.title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-xs text-muted/80 pt-3 border-t border-white/5 font-mono">
                <span className="flex items-center gap-1"><Eye size={12} /> {video.views}</span>
                <span className="text-brand-gold uppercase font-bold tracking-widest text-[10px]">Gospel</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-brand-red hover:scale-105 active:scale-95 transition-all"
              >
                <X size={20} />
              </button>

              {/* YouTube Responsive Video Iframe Wrapper */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Bio */}
              <div className="p-6">
                <span className="text-xs text-brand-gold font-bold uppercase tracking-widest">{selectedVideo.category}</span>
                <h3 className="text-2xl text-white font-medium mt-1 mb-2">{selectedVideo.title}</h3>
                <p className="text-muted text-sm">
                  Transmitido ao vivo pela Rádio Tempo de Milagres. Um momento extraordinário de profunda comunhão espiritual e libertação pelo louvor.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
