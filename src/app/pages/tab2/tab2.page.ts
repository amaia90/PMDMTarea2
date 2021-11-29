import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Article, INoticias } from './../../interfaces/interfaces';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // Creo e inicializo un array vacío
  listaNoticias: INoticias[] = [];

  constructor(public gestionNoticiasLeer: GestionNoticiasLeerService) {

  }

  

}
