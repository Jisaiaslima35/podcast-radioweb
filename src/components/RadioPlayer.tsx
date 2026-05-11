import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Radio, Disc } from 'lucide-react';
import { AppConfig } from '../types';

interface RadioPlayerProps {
  config: AppConfig;
}

export default function RadioPlayer({ config }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        // Reload stream to be as close to "live" as possible
        audioRef.current.load();
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(err => {
            console.error("Autoplay blocked or failed:", err);
            setIsLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Attempt Autoplay on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log("Interaction needed for radio playback"));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-brand-black/80 backdrop-blur-xl border border-white/10 rounded-2xl py-3 px-5 flex items-center gap-4 shadow-2xl relative overflow-hidden group">
      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red/50 to-transparent"></div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg shrink-0 ${
            isPlaying 
            ? 'bg-white text-brand-black hover:scale-105' 
            : 'bg-brand-red text-white hover:bg-brand-red/80 hover:scale-110'
          } ${isLoading ? 'animate-pulse opacity-50' : ''}`}
        >
          {isLoading ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : 
           isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>
      </div>

      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className={`relative shrink-0 transition-transform duration-500 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
          <div className={`w-11 h-11 rounded-full bg-zinc-800 flex items-center justify-center p-1 border border-white/5 ${isPlaying ? 'vinyl-spin' : ''}`}>
            <Disc className="text-brand-gold w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-brand-black rounded-full border border-white/20"></div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col min-w-0">
          <p className="font-display text-xl text-white tracking-wider leading-none truncate group-hover:text-brand-gold transition-colors">{config.streamNome}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 bg-brand-red/10 border border-brand-red/20 px-1.5 py-0.5 rounded text-[8px] text-brand-red font-bold uppercase tracking-wider">
              <span className="w-1 h-1 bg-brand-red rounded-full pulsate"></span>
              LIVE
            </span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 w-20 group/volume shrink-0">
        <Volume2 size={16} className="text-muted group-hover/volume:text-brand-gold transition-colors" />
        <div className="relative flex-1 h-1 bg-white/10 rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-brand-red rounded-full transition-all" 
            style={{ width: `${volume * 100}%` }}
          ></div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={config.streamUrl} 
        crossOrigin="anonymous" 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
