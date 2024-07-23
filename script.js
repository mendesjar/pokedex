window.onload = function () {
  const dialogInfo = document.getElementById("info-dialog");
  const buttonCloseDialog = document.querySelector(".close-dialog");
  const buttonInfo = document.querySelector(".button-info");
  const idPokemon = document.querySelector(".id-pokemon");
  const nomePokemon = document.querySelector(".nome-pokemon");
  const imgPokemon = document.querySelector(".pokemon-image");
  const typePokemon = document.querySelector(".pokemon-type");

  const formPokemon = document.querySelector(".form");
  const inputPokemon = document.querySelector(".input_search");

  const buscarPokemons = async (pokemon) => {
    const apiData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const resultData = await apiData.json();
    return resultData;
  };

  const renderDados = async (pokemon) => {
    const pokemonEncontrado = await buscarPokemons(pokemon);
    const pathImage =
      pokemonEncontrado["sprites"]["versions"]["generation-v"]["black-white"];
    const imageAnimated = pathImage["animated"]["front_default"];
    const imageStatic = pathImage["front_default"];
    idPokemon.innerHTML = pokemonEncontrado.id;
    nomePokemon.innerHTML = pokemonEncontrado?.name?.toUpperCase();
    imgPokemon.src = imageAnimated || imageStatic;
    typePokemon.innerHTML = pokemonEncontrado.types
      .map((el) => el.type.name.toUpperCase())
      .join(" | ");
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
