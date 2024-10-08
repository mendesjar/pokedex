let keyListPokemon = "pokemonList";
let gamePadIndex = null;
let LIMIT_CACHE = 15;

window.onload = function () {
  const dialogInfo = document.getElementById("info-dialog");
  const info = document.querySelector(".info");
  const buttonCyanReset = document.querySelector(".bg-cyan-400");
  const buttonInfo = document.querySelector(".button-info");
  const textPokemon = document.querySelector(".text-pokemon");
  const idPokemon = document.querySelector(".id-pokemon");
  const nomePokemon = document.querySelector(".nome-pokemon");
  const imgPokemon = document.querySelector(".pokemon-image");
  const buttonPrevious = document.querySelector(".button-previous");
  const buttonNext = document.querySelector(".button-next");
  const listTypePokemon = document.querySelector(".list-pokemon-type");
  const pesoPokemon = document.querySelector(".peso-pokemon");
  const alturaPokemon = document.querySelector(".altura-pokemon");
  const pokemonGeneration = document.querySelector(".pokemon-generation");
  const pokemonLegendary = document.querySelector(".legendary");
  const pokemonMythical = document.querySelector(".mythical");

  const formPokemon = document.querySelector(".form");
  const inputPokemon = document.querySelector(".input_search");

  const baseUrl = "https://pokeapi.co/api/v2";

  async function cacheRequest(pokemonSearch) {
    const listPokemonStorage = localStorage.getItem(keyListPokemon);
    const listPokemonCache = JSON.parse(listPokemonStorage);
    if (listPokemonCache?.length) {
      const pokemonCache = listPokemonCache.find(
        (cache) =>
          cache.pkName === pokemonSearch || cache.pkId === Number(pokemonSearch)
      );
      if (pokemonCache) {
        if (timeDifference(pokemonCache.time)) {
          return pokemonCache.data;
        }
        const listAtualizada = listPokemonCache.filter(
          (pk) => pk.pkId != pokemonCache.pkId
        );
        localStorage.setItem(keyListPokemon, JSON.stringify(listAtualizada));
      }
    }
    const apiData = await fetch(`${baseUrl}/pokemon/${pokemonSearch}`);
    const apiResult = await apiData.json();
    if (apiResult.id) {
      const listStorage = [];
      if (listPokemonCache?.length && listPokemonCache?.length <= LIMIT_CACHE) {
        listStorage.push(...listPokemonCache);
        if (listPokemonCache?.length === LIMIT_CACHE) {
          listStorage.shift();
        }
      }
      const apiSpecieData = await fetch(
        `${baseUrl}/pokemon-species/${apiResult.id}`
      );
      const apiSpecieResult = await apiSpecieData.json();
      const bodyStorage = {
        pkId: apiResult.id,
        pkName: apiResult.name,
        data: { ...apiResult, ...apiSpecieResult },
        time: new Date().toISOString(),
      };
      localStorage.setItem(
        keyListPokemon,
        JSON.stringify([...listStorage, bodyStorage])
      );
      return bodyStorage.data;
    }
  }

  function timeDifference(timeData, minutesDifference = 5) {
    const parsedDate = new Date(Date.parse(timeData));
    const today = new Date();
    const timeDiff = parsedDate.getTime() - today.getTime();
    const minutesDiff = timeDiff / (60 * 1000);
    const isToday =
      parsedDate.getFullYear() === today.getFullYear() &&
      parsedDate.getMonth() === today.getMonth() &&
      parsedDate.getDate() === today.getDate();
    if (isToday && Math.abs(minutesDiff) <= minutesDifference) return true;
    return false;
  }

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

  const infoPokemonDebounce = debounce(
    () => (dialogInfo.open = !dialogInfo.open)
  );
  const buscarPokemonDebounce = debounce(() =>
    buscarPokemon(Number(idPokemon.innerHTML) + 1)
  );

  const buscarPokemonService = async (pokemon) => {
    const apiData = await cacheRequest(pokemon);
    return apiData;
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
    pokemonGeneration.innerHTML = pokemon.generation.name?.toUpperCase();
    imgPokemon.src = imageAnimated || imageStatic;
    pokemon.types.map((el) => {
      const type = el.type.name;
      const elemento = document.createElement("p");
      elemento.appendChild(document.createTextNode(type));
      elemento.className = `pokemon-type mt-2 text-sm p-2 rounded-md ${types[type]}`;
      listTypePokemon.appendChild(elemento);
    });
    if (pokemon.is_legendary) {
      pokemonLegendary.style.display = "block";
    } else pokemonLegendary.style.display = "none";
    if (pokemon.is_mythical) {
      pokemonMythical.style.display = "block";
    } else pokemonMythical.style.display = "none";
  }

  const heightPokemon = (pokemonHeight) => {
    const heightM = pokemonHeight / 10;
    const heightCm = pokemonHeight * 10;
    return heightM >= 1 ? heightM + "m" : heightCm + "cm";
  };

  function detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  formPokemon.addEventListener("submit", (e) => {
    e.preventDefault();
    buscarPokemon(inputPokemon?.value?.toLowerCase());
    inputPokemon.value = "";
    const isMobile = detectMob();
    if (isMobile) inputPokemon.blur();
    document.body.scrollIntoView({ behavior: "smooth" });
  });

  buttonInfo.addEventListener("click", (e) => {
    e.preventDefault();
    dialogInfo.open = true;
  });

  buttonCyanReset.addEventListener("dblclick", (e) => {
    e.preventDefault();
    localStorage.removeItem("pokemonList");
  });

  buttonNext.addEventListener("click", () =>
    buscarPokemon(Number(idPokemon.innerHTML) + 1)
  );

  buttonPrevious.addEventListener("click", () => {
    if (idPokemon.innerHTML > 1) buscarPokemon(Number(idPokemon.innerHTML) - 1);
  });

  dialogInfo.addEventListener("click", (e) => {
    e.preventDefault();
    if (dialogInfo.open) {
      dialogInfo.open = false;
    }
  });

  window.addEventListener("gamepadconnected", (e) => {
    const gamePad = e.gamepad;
    gamePadIndex = gamePad.index;

    const a = document.createElement("span");
    a.appendChild(document.createTextNode("A"));
    a.className =
      "acess-gamepad w-5 h-5 bg-green-500 ml-2 rounded-full text-xs text-black text-center shadow-green-circle border-2 border-green-circle";
    textPokemon.appendChild(a);

    const y = document.createElement("span");
    y.appendChild(document.createTextNode("Y"));
    y.className =
      "acess-gamepad w-5 h-5 bg-yellow-500 rounded-full text-xs text-black text-center shadow-yellow-circle border-2 border-yellow-circle";
    info.appendChild(y);

    buttonPrevious.style.display = "none";
    buttonNext.style.display = "none";
  });

  window.addEventListener("gamepaddisconnected", (e) => {
    gamePadIndex = null;

    const acessGamepad = document.querySelectorAll(".acess-gamepad");
    if (acessGamepad?.length) {
      acessGamepad.forEach((e) => e.remove());
    }

    buttonPrevious.style.display = "inline-block";
    buttonNext.style.display = "inline-block";
  });

  function debounce(func, wait = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }

  function handleButton(buttons = []) {
    if (buttons.length) {
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (i === 0 && button.value > 0) {
          buscarPokemonDebounce();
        }
        if (i === 3 && button.value > 0) {
          infoPokemonDebounce();
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
