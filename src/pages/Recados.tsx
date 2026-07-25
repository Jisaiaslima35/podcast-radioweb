import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Calendar, User, Heart, Send, CheckCircle, Smile } from 'lucide-react';

interface Scrap {
  id: string;
  name: string;
  message: string;
  date: string;
  avatarColor: string;
  heartCount: number;
}

export default function Recados() {
  const [scraps, setScraps] = useState<Scrap[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [avatarColor, setAvatarColor] = useState('from-brand-red to-rose-500');
  const [success, setSuccess] = useState(false);

  const colors = [
    { name: 'Vermelho Unção', value: 'from-brand-red to-rose-500' },
    { name: 'Ouro Consagrado', value: 'from-amber-500 to-yellow-600' },
    { name: 'Verde Vida', value: 'from-emerald-500 to-green-600' },
    { name: 'Azul Fé', value: 'from-blue-500 to-indigo-600' },
    { name: 'Roxo Glória', value: 'from-purple-500 to-pink-600' }
  ];

  // Load from localStorage or populate defaults
  useEffect(() => {
    const saved = localStorage.getItem('tempo_scraps');
    if (saved) {
      setScraps(JSON.parse(saved));
    } else {
      const defaultScraps: Scrap[] = [
        {
          id: '1',
          name: 'Irmã Maria Lurdes',
          message: 'Paz do Senhor a todos os amados ouvintes! Essa rádio é uma verdadeira bênção nas nossas vidas. Estou sintonizada todos os dias desde Natal/RN. Peço oração por toda a minha família e pela restauração do lar.',
          date: '06 Jun 2026',
          avatarColor: 'from-purple-500 to-pink-600',
          heartCount: 14
        },
        {
          id: '2',
          name: 'Ouvinte Roberto Silva',
          message: 'Glória a Deus! Quero deixar meu testemunho: fomos curados e abençoados através do clamor do meio-dia conduzido pelo Pastor Marcos Santos. Agradeço a Deus por esta emissora cheia da unção do Espírito Santo!',
          date: '05 Jun 2026',
          avatarColor: 'from-amber-500 to-yellow-600',
          heartCount: 22
        },
        {
          id: '3',
          name: 'Missionária Cláudia',
          message: 'O louvor realmente liberta! Sinto a presença preciosa do Consolador toda vez que sintonizo a Rádio Tempo de Milagres. Que o Senhor continue abençoando o querido Pastor Isaías Lima por este grandioso trabalho.',
          date: '04 Jun 2026',
          avatarColor: 'from-blue-500 to-indigo-600',
          heartCount: 9
        }
      ];
      setScraps(defaultScraps);
      localStorage.setItem('tempo_scraps', JSON.stringify(defaultScraps));
    }
  }, []);

  const handleHeart = (id: string) => {
    const updated = scraps.map(s => {
      if (s.id === id) {
        return { ...s, heartCount: s.heartCount + 1 };
      }
      return s;
    });
    setScraps(updated);
    localStorage.setItem('tempo_scraps', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const newScrap: Scrap = {
      id: Date.now().toString(),
      name,
      message,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      avatarColor,
      heartCount: 0
    };

    const updated = [newScrap, ...scraps];
    setScraps(updated);
    localStorage.setItem('tempo_scraps', JSON.stringify(updated));

    setName('');
    setMessage('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl mb-2 tracking-wider text-brand-gold">MURAL DE RECADOS</h1>
        <p className="text-muted uppercase tracking-[0.2em] text-sm">Deixe sua saudação, seu recado abençoado de carinho ou testemunho de milagres</p>
        <div className="w-24 h-1 bg-brand-red mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Scrap Input Form Box */}
        <div className="lg:col-span-1 glass-card p-6 border-brand-red/20 bg-brand-black/40 lg:sticky lg:top-24">
          <h2 className="text-2xl text-white uppercase tracking-wider mb-5 flex items-center gap-2">
            <Smile size={24} className="text-brand-gold" />
            Deixar Recado
          </h2>

          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 py-3 px-4 rounded-md text-xs flex items-center gap-2 font-medium"
            >
              <CheckCircle size={14} className="shrink-0" />
              Recado publicado com sucesso no mural!
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-muted text-[10px] uppercase tracking-widest font-bold mb-1.5">Seu Nome / Apelido</label>
              <input 
                type="text" 
                required
                maxLength={40}
                placeholder="Ex: Irmão Joaquim" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brand-black/60 border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:border-brand-red focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-muted text-[10px] uppercase tracking-widest font-bold mb-1.5">Sua Mensagem Divina</label>
              <textarea 
                required
                maxLength={300}
                rows={4}
                placeholder="Escreva algo de paz para abençoar os outros ouvintes..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-brand-black/60 border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:border-brand-red focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-muted text-[10px] uppercase tracking-widest font-bold mb-2">Estilo do Avatar</label>
              <div className="flex gap-2.5">
                {colors.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarColor(c.value)}
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${c.value} border-2 transition-transform ${
                      avatarColor === c.value ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-red text-white py-3 px-4 font-display text-lg rounded-lg tracking-wider flex items-center justify-center gap-2 hover:bg-brand-red/80 active:scale-95 transition-all shadow-[0_4px_15px_rgba(230,57,70,0.15)]"
            >
              PUBLICAR RECADO <Send size={14} />
            </button>
          </form>
        </div>

        {/* Scraps Board Feed (Right 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-3xl text-white uppercase tracking-wider border-l-4 border-brand-gold pl-3">Recados Dos Ouvintes</h3>
          
          {scraps.length === 0 ? (
            <div className="glass-card p-12 text-center text-muted">Nenhum recado no mural ainda. Seja o primeiro a escrever!</div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {scraps.map((s) => (
                  <motion.div
                    key={s.id}
                    layoutId={s.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-5 hover:border-white/10 transition-colors flex items-start gap-4 relative group"
                  >
                    {/* Circle Avatar badge */}
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-r ${s.avatarColor} shrink-0 text-white font-display text-xl flex items-center justify-center shadow-lg border border-white/10 uppercase`}>
                      {s.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                        <h4 className="text-lg text-white font-medium truncate">{s.name}</h4>
                        <span className="flex items-center gap-1 text-[10px] text-muted font-mono uppercase">
                          <Calendar size={10} />
                          {s.date}
                        </span>
                      </div>

                      <p className="text-muted text-sm leading-relaxed whitespace-pre-wrap">{s.message}</p>
                      
                      {/* Heart Like widget */}
                      <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-white/5">
                        <button
                          onClick={() => handleHeart(s.id)}
                          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted hover:text-brand-red transition-all cursor-pointer group/like"
                        >
                          <Heart 
                            size={14} 
                            className={`group-hover/like:scale-125 transition-transform duration-300 ${s.heartCount > 0 ? 'text-brand-red fill-brand-red' : ''}`} 
                          />
                          <span>Abençoar Recado ({s.heartCount})</span>
                        </button>
                        <span className="text-[10px] text-brand-gold italic">Tempo de Milagres</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
