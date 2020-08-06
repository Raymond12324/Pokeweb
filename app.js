
var pokedex = document.getElementById('pokemones');
var pokemon_name = document.querySelector('#busqueda');
var lista = document.querySelector("#Lista");
var url = 'https://pokeapi.co/api/v2/pokemon?limit=499';
const pokecache ={};

const fechtPokemon = async ()=>
{ 
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result , i)=>({

        ...result,
        nombre:result.name,
        id: i+1,
        imagen:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`,
    }));
    console.log(pokemon.name);
    displayPokemon(pokemon);
     
}

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) =>
            `
            
            <div class="col-lg-11 col-sm-8 col-md-12 shadow-lg">
                <li class="cards" onclick="selectPokemon(${pokeman.id})">
                 <img class = "card-img-top" src="${pokeman.imagen}"/>
                     <h2 class="card-title" >${pokeman.nombre}</h2>                                        
                </li>
             </div>
            
    `   
        )
        
        .join('');       
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) =>{
    if(!pokecache[id]){
        const url =`https://pokeapi.co/api/v2/pokemon/${id}/`;
        const res= await fetch(url);
        const pokeman = await res.json();
        pokecache[id]=pokeman;
        display(pokeman);
    }
    else{
        display(pokecache[id]);
    }
  
   
}

const display = (pokeman) =>{
    const type = pokeman.types.map(type => type.type.name).join(", ");      
        
        const htmlstring = `
        <div class="popup">
                

            <div class="card1 mt-5 shadow-lg">
                <img class = "cards-image" src="${pokeman.sprites.front_default}"/>
                <h2 class="cards-titles" >${pokeman.name}</h2>                               
            <p>
                <small>Altura: </small>${pokeman.height} | <small>Peso: </small>${pokeman.weight} | <small>Tipo: </small>${type}
            </p>
            <a href="https://pokemon.fandom.com/es/wiki/${pokeman.name}" target="_blank" class="btn btn-success">Ir a la wiki</a>
            <button class ="btn btn-danger" id="closebtn" onclick="closePopup()">Cerrar</button>
            </div>
        </div>
        `;
        pokedex.innerHTML = pokedex.innerHTML + htmlstring;
            
       }



    
       


const closePopup = () =>{
    const popup = document.querySelector(".popup");
    popup.parentElement.removeChild(popup);
}

const buscar = async () =>{
try{
    var nombre = pokemon_name.value;
    var nombreL = nombre.toLowerCase();
const url = `https://pokeapi.co/api/v2/pokemon/${nombreL}`;
const res = await fetch(url);
const data = await res.json();
display(data);
}
catch{
    alert("Revise que el nombre sea correcto")
}

}



fechtPokemon();



