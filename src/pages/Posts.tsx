import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Filter, ArrowRight, Layout, Calendar, User } from 'lucide-react';
import { Post } from '../types';

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    fetch('/data/posts.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setFilteredPosts(data);
      });
  }, []);

  const categories = ['Todos', ...Array.from(new Set(posts.map(p => p.categoria)))];

  const filterByCategory = (cat: string) => {
    setCategory(cat);
    if (cat === 'Todos') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.categoria === cat));
    }
    setCurrentPage(1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl mb-4">NOSSO BLOG</h1>
        <p className="text-brand-gold tracking-widest uppercase md:text-xl">Notícias, Artigos e Recursos de Nicho</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat as string}
            onClick={() => filterByCategory(cat as string)}
            className={`px-4 py-2 font-display text-lg rounded-md transition-all ${
              category === cat ? 'bg-brand-red text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {(cat as string).toUpperCase()}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-12">
        {currentPosts.map((post) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <Link to={`/post/${post.id}`} className="block glass-card overflow-hidden">
              <div className="relative aspect-[21/9] overflow-hidden">
                <img src={post.imagem} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent"></div>
                <span className="absolute top-6 left-6 bg-brand-red text-white font-display px-4 py-1 text-lg rounded shadow-xl">
                  {post.categoria}
                </span>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted mb-4 font-bold uppercase tracking-widest">
                   <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-gold" /> {post.data}</span>
                   <span className="flex items-center gap-2"><User size={14} className="text-brand-gold" /> POR {post.autor}</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl mb-6 group-hover:text-brand-red transition-colors tracking-tight">{post.titulo}</h2>
                <p className="text-muted text-lg leading-relaxed mb-8 max-w-3xl font-light">{post.resumo}</p>
                
                <div className="flex items-center gap-3 text-brand-gold font-display text-xl transition-all group-hover:gap-6">
                  CONTINUAR LENDO <ArrowRight size={24} />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Pagination */}
      {filteredPosts.length > postsPerPage && (
        <div className="flex justify-center mt-16 gap-4">
           {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, i) => (
             <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 flex items-center justify-center font-display text-xl rounded-full transition-all ${
                  currentPage === i + 1 ? 'bg-brand-red text-white' : 'bg-white/5 hover:bg-white/10'
                }`}
             >
               {i + 1}
             </button>
           ))}
        </div>
      )}
    </div>
  );
}
