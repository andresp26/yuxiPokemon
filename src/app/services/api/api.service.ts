import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeStamp } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  path = 'https://pokeapi.co/api/v2/'
  constructor(private http: HttpClient) { }

  getPokemonsId(id) {
    return this.http.get(this.path + 'pokemon?offset=50&limit=50' , {})
  }
}
