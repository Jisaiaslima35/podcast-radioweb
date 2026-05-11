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
    { name: 'Início', path: '/' },
    { name: 'Posts', path: '/posts' },
    { name: 'Podcast', path: '/podcast' },
    { name: 'Sobre', path: '/sobre' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-brand-black/80 backdrop-blur-lg border-bottom border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={config.logo} alt="Logo" className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <span className="font-display text-2xl text-white tracking-widest">{config.nome}</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-display text-xl transition-colors hover:text-brand-red ${
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
              className="flex items-center gap-2 btn-primary px-4 py-2 text-lg"
            >
              <span className="w-2 h-2 bg-white rounded-full pulsate"></span>
              AO VIVO
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-red transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-black/95 backdrop-blur-xl border-t border-white/10 p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block font-display text-2xl ${
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
            className="block btn-primary text-center"
          >
            AO VIVO
          </a>
        </div>
      )}
    </nav>
  );
}
