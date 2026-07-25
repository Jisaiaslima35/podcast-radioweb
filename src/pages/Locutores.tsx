import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Award, MessageCircle, Heart, Radio } from 'lucide-react';

interface Host {
  name: string;
  role: string;
  bio: string;
  email: string;
  whatsapp: string;
  image: string;
  show: string;
}

export default function Locutores() {
  const hosts: Host[] = [
    {
      name: "Isaías Lima",
      role: "Administrador da Rádio & Diretor Geral",
      bio: "Responsável pela direção espiritual e técnica da Rádio Tempo de Milagres. Dedicado a espalhar a palavra de fé e esperança por meio das ondas digitais e a curar corações aflitos.",
      email: "isaiassilva356@gmail.com",
      whatsapp: "5584921629273",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&fit=crop",
      show: "Manhã de Milagres • Segundas a Sextas"
    },
    {
      name: "Locutor IA Hermes",
      role: "Locutor Inteligência Artificial",
      bio: "O assistente de voz definitivo para comandar a programação da madrugada e a curadoria musical de oração. Sintonizado 24 horas por dia para levar paz e reflexões virtuais para a sua alma.",
      email: "isaiassilva356@gmail.com",
      whatsapp: "5584921629273",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&fit=crop",
      show: "Madrugada com Fé • Diário"
    },
    {
      name: "Pastor Marcos Santos",
      role: "Apresentador & Conselheiro de Fé",
      bio: "Trazendo mensagens profundadas e reflexivas para abençoar o seu almoço. Especialista em ministrar paz e conduzir correntes de milagres ao vivo no rádio.",
      email: "contato@tempodemilagres.com.br",
      whatsapp: "5584921629273",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&fit=crop",
      show: "Hora do Clamor • Meio-Dia"
    },
    {
      name: "Missionária Sarah Louvores",
      role: "Apresentadora • Círculo de Oração",
      bio: "Conduzindo as tardes de louvor e oração na rádio. Alegre, cheia de unção e disposta a interceder por todas as famílias e pedidos de socorro de nossos ouvintes.",
      email: "sarah@tempodemilagres.com.br",
      whatsapp: "5584921629273",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&fit=crop",
      show: "O Louvor Que Liberta • Tardes de Glória"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl mb-2 tracking-wider text-brand-gold">NOSSOS LOCUTORES</h1>
        <p className="text-muted uppercase tracking-[0.2em] text-sm">Vozes abençoadas dedicadas a ministrar a paz e o louvor que liberta</p>
        <div className="w-24 h-1 bg-brand-red mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Grid of Hosts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hosts.map((host, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card flex flex-col sm:flex-row p-6 gap-6 hover:border-brand-red/30 transition-all duration-300 relative group"
          >
            {/* Corner Graphic Accent */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Host Image */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-white/10 mx-auto sm:mx-0">
              <img src={host.image} alt={host.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Host Info */}
            <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">{host.role}</span>
                <h3 className="text-3xl text-white font-medium mb-1">{host.name}</h3>
                <span className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/25 text-brand-red text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider mb-3">
                  <Radio size={12} className="pulsate" /> {host.show}
                </span>
                <p className="text-muted text-sm leading-relaxed mb-4">{host.bio}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-3 border-t border-white/5">
                <a
                  href={`https://wa.me/${host.whatsapp}?text=Ol%C3%A1%20${encodeURIComponent(host.name)}!%20Estou%20ouvindo%20a%20R%C3%A1dio%20Tempo%20de%20Milagres%20e%20gostaria%20de%20deixar%20meu%20pedido%20de%20oração.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-black hover:border-green-500 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300"
                >
                  <MessageCircle size={14} className="fill-current" />
                  WhatsApp
                </a>
                
                <a
                  href={`mailto:${host.email}`}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 text-muted hover:bg-brand-red hover:text-white hover:border-brand-red px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300"
                >
                  <Mail size={14} />
                  E-mail
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
