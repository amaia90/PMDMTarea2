
/*export interface Source {
  id?: string;
  name: string;
}
interface II {
  status: string;
  sources: INoticias[];
}

export interface INoticias {
  id: string;
  name: string;
  description: string;
  url: string;
  urlToImage:string;
  category: string;
  language: string;
  country: string;
}*/

/*La interface la he creado con la aplicación Postman introduciendo en Get la url de newsapi que 
quiero y me da un resultado json, después éste a través del plugin Json to ts lo convierto en la siguiente interfaz
lo único que he hecho es cambiar nombres y exportarlos para poder utilizarlo*/

export interface II {
  status: string;
  totalResults: number;
  articles: INoticias[];
}

export interface INoticias {
  source: Source;
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

export interface Source {
  id?: string;
  name: string;
}