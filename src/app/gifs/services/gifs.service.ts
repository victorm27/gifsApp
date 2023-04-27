import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Images, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'GYQyTICx6JHXAuumvtqcU4mNbNC7CqOu';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';

  private _historial:string [] = [];

  public resultados: Gif[] = [];

  get historial(){
    
    return [...this._historial];
  }

  constructor (private http: HttpClient){
  
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    
  }
  buscarGifs(quary: string = '')
  {
    quary = quary.trim().toUpperCase();

    if(!this._historial.includes(quary)){
    this._historial.unshift(quary);
    this._historial = this._historial.splice(0,10);

    localStorage.setItem('historial',JSON.stringify(this.historial));
    
  }
    const params = new HttpParams()
    .set('apikey',this.apiKey)
    .set('q',quary)
    .set('limit','10');

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params} )
        .subscribe((resp ) => {
          this.resultados = resp.data;
          localStorage.setItem('resultados',JSON.stringify(this.resultados));
        })

  }


  
}
