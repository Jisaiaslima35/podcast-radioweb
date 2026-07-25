import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Radio } from 'lucide-react';
import { AppConfig } from '../types';

interface NavbarProps {
  config: AppConfig;
}

export default function Navbar({ config }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Página Inicial', path: '/' },
    { name: 'Locutores', path: '/locutores' },
    { name: 'Programação', path: '/programacao' },
    { name: 'Vídeos', path: '/videos' },
    { name: 'Contato', path: '/contato' },
    { name: 'Recados', path: '/recados' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-brand-black/95 border-b border-white/5 py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center pulsate">
                <Radio size={18} className="text-white" />
              </div>
              <span className="font-display text-2xl text-white tracking-widest group-hover:text-brand-gold transition-colors">
                {config.nome}
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-display text-xl tracking-wider transition-colors hover:text-brand-gold ${
                  isActive(link.path) ? 'text-brand-red font-medium' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <a 
              href={config.wherebyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-brand-red text-white font-display text-lg px-4 py-2 rounded-md transition-all hover:bg-brand-red/80 active:scale-95 shadow-[0_0_10px_rgba(230,57,70,0.3)]"
            >
              <span className="w-2 h-2 bg-white rounded-full pulsate"></span>
              ESTÚDIO VIRTUAL
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-gold transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-brand-black/98 border-t border-white/10 p-5 space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block font-display text-2xl tracking-wide ${
                isActive(link.path) ? 'text-brand-red' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={config.wherebyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-brand-red text-white py-3 font-display text-xl rounded-md"
          >
            ESTÚDIO VIRTUAL
          </a>
        </div>
      )}
    </nav>
  );
}
