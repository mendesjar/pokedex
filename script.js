window.onload = function () {
  const idPokemon = document.querySelector(".id-pokemon");
  const nomePokemon = document.querySelector(".nome-pokemon");
  const imgPokemon = document.querySelector(".pokemon-image");

  const formPokemon = document.querySelector(".form");
  const inputPokemon = document.querySelector(".input_search");

  const buscarPokemons = async (pokemon) => {
    const apiData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const resultData = await apiData.json();
    return resultData;
  };

  const renderDados = async (pokemon) => {
    const pokemonEncontrado = await buscarPokemons(pokemon);
    idPokemon.innerHTML = pokemonEncontrado.id;
    nomePokemon.innerHTML = pokemonEncontrado?.name?.toUpperCase();
    imgPokemon.src =
      pokemonEncontrado["sprites"]["versions"]["generation-v"]["black-white"][
        "animated"
      ]["front_default"];
  };

  formPokemon.addEventListener("submit", (e) => {
    e.preventDefault();
    renderDados(inputPokemon?.value?.toLowerCase());
    inputPokemon.value = "";
  });

  renderDados(1);
};
