import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Radio, Download, ExternalLink } from 'lucide-react';
import { AppConfig, Post, PodcastEpisode, PresenterStatus } from '../types';
import HermesChat from '../components/HermesChat';

interface HomeProps {
  config: AppConfig;
  onPlayPodcast: (ep: PodcastEpisode) => void;
}

export default function Home({ config, onPlayPodcast }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<PresenterStatus | null>(null);

  // Load posts & status
  useEffect(() => {
    fetch('/data/posts.json')
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 2))); // Exactly 2 posts as requested

    const fetchStatus = () => {
      fetch(config.statusApiUrl)
        .then(res => res.json())
        .then(data => setStatus(data));
    };
    
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [config.statusApiUrl]);

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Visual Section Container */}
      <section className="max-w-7xl mx-auto px-4 mt-4">
        {/* Top Banner (Header Mockup like https://radiochatblack.com/) */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-zinc-950">
          <img 
            src="/src/assets/images/gospel_radio_banner_1780750153650.png" 
            alt="Rádio Tempo de Milagres Banner" 
            className="w-full h-auto object-cover min-h-[160px] md:min-h-[280px]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
            <h1 className="text-4xl md:text-7xl text-white tracking-wider leading-none shadow-text uppercase font-display select-none">
              RÁDIO TEMPO DE MILAGRES
            </h1>
            <p className="text-brand-gold text-lg md:text-2xl font-light tracking-[0.2em] uppercase select-none mt-1">
              O louvor que liberta
            </p>
          </div>
        </div>

        {/* Second Rotating/Ad Banner - Momento de Oração */}
        <div className="mt-6 bg-gradient-to-r from-red-950 via-brand-black to-red-950 border border-brand-red/20 rounded-xl p-5 md:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
          {/* Subtle decoration wave */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full filter blur-xl transform translate-x-10 -translate-y-10 group-hover:bg-brand-red/10 transition-colors"></div>
          
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-full bg-brand-red/10 border-2 border-brand-red/30 flex items-center justify-center text-brand-red shrink-0 pulsate">
              <CompassIcon size={28} />
            </div>
            <div>
              <span className="text-[10px] text-brand-gold uppercase tracking-[0.15em] font-bold">PROGRAMAÇÃO DIÁRIA</span>
              <h2 className="text-2xl md:text-3xl text-white font-medium uppercase leading-tight tracking-wide mt-0.5">Momentos de Fé e Milagres</h2>
              <p className="text-muted text-xs md:text-sm mt-1 leading-relaxed max-w-xl">Pregações edificantes, correntes de cura e o melhor do louvor nacional e internacional que liberta.</p>
            </div>
          </div>
          
          <Link 
            to="/programacao" 
            className="btn-primary py-3.5 px-6 shrink-0 w-full md:w-auto text-lg text-center flex items-center justify-center gap-2 tracking-widest hover:scale-105 duration-200"
          >
            VER PROGRAMAÇÃO <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Main Grid Content (3 COLUMNS) */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ================= COL 1: LEFT SIDEBAR (Width 1/4) ================= */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* REDES SOCIAIS Widget */}
          <section className="glass-card p-5 border-white/5 bg-zinc-900/60">
            <h4 className="text-xl text-brand-gold uppercase tracking-wider mb-4 border-b border-white/5 pb-2">REDES SOCIAIS</h4>
            <div className="grid grid-cols-4 gap-2.5">
              <a href="https://youtube.com" target="_blank" rel="noopener" className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-lg flex items-center justify-center text-white transition-transform duration-200 hover:-translate-y-1">
                <YoutubeIcon size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center text-white transition-transform duration-200 hover:-translate-y-1">
                <FacebookIcon size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener" className="w-10 h-10 bg-gradient-to-tr from-yellow-500 via-pink-500 to-indigo-500 hover:opacity-90 rounded-lg flex items-center justify-center text-white transition-transform duration-200 hover:-translate-y-1">
                <InstagramIcon size={18} />
              </a>
              <a href="https://wa.me/5584921629273" target="_blank" rel="noopener" className="w-10 h-10 bg-green-500 hover:bg-green-400 rounded-lg flex items-center justify-center text-white transition-transform duration-200 hover:-translate-y-1">
                <WhatsappIcon size={18} />
              </a>
            </div>
          </section>

          {/* NO AR (LED Dot Matrix Display Panel Style) */}
          <section className="glass-card p-5 border-brand-red/10 bg-zinc-950 relative overflow-hidden">
            <h4 className="text-xs text-brand-red font-bold uppercase tracking-widest leading-none mb-3">NO AR AGORA</h4>
            <div className="bg-red-950/40 border border-brand-red/30 rounded px-4 py-3 font-mono text-center shadow-inner relative">
              {/* Dot Matrix simulation display */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_45%,_black_55%)] bg-[size:3px_3px] pointer-events-none opacity-30"></div>
              <span className="text-xl text-brand-red font-bold tracking-widest uppercase pulsate block">
                ● AO VIVO
              </span>
            </div>
          </section>

          {/* AGORA (Circular CD Graphics or Current program status) */}
          <section className="glass-card p-5 border-white/5 bg-zinc-900/60 text-center">
            <h4 className="text-xs text-brand-gold font-bold uppercase tracking-widest mb-4">EM EXIBIÇÃO</h4>
            
            <div className="relative w-28 h-28 mx-auto mb-4 vinyl-spin">
              <div className="w-full h-full rounded-full bg-zinc-950 border-4 border-zinc-800 flex items-center justify-center p-1.5 shadow-xl">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-brand-red/20 via-zinc-900 to-brand-gold/20 flex items-center justify-center relative">
                  <Radio size={24} className="text-brand-gold" />
                  <div className="absolute w-5 h-5 bg-black rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-brand-red rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {status ? (
              <div className="space-y-1">
                <p className="text-lg text-white font-medium font-sans leading-tight">{status.apresentador}</p>
                <p className="text-[10px] text-brand-gold uppercase tracking-widest font-bold font-mono">No Comando do Clamor</p>
                <p className="text-muted text-xs italic mt-2">"{status.mensagem}"</p>
              </div>
            ) : (
              <div className="text-muted text-xs animate-pulse">Sintonizando programa...</div>
            )}
          </section>

          {/* ÚLTIMAS (Exactly 2 compact post placeholders as requested) */}
          <section className="glass-card p-5 border-white/5 bg-zinc-900/60">
            <h4 className="text-xl text-brand-gold uppercase tracking-wider mb-4 border-b border-white/5 pb-2">NOTÍCIAS DA FÉ</h4>
            <div className="space-y-4">
              {posts.map(post => (
                <Link key={post.id} to={`/post/${post.id}`} className="group block space-y-1.5">
                  <div className="h-16 rounded overflow-hidden relative">
                    <img src={post.imagem} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-105 duration-300" />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>
                  <h5 className="text-sm text-white font-medium group-hover:text-brand-red transition-colors line-clamp-1 leading-tight">{post.titulo}</h5>
                  <p className="text-[10px] text-muted font-mono uppercase">{post.data}</p>
                </Link>
              ))}
            </div>
          </section>

        </aside>

        {/* ================= COL 2: MIDDLE COLUMN (Width 2/4) ================= */}
        {/* CHAT HERMES INTEGRATION */}
        <HermesChat />

        {/* ================= COL 3: RIGHT SIDEBAR (Width 1/4) ================= */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* PEÇA SUA MÚSICA Widget */}
          <a 
            href="https://wa.me/5584921629273?text=Ol%C3%A1!%20Estou%2520sintonizado%2520na%2520R%C3%A1dio%2520Tempo%2520de%2520Milagres%20e%20gostaria%20de%20pedir%20uma%20música%20especial."
            target="_blank"
            rel="noopener"
            className="glass-card p-5 border-emerald-500/10 bg-emerald-950/20 hover:border-emerald-500/20 transition-all flex items-center gap-4 group block animate-pulse"
          >
            <div className="w-12 h-12 bg-green-500/15 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 duration-200">
              <WhatsappIcon size={24} />
            </div>
            <div>
              <h4 className="text-lg text-white uppercase tracking-wider font-semibold group-hover:text-brand-gold duration-200">Peça seu Louvor</h4>
              <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-0.5">Clique e Envie o Pedido!</p>
              <p className="text-white/60 text-xs mt-1 leading-none">(84) 92162-9273</p>
            </div>
          </a>

          {/* OUVIR COM (RadiosNet player option) */}
          <section className="glass-card p-5 border-white/5 bg-zinc-900/60 text-center space-y-4">
            <h4 className="text-xl text-brand-gold uppercase tracking-wider border-b border-white/5 pb-2">OUÇA NO APP</h4>
            
            <a 
              href="https://www.radios.com.br" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-zinc-950 border border-white/10 p-3 rounded-xl flex items-center justify-center gap-3 hover:border-brand-red transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold font-display select-none">R</div>
              <div className="text-left">
                <p className="text-white text-sm font-semibold group-hover:text-blue-400 transition-colors">RadiosNet</p>
                <p className="text-[9px] text-muted uppercase">Buscar: Tempo de Milagres</p>
              </div>
            </a>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="https://play.google.com" target="_blank" className="bg-zinc-950 hover:bg-zinc-900 duration-200 border border-white/5 p-2 rounded-lg flex flex-col items-center gap-1 text-muted hover:text-white">
                <Download size={14} className="text-green-400" />
                <span>Android Play</span>
              </a>
              <a href="https://apple.com" target="_blank" className="bg-zinc-950 hover:bg-zinc-900 duration-200 border border-white/5 p-2 rounded-lg flex flex-col items-center gap-1 text-muted hover:text-white">
                <Download size={14} className="text-blue-400" />
                <span>Apple Store</span>
              </a>
            </div>
          </section>

          {/* LINKS ÚTEIS Section */}
          <section className="glass-card p-5 border-white/5 bg-zinc-900/60">
            <h4 className="text-xl text-brand-gold uppercase tracking-wider mb-4 border-b border-white/5 pb-2">LINKS ÚTEIS</h4>
            <ul className="space-y-3.5 text-sm text-muted">
              <li>
                <a href="https://facebook.com" target="_blank" className="flex items-center justify-between hover:text-white transition-colors">
                  <span>Curta no Facebook</span>
                  <ExternalLink size={12} className="text-brand-red" />
                </a>
              </li>
              <li>
                <a href="https://www.radios.com.br" target="_blank" className="flex items-center justify-between hover:text-white transition-colors">
                  <span>RadiosNet Cadastro</span>
                  <ExternalLink size={12} className="text-brand-red" />
                </a>
              </li>
              <li>
                <Link to="/programacao" className="flex items-center justify-between hover:text-white transition-colors">
                  <span>Grade Completa de Programas</span>
                  <ExternalLink size={12} className="text-brand-red" />
                </Link>
              </li>
            </ul>
          </section>

          {/* ANUNCIE! (Coloque sua empresa visual banner mockup) */}
          <a 
            href="https://wa.me/5584921629273?text=Ol%C3%A1!%20Gostaria%2520de%2520anunciar%2520minha%2520empresa%2520na%2520R%C3%A1dio%2520Tempo%2520de%2520Milagres."
            target="_blank"
            className="glass-card border-brand-red/30 bg-zinc-950 hover:border-brand-red/60 transition-all text-center p-6 block group"
          >
            <span className="text-[10px] text-brand-red font-bold tracking-widest uppercase block mb-1">ANUNCIE CONOSCO</span>
            <h5 className="text-3xl font-display text-white group-hover:text-brand-gold duration-200">COLOQUE SUA EMPRESA</h5>
            <p className="text-muted text-xs mt-1.5 leading-relaxed">Fale no rádio e multiplique as vendas da sua empresa ou comércio.</p>
            <div className="mt-4 bg-brand-red text-white py-2 rounded font-display text-base tracking-widest group-hover:bg-brand-red/80 transition-all">
              WHATSAPP COMERCIAL
            </div>
          </a>

        </aside>

      </div>
    </div>
  );
}

// Inner social icons SVG wrappers
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={{ width: props.size, height: props.size }}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={{ width: props.size, height: props.size }}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={{ width: props.size, height: props.size }}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={{ width: props.size, height: props.size }}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={{ width: props.size, height: props.size }}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
