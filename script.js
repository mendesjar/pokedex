window.onload = function () {
  const dialogInfo = document.getElementById("info-dialog");
  const buttonCloseDialog = document.querySelector(".close-dialog");
  const buttonInfo = document.querySelector(".button-info");
  const idPokemon = document.querySelector(".id-pokemon");
  const nomePokemon = document.querySelector(".nome-pokemon");
  const imgPokemon = document.querySelector(".pokemon-image");
  const listTypePokemon = document.querySelector(".list-pokemon-type");
  const pesoPokemon = document.querySelector(".peso-pokemon");
  const alturaPokemon = document.querySelector(".altura-pokemon");

  const formPokemon = document.querySelector(".form");
  const inputPokemon = document.querySelector(".input_search");

  const buscarPokemons = async (pokemon) => {
    const apiData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const resultData = await apiData.json();
    return resultData;
  };

  const types = {
    normal: "bg-gray-400 text-zinc-950",
    fire: "bg-red-700 text-white",
    grass: "bg-green-600 text-black",
    dragon: "bg-green-500 text-black",
    bug: "bg-green-300 text-black",
    electric: "bg-yellow-500 text-black",
    poison: "bg-violet-950 text-white",
    ice: "bg-sky-400 text-black",
    water: "bg-blue-800 text-white",
    ghost: "bg-blue-600 text-black",
    flying: "bg-blue-400 text-black",
    fighting: "bg-orange-900 text-white",
    psychic: "bg-pink-600 text-white",
    fairy: "bg-pink-400 text-black",
    steel: "bg-gray-600 text-white",
    rock: "bg-amber-950 text-white",
    ground: "bg-orange-400 text-black",
    dark: "bg-black text-white",
    dark: "bg-black text-white",
  };

  const renderDados = async (pokemon) => {
    const typesPokemon = document.querySelectorAll(".pokemon-type");
    if (typesPokemon?.length) {
      typesPokemon.forEach((e) => e.remove());
    }
    const pokemonEncontrado = await buscarPokemons(pokemon);
    const pathImage =
      pokemonEncontrado["sprites"]["versions"]["generation-v"]["black-white"];
    const imageAnimated = pathImage["animated"]["front_default"];
    const imageStatic = pathImage["front_default"];
    idPokemon.innerHTML = pokemonEncontrado.id;
    nomePokemon.innerHTML = pokemonEncontrado?.name?.toUpperCase();
    pesoPokemon.innerHTML = `${pokemonEncontrado.weight / 10}kg`;
    alturaPokemon.innerHTML = heightPokemon(pokemonEncontrado.height);
    imgPokemon.src = imageAnimated || imageStatic;
    pokemonEncontrado.types.map((el) => {
      const type = el.type.name;
      const elemento = document.createElement("p");
      elemento.appendChild(document.createTextNode(type));
      elemento.className = `pokemon-type mt-2 text-sm p-2 rounded-md ${types[type]}`;
      listTypePokemon.appendChild(elemento);
    });
  };

  const heightPokemon = (pokemonHeight) => {
    const height = pokemonHeight / 10;
    return height >= 1 ? height + "m" : pokemonHeight + "cm";
  };

  formPokemon.addEventListener("submit", (e) => {
    e.preventDefault();
    renderDados(inputPokemon?.value?.toLowerCase());
    inputPokemon.value = "";
    inputPokemon.blur();
  });

  buttonInfo.addEventListener("click", (e) => {
    e.preventDefault();
    dialogInfo.open = true;
  });

  buttonCloseDialog.addEventListener("click", (e) => {
    e.preventDefault();
    dialogInfo.open = false;
  });

  renderDados(1);
};
