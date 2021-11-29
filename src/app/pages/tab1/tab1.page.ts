import { HttpClient } from '@angular/common/http';
import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GestionStorageService } from './../../services/gestion-storage.service';



interface II {
  status: string;
  sources: INoticias[];
}

interface INoticias {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  botonSeleccionado:string="";
  // Creo e inicializo un array vacío
  listaNoticias: INoticias[]=[]; //Nuevo interface INoticias
  listaNoticiasBusiness: INoticias[]=[];
  //listaNoticias: Article[] = [];

  respuesta: Observable<INoticias>;

  constructor(private leerFichero: HttpClient, private gestionAlmacen:GestionStorageService, private gestionNoticiasLeer: GestionNoticiasLeerService) {
    this.cargarFichero(); 
  }

  check(eventoRecibido, item: INoticias) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeer.addNoticia(item);
    } else {
      this.gestionNoticiasLeer.borrarNoticia(item);
    }
    
  }

  // Lee el fichero con los artículos y los guarda en el array "listaNoticias"
  private cargarFichero() {

   let respuesta: Observable<INoticias> = this.leerFichero.get<INoticias>("https://newsapi.org/v2/sources?category=general&apiKey=c00b017f749b4d919c59b4a6a674bf9b");

    
    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      this.listaNoticias.push(... resp['sources']);
      this.gestionAlmacen.setObject("noticias", this.listaNoticias);
      console.log(this.listaNoticias)

    } );
  }
  private listaBussiness(){
    let respuesta: Observable<INoticias> = this.leerFichero.get<INoticias>("https://newsapi.org/v2/sources?category=business&apiKey=c00b017f749b4d919c59b4a6a674bf9b");

    
    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      
      this.listaNoticias.push(... resp['sources']);
      this.gestionAlmacen.setObject("noticias", this.listaNoticias);
      console.log(this.listaNoticiasBusiness)
    } );
  }

  private listaTechnology(){
    let respuesta: Observable<INoticias> = this.leerFichero.get<INoticias>("https://newsapi.org/v2/sources?category=technology&apiKey=c00b017f749b4d919c59b4a6a674bf9b");

    
    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      
      this.listaNoticias.push(... resp['sources']);
      console.log(this.listaNoticiasBusiness)
    } );
  }
  private listaScience(){
    let respuesta: Observable<INoticias> = this.leerFichero.get<INoticias>("https://newsapi.org/v2/sources?category=science&apiKey=c00b017f749b4d919c59b4a6a674bf9b");

    
    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      
      this.listaNoticias.push(... resp['sources']);
      console.log(this.listaNoticias)
    } );
  }
  ngOnInit() { 
  }
  segmentChanged(event){ //El evento es de tipo CustomEvent
  this.botonSeleccionado=event.detail.value;
  console.log(this.botonSeleccionado)
  if(this.botonSeleccionado=="general"){
    //this.cargarFichero();
    //this.listaNoticias=[];
    console.log(this.listaNoticias)
    console.log("estoy en el camino correcto")
  } else if(this.botonSeleccionado=="business"){
    this.listaNoticias=[];
    this.listaBussiness();
  }
  else if(this.botonSeleccionado=="technology"){
    this.listaNoticias=[];
    this.listaTechnology();
  }
  else if(this.botonSeleccionado=="science"){
    this.listaNoticias=[];
    this.listaScience();
  }
}
}
