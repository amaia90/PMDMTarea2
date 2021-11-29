import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface IDatos {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface Article {
  source: Source;
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content: string;
}

interface Source {
  id?: any;
  name: string;
}

@Component({
  selector: 'app-consultas-rest',
  templateUrl: './consultas-rest.component.html',
  styleUrls: ['./consultas-rest.component.scss'],
})
export class ConsultasRestComponent implements OnInit {

  constructor(private servidorRest:HttpClient) { }
  consultaGet(){
    let observableRest:Observable<IDatos>=this.servidorRest.get<IDatos>("https://newsapi.org/v2/everything?q=tesla&from=2021-10-26&sortBy=publishedAt&apiKey=c00b017f749b4d919c59b4a6a674bf9b");
  //Si la consulta está bien realizada  nos subscribimos
  observableRest.subscribe(datos=>{console.log(datos)})
  }

  ngOnInit() {}

}
