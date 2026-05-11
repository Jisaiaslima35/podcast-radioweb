import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, User, Calendar, MessageSquare, Send } from 'lucide-react';
import { Post, Comment } from '../types';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ nome: '', email: '', texto: '' });

  useEffect(() => {
    fetch('/data/posts.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Post) => p.id === Number(id));
        setPost(found);
      });

    const savedComments = localStorage.getItem(`comments_${id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [id]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.nome || !newComment.texto) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId: Number(id),
      nome: newComment.nome,
      email: newComment.email,
      comentario: newComment.texto,
      data: new Date().toLocaleDateString('pt-BR'),
    };

    const updated = [comment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
    setNewComment({ nome: '', email: '', texto: '' });
  };

  if (!post) return <div className="py-20 text-center animate-pulse">Carregando post...</div>;

  return (
    <article className="pb-20">
      {/* Header */}
      <div className="relative h-[60vh] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src={post.imagem} alt={post.titulo} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
          <Link to="/posts" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-8 uppercase font-display tracking-widest">
            <ArrowLeft size={18} /> Voltar aos posts
          </Link>
          <span className="inline-block bg-brand-red text-white font-display px-3 py-1 mb-4 rounded">{post.categoria}</span>
          <h1 className="text-4xl md:text-7xl mb-6 shadow-text tracking-tight">{post.titulo}</h1>
          <div className="flex items-center gap-6 text-muted font-bold text-sm uppercase tracking-widest">
            <span className="flex items-center gap-2"><User size={16} /> {post.autor}</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> {post.data}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-lg md:text-xl leading-relaxed text-muted space-y-8 font-light markdown-body">
          {post.texto.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <p className="text-gray-400 italic mt-12 border-l-4 border-brand-red pl-6 py-2">
            Este é um conteúdo exclusivo do Nicho Hub. Siga-nos nas redes sociais para mais novidades.
          </p>
        </div>

        {/* Comments Section */}
        <section className="mt-24 pt-16 border-t border-white/10">
          <div className="flex items-center gap-4 mb-12">
            <MessageSquare className="text-brand-red" size={32} />
            <h2 className="text-4xl uppercase">Comentários ({comments.length})</h2>
          </div>

          <form onSubmit={handleSubmitComment} className="glass-card p-8 mb-16 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-white/40 tracking-widest">Nome Completo</label>
                <input 
                  type="text" 
                  value={newComment.nome}
                  onChange={e => setNewComment({...newComment, nome: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-md focus:border-brand-red outline-none transition-colors"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-white/40 tracking-widest">E-mail (Opcional)</label>
                <input 
                  type="email" 
                  value={newComment.email}
                  onChange={e => setNewComment({...newComment, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-md focus:border-brand-red outline-none transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-white/40 tracking-widest">Comentário</label>
              <textarea 
                value={newComment.texto}
                onChange={e => setNewComment({...newComment, texto: e.target.value})}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-md h-32 focus:border-brand-red outline-none transition-colors resize-none"
                placeholder="O que você achou deste post?"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary w-full md:w-auto flex items-center justify-center gap-3">
              PUBLICAR COMENTÁRIO <Send size={18} />
            </button>
          </form>

          <div className="space-y-8">
            {comments.map((comment) => (
              <motion.div 
                key={comment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 md:gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-display text-2xl flex-shrink-0">
                  {comment.nome.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-6 relative">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-display text-xl text-brand-red">{comment.nome}</h4>
                    <span className="text-[10px] text-white/40 italic">{comment.data}</span>
                  </div>
                  <p className="text-white/80 leading-relaxed">{comment.comentario}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
