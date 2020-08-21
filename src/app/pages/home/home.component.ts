import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemones = [];
  filteredItems = [];
  constructor() { }

  ngOnInit(): void {
    this.getPokemones();

  }

  getPokemones() {
    this.get().then(x => {
      this.filteredItems = x;
      this.pokemones = x;
      this.filteredItems.forEach(element => {
        element.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.id}.png`
      });
      this.pokemones.forEach(element => {
        element.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.id}.png`
      });
    })

  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.pokemones);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.pokemones).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }


  get() {
    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${50}`)
      .then(response => {
        return response.json()
      })
      .then(result => {
        const pokemons = result.results.map(pokemon => {
          const { url } = pokemon
          const id = url.substring(34, url.length - 1)

          return {
            ...pokemon,
            id
          }
        })
        return pokemons
      })
  }
 
}
