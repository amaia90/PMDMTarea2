import { INoticias } from './../../interfaces/interfaces'; //Importo la interface INoticas para después utilizarla
import { HttpClient } from '@angular/common/http';
import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GestionStorageService } from './../../services/gestion-storage.service'; //Importo el servicio GestionStorage

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  botonSeleccionado:string=""; //La variable botonSeleccionado es de tipo string
  // Creo e inicializo un array vacío
  listaNoticias: INoticias[]=[]; //Nuevo interface INoticias

  constructor(private leerFichero: HttpClient, private gestionAlmacen:GestionStorageService, private gestionNoticiasLeer: GestionNoticiasLeerService) {
    /*Inyección servicios y de HttpClient para poder hacer llamada a la api newsapi*/
    this.cargarFichero();  //Ejecuto la función cargarFichero para que sea la categoría general la que se muestre en pantalla nada más ejecutar la aplicación
  }

  check(eventoRecibido, item: INoticias) { //Evento que se produce cuando se emite el ionChange
    let estado: boolean = eventoRecibido.detail.checked; //Se crea una variable llamada estado de tipo boolean y en ella se guarda el estado del checked, activado o desactivado
    if (estado) { //Si el estado es activado llama al método addNoticia en caso contrario llama al método borrarNoticia que está en el servicio GestionNoticiasLeerService y que accedemos a él a través de la propiedad inyectada en el constructor gestionNoticiasLeer
      this.gestionNoticiasLeer.addNoticia(item);
    } else {
      this.gestionNoticiasLeer.borrarNoticia(item);
    }
    
  }

  // Lee el fichero con los artículos y los guarda en el array "listaNoticias"
  private cargarFichero() {

   let respuesta: Observable<INoticias> = this.leerFichero.get<INoticias>("https://newsapi.org/v2/top-headlines?category=general&apiKey=c00b017f749b4d919c59b4a6a674bf9b");
    //Guarda en la variable respuesta la respuesta a la llamada hecha a newsapi  como se puede comprobar en la url lleva la apikey y pertenece a la categoria general. El resultado es de tipo INoticias
    //He creado una llamada por cada categoría
    //Para conseguir la apikey me he tenido que registrar en newsapi
    respuesta.subscribe( resp => { //Me subscribo
      console.log("Noticias", resp); //Muestro por pantalla la respuesta
      this.listaNoticias.push(... resp['articles']); //Lo añado al array listaNoticias
      //this.gestionAlmacen.setObject("noticias", this.gestionNoticiasLeer.noticiasLeerIndi);

    } );
  }
  //Realizo el mismo procedimiento por cada una de las categorías
  private listaBussiness(){
    let respuesta: Observable<INoticias> = this.leerFichero.get<INoticias>("https://newsapi.org/v2/top-headlines?category=business&apiKey=c00b017f749b4d919c59b4a6a674bf9b");

    
    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      
      this.listaNoticias.push(... resp['articles']);
      //this.gestionAlmacen.setObject("noticias", this.listaNoticias);
      //console.log(this.listaNoticiasBusiness)
    } );
  }

  private listaTechnology(){
    let respuesta: Observable<INoticias> = this.leerFichero.get<INoticias>("https://newsapi.org/v2/top-headlines?category=technology&apiKey=c00b017f749b4d919c59b4a6a674bf9b");

    
    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      
      this.listaNoticias.push(... resp['articles']);
      //console.log(this.listaNoticiasBusiness)
    } );
  }
  private listaScience(){
    let respuesta: Observable<INoticias> = this.leerFichero.get<INoticias>("https://newsapi.org/v2/top-headlines?category=science&apiKey=c00b017f749b4d919c59b4a6a674bf9b");

    
    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      
      this.listaNoticias.push(... resp['articles']);
      //console.log(this.listaNoticias)
    } );
  }
  ngOnInit() { 
  }
  /*Creo un evento llamado segmentChanged para cada vez que se produzca un cambio de categoría lo capture*/
  segmentChanged(event){ //El evento es de tipo CustomEvent
  this.botonSeleccionado=event.detail.value; //Guarda en la variable botonSeleccionado el estado 
  console.log(this.botonSeleccionado); 
  if(this.botonSeleccionado=="general"){ //Si el usuario hace clic en la categoría general
    this.listaNoticias=[]; //Inicializo array listaNoticias
    this.cargarFichero(); //Ejecuto Función cargarFichero
    console.log(this.listaNoticias)
  } else if(this.botonSeleccionado=="business"){ //Si el usuario hace clic en la categoría business
    this.listaNoticias=[]; //Inicializo array listaNoticias
    this.listaBussiness();//Ejecuto Función lista Bussiness
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
