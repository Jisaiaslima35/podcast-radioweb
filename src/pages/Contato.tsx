import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !mensagem) return;
    
    // Simulate API or mail send
    setEnviado(true);
    setTimeout(() => {
      setNome('');
      setWhatsapp('');
      setMensagem('');
      setEnviado(false);
    }, 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl mb-2 tracking-wider text-brand-gold">FALE CONOSCO</h1>
        <p className="text-muted uppercase tracking-[0.2em] text-sm">Entre em contato, faça perguntas, dê sugestões ou peça a sua oração especial</p>
        <div className="w-24 h-1 bg-brand-red mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact info cards */}
        <div className="space-y-6">
          <h2 className="text-3xl text-white uppercase tracking-wider mb-2 border-l-4 border-brand-red pl-3">Nossos Contatos</h2>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Prezamos por cada vida que sintoniza a Rádio Tempo de Milagres. Se você necessita de aconselhamento espiritual, quer deixar um testemunho ou anunciar sua marca conosco, sinta-se à vontade para nos chamar.
          </p>

          <div className="glass-card p-5 flex items-center gap-4 hover:border-brand-red/20 transition-colors">
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center shrink-0">
              <Phone size={22} className="fill-current" />
            </div>
            <div>
              <p className="text-brand-gold text-[10px] uppercase font-bold tracking-widest leading-none mb-1">WhatsApp Oficial</p>
              <a 
                href="https://wa.me/5584921629273" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl text-white font-medium hover:text-green-400 transition-colors"
              >
                (84) 92162-9273
              </a>
              <p className="text-muted text-xs mt-0.5">Fale diretamente com Pr. Isaías Lima e equipe</p>
            </div>
          </div>

          <div className="glass-card p-5 flex items-center gap-4 hover:border-brand-red/20 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full flex items-center justify-center shrink-0">
              <Mail size={22} />
            </div>
            <div>
              <p className="text-brand-gold text-[10px] uppercase font-bold tracking-widest leading-none mb-1">E-mail de Contato</p>
              <a 
                href="mailto:isaiassilva356@gmail.com" 
                className="text-xl text-white font-medium hover:text-blue-400 transition-colors"
              >
                isaiassilva356@gmail.com
              </a>
              <p className="text-muted text-xs mt-0.5">Respondemos a todas as solicitações em até 24 horas</p>
            </div>
          </div>

          <div className="glass-card p-5 flex items-center gap-4 hover:border-brand-red/20 transition-colors">
            <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-full flex items-center justify-center shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <p className="text-brand-gold text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Localização do Estúdio</p>
              <p className="text-xl text-white font-medium">Rio Grande do Norte - RN, Brasil</p>
              <p className="text-muted text-xs mt-0.5">Transmitindo bênçãos e orações para todo o planeta via internet</p>
            </div>
          </div>
        </div>

        {/* Contact Form Box */}
        <div className="glass-card p-8 border-brand-red/20 bg-brand-black/40">
          <h2 className="text-3xl text-white uppercase tracking-wider mb-6 border-l-4 border-brand-gold pl-3">Deixe sua Mensagem</h2>

          {enviado ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center space-y-3"
            >
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-2xl text-white font-semibold">Mensagem Enviada!</h3>
              <p className="text-emerald-300 text-sm leading-relaxed">
                Graça e paz! Recebemos as suas palavras e estaremos intercedendo pela sua vida. Que Deus te abençoe ricamente!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-muted text-xs uppercase tracking-widest font-bold mb-2">Seu Nome *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Maria de Souza" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-brand-black/60 border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:border-brand-red focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-muted text-xs uppercase tracking-widest font-bold mb-2">WhatsApp / Telefone (Opcional)</label>
                <input 
                  type="tel" 
                  placeholder="Ex: (84) 92162-9273" 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-brand-black/60 border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:border-brand-red focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-muted text-xs uppercase tracking-widest font-bold mb-2">Sua Mensagem ou Pedido de Oração *</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Digite aqui o seu pedido de oração, bênção, testemunho ou sugestão..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className="w-full bg-brand-black/60 border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:border-brand-red focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-red text-white py-3.5 px-6 font-display text-lg rounded-lg tracking-widest flex items-center justify-center gap-2 hover:bg-brand-red/80 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(230,57,70,0.2)]"
              >
                ENVIAR MENSAGEM <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
