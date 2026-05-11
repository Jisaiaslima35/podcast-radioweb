import { motion } from 'motion/react';
import { Mail, Instagram, Facebook, Youtube, MapPin, Send, Target, Heart, Award } from 'lucide-react';
import { AppConfig } from '../types';

interface AboutProps {
  config: AppConfig;
}

export default function About({ config }: AboutProps) {
  const team = [
    { nome: 'Alexia Vox', role: 'Apresentadora IA', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400' },
    { nome: 'Gabriel Silva', role: 'Diretor de Conteúdo', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400' },
    { nome: 'Amanda Rocha', role: 'Marketing & Digital', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400' },
    { nome: 'Ricardo Souza', role: 'Engenheiro de Som', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400' },
  ];

  const socialIcons = {
    instagram: <Instagram />,
    facebook: <Facebook />,
    youtube: <Youtube />,
    whatsapp: <Mail />, // Using Mail for simplicity or I could use a custom svg
  };

  return (
    <div className="pb-20">
      {/* Intro */}
      <section className="py-32 px-4 bg-gradient-to-b from-brand-red/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-9xl mb-8"
          >
            QUEM SOMOS
          </motion.h1>
          <p className="text-muted text-lg md:text-xl leading-relaxed font-light">
            O <span className="text-brand-red font-bold">{config.nome}</span> é uma plataforma independente dedicada a explorar as fronteiras do conteúdo multi-nicho. Nascemos da necessidade de um espaço onde a qualidade técnica e a curadoria humana (e artificial) se encontram para oferecer uma experiência de áudio e visual única.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-32">
        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-12 space-y-6 border-l-8 border-brand-red">
            <Target className="text-brand-red" size={48} />
            <h2 className="text-4xl uppercase">Nossa Missão</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Empoderar nichos de mercado com tecnologia de ponta e narrativa envolvente, criando comunidades sólidas em torno de temas transformadores.
            </p>
          </div>
          <div className="glass-card p-12 space-y-6 border-l-8 border-brand-gold">
            <Award className="text-brand-gold" size={48} />
            <h2 className="text-4xl uppercase">Nossa Visão</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Ser o principal destino global para criadores e ouvintes que buscam profundidade, clareza e inovação em plataformas de streaming.
            </p>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-5xl uppercase mb-16 text-center">Nossa Equipe</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div 
                key={member.nome}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6 mx-auto w-full aspect-square overflow-hidden rounded-full border-2 border-white/10 group-hover:border-brand-red transition-colors">
                  <img src={member.img} alt={member.nome} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-2xl mb-1">{member.nome}</h3>
                <p className="text-brand-gold font-display text-sm tracking-widest uppercase">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl uppercase mb-6">Fale Conosco</h2>
              <p className="text-white/60 text-lg">Dúvidas, parcerias ou sugestões? Nossa equipe está pronta para te ouvir.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-brand-red/10 rounded-xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
                  <Mail size={32} />
                </div>
                <div>
                  <h4 className="font-display text-xl">E-MAIL</h4>
                  <p className="text-white/40">contato@nichohub.com.br</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="font-display text-xl">LOCALIZAÇÃO</h4>
                  <p className="text-white/40">Estúdio Virtual • Digital City, Nuvem</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {Object.entries(config.redesSociais).map(([name, url]) => (
                <a 
                  key={name}
                  href={url}
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-red transition-all"
                >
                  {name === 'instagram' && <Instagram size={20} />}
                  {name === 'facebook' && <Facebook size={20} />}
                  {name === 'youtube' && <Youtube size={20} />}
                  {name === 'whatsapp' && <Send size={18} className="transform rotate-[-30deg]" />}
                </a>
              ))}
            </div>
          </div>

          <form className="glass-card p-8 md:p-12 space-y-6">
             <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Seu Nome</label>
               <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-md focus:border-brand-red outline-none transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">E-mail</label>
               <input type="email" className="w-full bg-white/5 border border-white/10 p-4 rounded-md focus:border-brand-red outline-none transition-colors" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Mensagem</label>
               <textarea className="w-full bg-white/5 border border-white/10 p-4 rounded-md h-32 focus:border-brand-red outline-none transition-colors resize-none"></textarea>
             </div>
             <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 py-4">
               ENVIAR MENSAGEM <Send size={20} />
             </button>
          </form>
        </section>
      </div>
    </div>
  );
}
