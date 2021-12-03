import {INoticias } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { GestionStorageService } from './gestion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  public noticiasLeer: INoticias [] = []; //Se crea noticiasLeer público que es de tipo INoticias, se inicializa en un array vacío

  constructor(private gestionAlmacen:GestionStorageService) { //Inyectando servicio
    this.getNoticias();
    /*Creo la promesa datosPromesa y le digo que el tipo va a ser una promesa de tipo INoticias
    y utilizará la función getObject de GestionStorage para recuperar*/
    let datosPromesa:Promise<INoticias[]>=gestionAlmacen.getObject("noticias");
    datosPromesa.then( (data) => { //Con then le digo lo que quiero hacer con datosPromesa en éste caso mostrarlos por pantalla y añadirlo al array noticiasLeer
      if(data) {
          console.log(data);
          this.noticiasLeer.push(...data);
          
      }
    })
    
  }

  addNoticia(item) {
    // copiar item
    let itemString = JSON.stringify(item);
    item = JSON.parse(itemString);

    // Añadirlo
    this.noticiasLeer.push(item);
    // console.log(this.noticiasLeer);
    this.gestionAlmacen.setObject("noticias", this.noticiasLeer); //Cuando se modifica se actualiza en localstorage
  }

  buscar(item: INoticias): number  {
    let articuloEncontrado: INoticias = this.noticiasLeer.find(
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

  getNoticias() { //Creación de la función gestNoticias que muestra el array noticiasLeer
    return this.noticiasLeer;
  }

  }

