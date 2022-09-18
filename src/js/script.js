const pokemonImage = document.querySelector('.pokemon');
const pokemonAudio = document.querySelector('.pokemon-audio');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const buttonAudioPokemon = document.querySelector('.button-audio');
const buttonBack = document.querySelector('.button-back');
const buttonNext = document.querySelector('.button-next');
const buttonLight = document.getElementById('button-light');
const buttonSound = new Audio();
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonTypeOne = document.querySelector('.pokemon-type-one');
const pokemonTypeTwo = document.querySelector('.pokemon-type-two');
const pokemonHeight = document.querySelector('.pokemon-height');
const pokemonWeight = document.querySelector('.pokemon-weight');
const pokemonHp = document.querySelector('.pokemon-hp'); 
const pokemonAttack = document.querySelector('.pokemon-attack'); 
const pokemonDefense = document.querySelector('.pokemon-defense'); 
const pokemonSpAtk = document.querySelector('.pokemon-sp-atk'); 
const pokemonSpDef = document.querySelector('.pokemon-sp-def'); 
const pokemonSpeed = document.querySelector('.pokemon-speed');

let pokemonId = 1;
buttonSound.src = './src/audio/button.mp3';
const typeColor = {
    'grass': '#63bc5a',
    'bug': '#91c12f',
    'dark': '#5a5465',
    'dragon': '#0b6dc3',
    'electric': '#f4d23c',
    'fairy': '#ec8fe6',
    'fighting': '#ce416b',
    'fire': '#ff9d55',
    'flying': '#89aae3',
    'ghost': '#5269ad',
    'ground': '#d97845',
    'ice':  '#73cec0',       
    'normal': '#919aa2',
    'poison': '#b567ce',
    'psychic': '#fa7179',
    'rock': '#c5b78c',
    'steel': '#5a8ea2',
    'water': '#5090d6',
};

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = './src/images/pokebola-loading.gif';

    const data = await fetchPokemon(pokemon);

    if (!data) {
        pokemonImage.src = './src/images/missingno.png'
        pokemonName.innerHTML = 'Missingno';
        pokemonNumber.innerHTML = '#???';
        pokemonTypeOne.innerHTML = '?????';
        pokemonTypeOne.style.backgroundColor = '';
        pokemonTypeTwo.innerHTML = '?????';
        pokemonTypeTwo.style.backgroundColor = '';
        pokemonHeight.innerHTML = '?????';
        pokemonWeight.innerHTML = '?????';
        pokemonHp.innerHTML = '?????';
        pokemonAttack.innerHTML = '?????';
        pokemonDefense.innerHTML = '?????';
        pokemonSpAtk.innerHTML = '?????';
        pokemonSpDef.innerHTML = '?????';
        pokemonSpeed.innerHTML = '?????'; 
        pokemonAudio.innerHTML= '';
        pokemonId = ''; 
    }           
    
    pokemonId = data.id;
    input.value = '';    
    pokemonImage.style.display = 'block';
    pokemonImage.src = data['sprites']['versions']['generation-v']
    ['black-white']['animated']['front_default'];            
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `#${pokemonId}`;    
    pokemonTypeOne.innerHTML = data.types[0].type.name;
    pokemonTypeOne.style.backgroundColor = typeColor[data.types[0].type.name];

    if (data.types[1]) {
        pokemonTypeTwo.innerHTML = data.types[1].type.name;
        pokemonTypeTwo.style.backgroundColor = typeColor[data.types[1].type.name];
        pokemonTypeTwo.style.padding = '3%';
    } else{ 
        pokemonTypeTwo.innerHTML = ''; 
        pokemonTypeTwo.style.padding = 0;
    } 

    pokemonHeight.innerHTML = `Height: ${data.height / 10}m`;
    pokemonWeight.innerHTML = `Weight: ${data.weight / 10}kg`;
    pokemonHp.innerHTML = `Hp: ${data.stats[0].base_stat}`;
    pokemonAttack.innerHTML = `Attack: ${data.stats[1].base_stat}`;
    pokemonDefense.innerHTML = `Defense: ${data.stats[2].base_stat}`;
    pokemonSpAtk.innerHTML = `Sp.atk: ${data.stats[3].base_stat}`;
    pokemonSpDef.innerHTML = `Sp.def: ${data.stats[4].base_stat}`;
    pokemonSpeed.innerHTML = `Speed: ${data.stats[5].base_stat}`;          
    pokemonAudio.innerHTML=`<audio autoplay><source src="./src/audio/(${pokemonId}).wav" type="audio/wav"></source></audio>`;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonAudioPokemon.addEventListener('click',()=>{
    let sound = document.querySelector('audio');
    sound.play();
});

buttonBack.addEventListener('click', () => {
    if (pokemonId > 1) {
      pokemonId -= 1;
      renderPokemon(pokemonId);
    }
});
  
buttonNext.addEventListener('click', () => {
    if (pokemonId === '') return;
    pokemonId += 1;
    renderPokemon(pokemonId);
});

buttonLight.addEventListener('change', () => {
    document.body.classList.toggle('morning');
    buttonSound.play();
});

renderPokemon(pokemonId);


