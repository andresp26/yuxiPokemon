import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss']
})
export class DetailviewComponent implements OnInit {


  pokemon: any;
  id = 0;
  constructor(private route: ActivatedRoute, private pokeService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      console.log("DetailviewComponent -> ngOnInit ->  params['id']", this.id)
    });
    this.getPokemon(this.id).then(pokemon => {
      this.pokemon = pokemon;
      console.log("DetailviewComponent -> ngOnInit -> this.pokemon", this.pokemon)
    })

  }


  getPokemon(id) {
    
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        return response.json()
      })
      .then(result => {
        
        return result;
        })
      
  }
}
