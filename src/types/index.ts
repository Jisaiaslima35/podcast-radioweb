export interface AppConfig {
  nome: string;
  slogan: string;
  banner: string;
  logo: string;
  corPrimaria: string;
  corSecundaria: string;
  streamUrl: string;
  streamNome: string;
  wherebyUrl: string;
  wherebyHorarios: string[];
  tawkPropertyId: string;
  statusApiUrl: string;
  redesSociais: {
    instagram: string;
    facebook: string;
    youtube: string;
    whatsapp: string;
  };
}

export interface Post {
  id: number;
  titulo: string;
  resumo: string;
  texto: string;
  imagem: string;
  categoria: string;
  data: string;
  autor: string;
}

export interface PodcastEpisode {
  id: number;
  titulo: string;
  descricao: string;
  audio: string;
  capa: string;
  duracao: string;
  data: string;
  temporada: number;
  episodio: number;
}

export interface PresenterStatus {
  online: boolean;
  apresentador: string;
  horarioEntrada: string;
  mensagem: string;
}

export interface Comment {
  id: string;
  postId: number;
  nome: string;
  email?: string;
  comentario: string;
  data: string;
}
