import { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, RotateCcw, FastForward, Volume2 } from 'lucide-react';
import { PodcastEpisode } from '../types';

interface PodcastPlayerProps {
  episode: PodcastEpisode;
  onClose: () => void;
}

export default function PodcastPlayer({ episode, onClose }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [episode]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const changeRate = () => {
    const rates = [1, 1.5, 2];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) audioRef.current.playbackRate = nextRate;
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden relative group">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-white/40 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      <div className="flex gap-4">
        <img src={episode.capa} alt={episode.titulo} className="w-20 h-20 rounded-lg object-cover shadow-lg" />
        
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-brand-red font-display uppercase tracking-widest mb-1">Tocando Agora • Podcast</p>
          <h3 className="text-white font-display text-xl truncate leading-none">{episode.titulo}</h3>
          <p className="text-white/60 text-xs truncate mt-1">Temporada {episode.temporada} • Episódio {episode.episodio}</p>
          
          <div className="flex items-center gap-4 mt-3">
            <button onClick={() => togglePlay()} className="text-white hover:text-brand-red transition-colors">
              {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
            </button>
            <div className="flex-1">
              <div className="h-1 bg-white/10 rounded-full relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-brand-red rounded-full" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
                <input 
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    const time = parseFloat(e.target.value);
                    setCurrentTime(time);
                    if (audioRef.current) audioRef.current.currentTime = time;
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <button 
              onClick={changeRate}
              className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition-colors"
            >
              {playbackRate}x
            </button>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={episode.audio} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
}
