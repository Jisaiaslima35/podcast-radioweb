import React from 'react';
import { motion } from 'motion/react';
import { Clock, Radio, User, Flame, Moon, Compass, Heart } from 'lucide-react';

interface Program {
  time: string;
  title: string;
  host: string;
  description: string;
  activeDays: string;
  icon: React.ReactNode;
  category: 'Oração' | 'Pregação' | 'Louvor' | 'Livre';
}

export default function Programacao() {
  const schedule: Program[] = [
    {
      time: "06:00 - 08:00",
      title: "Despertar da Fé",
      host: "Programação Automática",
      description: "Comece o seu dia com os louvores mais amados e palavras inspiradoras para abençoar a sua manhã.",
      activeDays: "Todos os dias",
      icon: <Compass className="text-amber-400" size={24} />,
      category: "Louvor"
    },
    {
      time: "08:00 - 12:00",
      title: "Manhã de Milagres",
      host: "Isaías Lima",
      description: "O maior portal de fé matinal! Clamor de oração ao vivo, participação do ouvinte e ministrações de milagres de cura.",
      activeDays: "Segunda a Sexta",
      icon: <Flame className="text-rose-500" size={24} />,
      category: "Oração"
    },
    {
      time: "12:00 - 14:00",
      title: "Hora do Clamor",
      host: "Pastor Marcos Santos",
      description: "Consagrações ao meio-dia, leitura da palavra e pregações profundas sobre cura interior e prosperidade familiar.",
      activeDays: "Segunda a Sexta",
      icon: <Flame className="text-brand-gold" size={24} />,
      category: "Pregação"
    },
    {
      time: "14:00 - 18:00",
      title: "O Louvor Que Liberta",
      host: "Missionária Sarah Louvores",
      description: "Uma tarde inteira sintonizada no poder transformador da adoração cristã internacional e clássicos do gospel nacional.",
      activeDays: "Segunda a Sexta",
      icon: <Heart className="text-pink-500" size={24} />,
      category: "Louvor"
    },
    {
      time: "18:00 - 22:00",
      title: "Encontro de Luz e Salvação",
      host: "Programação de Fé",
      description: "Reuniões espirituais transmitidas diretamente do estúdio virtual. Estreitando comunhão e unindo os fiéis.",
      activeDays: "Todos os dias",
      icon: <Radio className="text-brand-red" size={24} />,
      category: "Oração"
    },
    {
      time: "22:00 - 06:00",
      title: "Madrugada com Fé",
      host: "Locutor IA Hermes",
      description: "Reflexões espirituais com voz robótica humanizada, orações pacíficas de cura e trilha sonora calma de libertação.",
      activeDays: "Todos os dias",
      icon: <Moon className="text-indigo-400" size={24} />,
      category: "Livre"
    }
  ];

  const getCategoryStyle = (cat: string) => {
    switch(cat) {
      case 'Oração': return 'bg-red-500/10 border-red-500/30 text-rose-400';
      case 'Pregação': return 'bg-yellow-500/10 border-yellow-500/30 text-amber-400';
      case 'Louvor': return 'bg-emerald-500/10 border-emerald-500/30 text-teal-400';
      default: return 'bg-blue-500/10 border-blue-500/30 text-indigo-400';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl mb-2 tracking-wider text-brand-gold">NOSSA PROGRAMAÇÃO</h1>
        <p className="text-muted uppercase tracking-[0.2em] text-sm">Organização espiritual diária de rádio feita sob medida para a sua comunhão</p>
        <div className="w-24 h-1 bg-brand-red mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Program Grid List */}
      <div className="space-y-6">
        {schedule.map((p, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="glass-card hover:border-white/10 transition-all p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group"
          >
            {/* Hover bar indicator */}
            <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-start md:items-center gap-5 w-full md:w-auto">
              {/* Hour Circle / Icon */}
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {p.icon}
              </div>
              
              <div className="min-w-0">
                {/* Time Indicator */}
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <span className="flex items-center gap-1.5 text-brand-gold font-mono text-sm uppercase">
                    <Clock size={14} />
                    {p.time}
                  </span>
                  <span className="text-xs text-muted/60">•</span>
                  <span className="text-xs text-muted font-bold tracking-wider uppercase">{p.activeDays}</span>
                </div>

                <h3 className="text-3xl text-white font-medium mb-1 truncate leading-tight group-hover:text-brand-gold transition-colors">{p.title}</h3>
                <div className="flex items-center gap-2 text-muted text-xs">
                  <User size={12} className="text-brand-red" />
                  <span>Apresentação: <strong className="text-white/80">{p.host}</strong></span>
                </div>
              </div>
            </div>

            {/* Description and category tags */}
            <div className="w-full md:w-5/12 flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center md:items-stretch lg:items-center justify-between gap-4 mt-2 md:mt-0">
              <p className="text-sm text-muted line-clamp-2 pr-4">{p.description}</p>
              <span className={`px-3 py-1 border rounded-md text-xs uppercase tracking-wider font-semibold text-center h-fit self-start sm:self-auto md:self-start lg:self-auto ${getCategoryStyle(p.category)}`}>
                {p.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
