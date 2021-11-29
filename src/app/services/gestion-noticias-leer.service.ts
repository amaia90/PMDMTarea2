import { Article } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { GestionStorageService } from './gestion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  public noticiasLeer: Article [] = [];

  constructor(private gestionAlmacen:GestionStorageService) { //Inyectando servicio

  }

  addNoticia(item) {
    // copiar item
    let itemString = JSON.stringify(item);
    item = JSON.parse(itemString);

    // Añadirlo
    this.noticiasLeer.push(item);
    // console.log(this.noticiasLeer);
    this.gestionAlmacen.setObject("noticias", this.noticiasLeer);
  }

  buscar(item: Article): number  {
    let articuloEncontrado: Article = this.noticiasLeer.find(
      function(cadaArticulo) { 
        return JSON.stringify(cadaArticulo) == JSON.stringify(item);
      }
    );
    let indice = this.noticiasLeer.indexOf(articuloEncontrado);
    return indice;
  }

  borrarNoticia(item) {
    let indice = this.buscar(item);
    if (indice != -1) {
      this.noticiasLeer.splice(indice, 1);
      // console.log(this.noticiasLeer); 
    }
    this.gestionAlmacen.setObject("noticias", this.noticiasLeer); //Para cuando queremos guardar los datos y con el get los recuperamos
  }

  getNoticias() {
    
    return this.noticiasLeer;
    
  }
}
