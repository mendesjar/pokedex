window.onload = function () {
  const dialogInfo = document.getElementById("info-dialog");
  const buttonInfo = document.querySelector(".button-info");
  const textPokemon = document.querySelector(".text-pokemon");
  const idPokemon = document.querySelector(".id-pokemon");
  const nomePokemon = document.querySelector(".nome-pokemon");
  const imgPokemon = document.querySelector(".pokemon-image");
  const listTypePokemon = document.querySelector(".list-pokemon-type");
  const pesoPokemon = document.querySelector(".peso-pokemon");
  const alturaPokemon = document.querySelector(".altura-pokemon");

  const formPokemon = document.querySelector(".form");
  const inputPokemon = document.querySelector(".input_search");

  const baseUrl = "https://pokeapi.co/api/v2/pokemon";

  const buscarPokemonService = async (pokemon) => {
    const apiData = await fetch(`${baseUrl}/${pokemon}`);
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

  const buscarPokemon = async (pokemon) => {
    const typesPokemon = document.querySelectorAll(".pokemon-type");
    if (typesPokemon?.length) {
      typesPokemon.forEach((e) => e.remove());
    }
    const pokemonEncontrado = await buscarPokemonService(pokemon);
    if (pokemonEncontrado?.id) renderDados(pokemonEncontrado);
  };

  function renderDados(pokemon) {
    const pathImage =
      pokemon["sprites"]["versions"]["generation-v"]["black-white"];
    const imageAnimated = pathImage["animated"]["front_default"];
    const imageStatic = pathImage["front_default"];
    idPokemon.innerHTML = pokemon.id;
    nomePokemon.innerHTML = pokemon?.name?.toUpperCase();
    pesoPokemon.innerHTML = `${pokemon.weight / 10}kg`;
    alturaPokemon.innerHTML = heightPokemon(pokemon.height);
    imgPokemon.src = imageAnimated || imageStatic;
    pokemon.types.map((el) => {
      const type = el.type.name;
      const elemento = document.createElement("p");
      elemento.appendChild(document.createTextNode(type));
      elemento.className = `pokemon-type mt-2 text-sm p-2 rounded-md ${types[type]}`;
      listTypePokemon.appendChild(elemento);
    });
  }

  const heightPokemon = (pokemonHeight) => {
    const heightM = pokemonHeight / 10;
    const heightCm = pokemonHeight * 10;
    return heightM >= 1 ? heightM + "m" : heightCm + "cm";
  };

  formPokemon.addEventListener("submit", (e) => {
    e.preventDefault();
    buscarPokemon(inputPokemon?.value?.toLowerCase());
    inputPokemon.value = "";
    inputPokemon.blur();
    document.body.scrollIntoView({ behavior: "smooth" });
  });

  buttonInfo.addEventListener("click", (e) => {
    e.preventDefault();
    dialogInfo.open = true;
  });

  dialogInfo.addEventListener("click", (e) => {
    e.preventDefault();
    if (dialogInfo.open) {
      dialogInfo.open = false;
    }
  });

  let gamePadIndex = null;

  window.addEventListener("gamepadconnected", (e) => {
    const gamePad = e.gamepad;
    gamePadIndex = gamePad.index;

    const elemento = document.createElement("span");
    elemento.appendChild(document.createTextNode("A"));
    elemento.className =
      "acess-gamepad w-5 h-5 bg-green-500 ml-2 rounded-full text-xs text-black text-center";
    textPokemon.appendChild(elemento);
  });

  window.addEventListener("gamepaddisconnected", (e) => {
    gamePadIndex = null;

    const acessGamepad = document.querySelectorAll(".acess-gamepad");
    if (acessGamepad?.length) {
      acessGamepad.forEach((e) => e.remove());
    }
  });

  function handleButton(buttons = []) {
    if (buttons.length) {
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (i === 0 && button.value > 0) {
          buscarPokemon(Number(idPokemon.innerHTML) + 1);
        }
      }
    }
  }

  function gameLoop() {
    if (gamePadIndex !== null) {
      const gamePad = navigator.getGamepads()[gamePadIndex];
      handleButton(gamePad.buttons);
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();

  buscarPokemon(1);
};
