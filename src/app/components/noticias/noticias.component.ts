import { INoticias } from './../../interfaces/interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  @Input() listaNoticias: INoticias[];

  constructor() { }

  ngOnInit() {}

}
