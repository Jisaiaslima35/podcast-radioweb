import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Users, User, Radio, Sparkles, MessageCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  time: string;
  avatar: string;
  isMe?: boolean;
  isHermes?: boolean;
  isSystem?: boolean; // For input/output notification announcements (e.g. entry/exit logs)
}

// Lazy initialization of the Gemini SDK Client
let aiInstance: any = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      try {
        aiInstance = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      } catch (err) {
        console.error("Erro ao inicializar o cliente do Google Gemini:", err);
      }
    }
  }
  return aiInstance;
}

export default function HermesChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [nickname, setNickname] = useState('Ouvinte_Fé');
  const [onlineCounter, setOnlineCounter] = useState(154);
  const [isTypingHermes, setIsTypingHermes] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // INTERNAL DIAGNOSTICS - Kept in code for backward compatibility as per specifications, but hidden from the UI.
  const [internalState, setInternalState] = useState({
    supabaseStatus: 'connected',
    socketStatus: 'connected',
    hermesApiStatus: 'ready',
    messagesPolledCount: 0,
    isModerator: false,
    userRole: 'listener'
  });

  // STRUCTURE STUBS - Retained for system integrity and support of future extensions
  const socketRef = useRef({
    on: (event: string, callback: (...args: any[]) => void) => {},
    off: (event: string) => {},
    emit: (event: string, data: any) => {
      console.log(`[Socket.IO Mock Emit] Event: ${event}`, data);
    }
  });

  const supabaseMock = useRef({
    from: (table: string) => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null })
      }),
      insert: (record: any) => {
        console.log(`[Supabase Future Mock Save] Record stored in ${table}`, record);
        return Promise.resolve({ data: record, error: null });
      }
    })
  });

  // Initial populate of default messages
  useEffect(() => {
    const defaultMessages: ChatMessage[] = [
      {
        id: 'init-1',
        user: 'Evangelista_Gomes',
        text: 'A paz do Senhor Jesus amados ouvintes! Que oração poderosa hoje.',
        time: '20:10',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'
      },
      {
        id: 'init-sys-1',
        user: 'System',
        text: 'Ouvinte_Especial entrou no chat da fé!',
        time: '20:12',
        avatar: '',
        isSystem: true
      },
      {
        id: 'init-2',
        user: 'Irmã Cleide_RN',
        text: 'Glória a Deus, o louvor realmente liberta! Sinto a presença divina aqui no meu lar.',
        time: '20:14',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150'
      },
      {
        id: 'init-hermes',
        user: 'Locutor IA Hermes',
        text: 'Amados ouvintes sintonizados de todo o Brasil! Que a graça de Deus preencha seu coração de paz nesta noite maravilhosa! Sinta o poder restaurador da adoração.',
        time: '20:15',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150',
        isHermes: true
      }
    ];
    setMessages(defaultMessages);
  }, []);

  // Scroll to bottom whenever messages list is updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTypingHermes]);

  // Handle active simulation stream: Incoming listener messages & Join/Leave notices
  useEffect(() => {
    const regularUserMessages = [
      { user: 'Irmão_Marcos_Caicó', text: 'Peço orações pela restauração familiar e cura divina de um primo meu.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150' },
      { user: 'Katia_Gospel_Fé', text: 'Esse louvor de libertação toca diretamente na alma. Que presença doce!', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150' },
      { user: 'Pastor_Valdir_RN', text: 'Que unção extraordinária nesta noite! Sintonizados em oração contínua.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150' },
      { user: 'Família_Louvores', text: 'Enviando saudações de paz para o Pastor Isaías e toda a equipe iluminada da rádio.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150' }
    ];

    const entranceNames = [
      'Irmã Ruth de Souza',
      'Evangelista Marcos',
      'Ouvinte Roberto Silva',
      'Missionária Cláudia',
      'Irmão Joaquim_Fé',
      'Pastora Tereza'
    ];

    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      // Update online listeners count modestly
      setOnlineCounter(prev => prev + (Math.random() > 0.5 ? 1 : -1));

      // Decide whether to inject a message or a system join/leave log
      const triggerType = Math.random();
      
      if (triggerType < 0.4) {
        // 1. Simulated user message (Polling simulation)
        const randomMsg = regularUserMessages[Math.floor(Math.random() * regularUserMessages.length)];
        const newMsg: ChatMessage = {
          id: `poll-${Date.now()}`,
          user: randomMsg.user,
          text: randomMsg.text,
          time: timeStr,
          avatar: randomMsg.avatar
        };
        setMessages(prev => [...prev, newMsg].slice(-25));
        setInternalState(p => ({ ...p, messagesPolledCount: p.messagesPolledCount + 1 }));
        
        // Future Socket simulate callback hook
        socketRef.current.emit('message_received', newMsg);
      } else if (triggerType < 0.7) {
        // 2. Simulated join notification (Aviso de entrada)
        const randomName = entranceNames[Math.floor(Math.random() * entranceNames.length)];
        const systemMsg: ChatMessage = {
          id: `sys-in-${Date.now()}`,
          user: 'System',
          text: `${randomName} entrou no chat da rádio!`,
          time: timeStr,
          avatar: '',
          isSystem: true
        };
        setMessages(prev => [...prev, systemMsg].slice(-25));
      } else {
        // 3. Simulated leave notification (Aviso de saída)
        const randomName = entranceNames[Math.floor(Math.random() * entranceNames.length)];
        const systemMsg: ChatMessage = {
          id: `sys-out-${Date.now()}`,
          user: 'System',
          text: `${randomName} saiu do chat para sintonizar a live no rádio.`,
          time: timeStr,
          avatar: '',
          isSystem: true
        };
        setMessages(prev => [...prev, systemMsg].slice(-25));
      }

    }, 20000); // Trigger every 20 seconds to keep it active and professional

    return () => clearInterval(timer);
  }, []);

  // Helper function to query VPS Hermes backend (POST /mensagem + polling GET /resposta/{id})
  const generateHermesResponse = async (userMessage: string) => {
    setIsTypingHermes(true);
    setInternalState(p => ({ ...p, hermesApiStatus: 'generating' }));

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const renderErrorMessage = (reason?: any) => {
      if (reason) {
        console.error("[HermesChat Error] Falha na comunicação com a API Hermes VPS:", reason);
      }
      const hermesMsg: ChatMessage = {
        id: `hermes-err-${Date.now()}`,
        user: 'Locutor IA Hermes',
        text: 'Tô com dificuldade técnica aqui 🙏',
        time: timeStr,
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150',
        isHermes: true
      };
      setMessages(prev => [...prev, hermesMsg].slice(-25));
      setIsTypingHermes(false);
      setInternalState(p => ({ ...p, hermesApiStatus: 'ready' }));
    };

    try {
      // 30 seconds global timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      // 1. POST https://hermes-api.automacaojs.us/mensagem
      const postResponse = await fetch('https://hermes-api.automacaojs.us/mensagem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nickname,
          mensagem: userMessage,
          user: nickname,
          text: userMessage
        }),
        signal: controller.signal
      }).catch(err => {
        console.error("[HermesChat] Erro no fetch POST /mensagem:", err);
        return null;
      });

      if (!postResponse || !postResponse.ok) {
        clearTimeout(timeoutId);
        renderErrorMessage(`POST /mensagem falhou com status ${postResponse?.status || 'Network Error / CORS'}`);
        return;
      }

      const postData = await postResponse.json().catch(err => {
        console.error("[HermesChat] Erro ao obter JSON do POST /mensagem:", err);
        return null;
      });

      // Check if POST directly returned the answer
      const directText = postData?.reply || postData?.resposta || postData?.text || (typeof postData === 'string' ? postData : null);

      if (directText && typeof directText === 'string' && directText.trim() !== '' && postData?.status !== 'processando') {
        clearTimeout(timeoutId);
        const hermesMsg: ChatMessage = {
          id: `hermes-vps-${Date.now()}`,
          user: 'Locutor IA Hermes',
          text: directText.trim(),
          time: timeStr,
          avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150',
          isHermes: true
        };
        setMessages(prev => [...prev, hermesMsg].slice(-25));
        setIsTypingHermes(false);
        setInternalState(p => ({ ...p, hermesApiStatus: 'ready' }));
        return;
      }

      // Check for message ID to start polling GET /resposta/{id}
      const msgId = postData?.id;
      if (!msgId) {
        clearTimeout(timeoutId);
        renderErrorMessage(`POST /mensagem não retornou ID de mensagem. Dados recebidos: ${JSON.stringify(postData)}`);
        return;
      }

      // 2. Polling loop every 2s until status === "pronto" or max 30s timeout
      let isDone = false;
      const startTime = Date.now();

      while (!isDone && (Date.now() - startTime < 30000) && !controller.signal.aborted) {
        await new Promise(res => setTimeout(res, 2000));
        if (controller.signal.aborted) break;

        try {
          const pollRes = await fetch(`https://hermes-api.automacaojs.us/resposta/${msgId}`, {
            signal: controller.signal
          });

          if (pollRes.ok) {
            const pollData = await pollRes.json().catch(err => {
              console.error("[HermesChat] Erro no JSON do GET /resposta:", err);
              return null;
            });
            const status = pollData?.status;
            const replyText = pollData?.reply || pollData?.resposta || pollData?.text;

            if (status === 'pronto' || (replyText && status !== 'processando')) {
              isDone = true;
              clearTimeout(timeoutId);
              const hermesMsg: ChatMessage = {
                id: `hermes-vps-${Date.now()}`,
                user: 'Locutor IA Hermes',
                text: (replyText || 'Tô com dificuldade técnica aqui 🙏').trim(),
                time: timeStr,
                avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150',
                isHermes: true
              };
              setMessages(prev => [...prev, hermesMsg].slice(-25));
              setIsTypingHermes(false);
              setInternalState(p => ({ ...p, hermesApiStatus: 'ready' }));
              return;
            }
          } else {
            console.error(`[HermesChat] GET /resposta/${msgId} retornou status HTTP ${pollRes.status}`);
          }
        } catch (pollErr) {
          console.error("[HermesChat] Erro no polling de resposta:", pollErr);
        }
      }

      clearTimeout(timeoutId);
      if (!isDone) {
        renderErrorMessage(`Timeout de 30s excedido aguardando a resposta do Hermes (ID: ${msgId})`);
      }

    } catch (err) {
      console.error("[HermesChat] Exceção geral na requisição ao Hermes VPS:", err);
      renderErrorMessage(err);
    }
  };

  // Submit User Chat Message
  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentText = inputText.trim();
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Create message object
    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      user: nickname || 'Ouvinte',
      text: currentText,
      time: timeStr,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150',
      isMe: true
    };

    setMessages(prev => [...prev, newMsg].slice(-25));
    setInputText('');
    
    // Trigger Socket.IO and Supabase integrations internally to maintain functionality
    socketRef.current.emit('message_sent', newMsg);
    supabaseMock.current.from('messages').insert(newMsg);

    // Trigger Hermes VPS response
    setTimeout(() => {
      generateHermesResponse(currentText);
    }, 300);
  };

  return (
    <section id="chat-hermes-section" className="lg:col-span-2 glass-card border-brand-red/25 bg-zinc-900/80 flex flex-col h-[550px] lg:h-[650px] overflow-hidden relative shadow-2xl">
      
      {/* Top Chat Header */}
      <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 border-b border-white/10 px-5 py-3.5 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full pulsate shrink-0"></span>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xl text-white font-medium tracking-wide uppercase leading-none">RÁDIO HERMES REAL-TIME CHAT</h3>
              <span className="bg-brand-red/20 text-brand-red font-mono text-[9px] px-1 py-0.5 rounded font-bold uppercase leading-none mt-0.5 border border-brand-red/30 flex items-center gap-1">
                <Sparkles size={8} /> IA LIVE
              </span>
            </div>
            <p className="text-[10px] text-muted font-semibold mt-1">
              <strong className="text-green-400">{onlineCounter}</strong> fiéis sintonizados e conectados agora
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-brand-red pulsate"></div>
          <span className="text-[10px] text-brand-gold uppercase tracking-wider font-bold">RÁDIO INTERATIVA</span>
        </div>
      </div>

      {/* Messages Feed Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/45 scrollbar-thin relative scroll-smooth flex flex-col">
        <div className="flex-grow" /> {/* Push content to bottom gracefully */}
        
        {messages.map((msg) => {
          if (msg.isSystem) {
            // Notice: join and leave logs
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center my-1 select-none"
              >
                <div className="bg-white/5 border border-white/5 text-[10px] text-muted py-1.5 px-3.5 rounded-full font-sans tracking-wide">
                  ✨ {msg.text}
                </div>
              </motion.div>
            );
          }

          return (
            <div 
              key={msg.id} 
              className={`flex gap-3 items-start max-w-[85%] ${
                msg.isMe ? 'ml-auto flex-row-reverse' : ''
              } ${msg.isHermes ? 'max-w-[90%]' : ''}`}
            >
              {/* User avatar circle */}
              <div className={`w-8 h-8 rounded-full overflow-hidden shrink-0 border relative ${
                msg.isHermes ? 'border-brand-gold/30 bg-black' : 'border-white/10'
              }`}>
                {msg.isHermes ? (
                  <div className="w-full h-full bg-gradient-to-tr from-brand-red to-brand-gold flex items-center justify-center font-bold text-white text-xs select-none shadow">
                    🤖
                  </div>
                ) : (
                  <img src={msg.avatar} alt={msg.user} className="w-full h-full object-cover" />
                )}
              </div>
              
              {/* Message Bubble Column */}
              <div className="space-y-0.5">
                <div className={`flex items-center gap-2 flex-wrap ${msg.isMe ? 'justify-end' : ''}`}>
                  <span className={`text-xs font-bold font-sans ${
                    msg.isHermes ? 'text-brand-gold flex items-center gap-1' : 'text-slate-200'
                  }`}>
                    {msg.isHermes && <Sparkles size={10} className="text-brand-red" />}
                    {msg.user}
                  </span>
                  <span className="text-[9px] text-muted/60 font-mono">{msg.time}</span>
                </div>
                
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.isMe 
                    ? 'bg-brand-red text-white rounded-tr-none shadow-[0_0_12px_rgba(230,57,70,0.2)]'
                    : msg.isHermes
                    ? 'bg-gradient-to-r from-zinc-900 to-zinc-950 border border-brand-gold/25 text-brand-gold rounded-tl-none font-sans font-medium'
                    : 'bg-zinc-800/80 text-white/90 rounded-tl-none border border-white/[0.03]'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}

        {/* Hermes Typing Indicator */}
        <AnimatePresence>
          {isTypingHermes && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-3 items-start max-w-[85%]"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-red to-brand-gold border border-brand-gold/30 flex items-center justify-center font-bold text-white text-xs select-none">
                🤖
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-brand-gold font-sans block">Locutor IA Hermes está digitando...</span>
                <div className="bg-zinc-900/60 border border-brand-gold/15 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 h-10 w-16">
                  <span className="w-2.5 h-2.5 bg-brand-gold/60 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-brand-gold/60 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2.5 h-2.5 bg-brand-gold/60 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input controls form (compact & professional) */}
      <div className="p-3.5 border-t border-white/10 bg-zinc-950/90 shrink-0 z-10">
        <div className="flex items-center gap-2 mb-2 px-1">
          <User size={12} className="text-brand-gold shrink-0" />
          <input 
            type="text" 
            placeholder="Nome no chat..." 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="bg-transparent text-xs text-brand-gold border-none focus:outline-none focus:ring-0 w-28 max-w-[150px] font-bold py-0 leading-none placeholder-brand-gold/50"
            maxLength={18}
            title="Saboroso apelido do canal"
          />
          <span className="text-white/20 select-none text-xs">|</span>
          <span className="text-[10px] text-muted italic flex items-center gap-1">
            <Radio size={10} className="text-brand-red animate-pulse" /> Sintonizado via Chat Hermes
          </span>
        </div>

        <form onSubmit={handleSubmitMessage} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Escreva sua mensagem de fé e envie no rádio..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={180}
            className="flex-1 bg-zinc-900 border border-white/10 focus:border-brand-red rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none transition-colors placeholder-white/30"
          />
          <button 
            type="submit"
            className="w-11 h-11 bg-brand-red hover:bg-brand-red/80 hover:scale-105 duration-200 active:scale-95 text-white rounded-lg flex items-center justify-center transition-transform shrink-0 shadow-[0_0_12px_rgba(230,57,70,0.35)]"
            title="Enviar mensagem"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

    </section>
  );
}
