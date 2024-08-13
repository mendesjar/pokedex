let silverColor = "rgba(128,128,128,1)";
tailwind.config = {
  theme: {
    extend: {
      animation: {
        rainbow: "rainbow 10s ease-in-out infinite",
        purple: "purple 4s ease-in-out infinite",
      },
      keyframes: {
        rainbow: {
          "100%, 0%": {
            "background-color": "rgb(255, 0, 0)",
          },
          "8%": {
            "background-color": "rgb(255, 127, 0)",
          },
          "16%": {
            "background-color": "rgb(255, 255, 0)",
          },
          "25%": {
            "background-color": "rgb(127, 255, 0)",
          },
          "33%": {
            "background-color": "rgb(0, 255, 0)",
          },
          "41%": {
            "background-color": "rgb(0, 255, 127)",
          },
          "50%": {
            "background-color": "rgb(0, 255, 255)",
          },
          "58%": {
            "background-color": "rgb(0, 127, 255)",
          },
          "66%": {
            "background-color": "rgb(0, 0, 255)",
          },
          "75%": {
            "background-color": "rgb(127, 0, 255)",
          },
          "83%": {
            "background-color": "rgb(255, 0, 255)",
          },
          "91%": {
            "background-color": "rgb(255, 0, 127)",
          },
        },
        purple: {
          "100%, 0%": {
            "background-color": "#1e002e",
          },
          "25%": {
            "background-color": "#a306fc",
          },
          "65%": {
            "background-color": "#f03eff",
          },
          "85%": {
            "background-color": "#47006c",
          },
        },
      },
      colors: {
        "silver-border": silverColor,
        "cyan-circle": "rgba(13, 148, 136,1)",
        "red-circle": "rgba(127, 29, 29,1)",
        "yellow-circle": "rgba(249, 115, 22,1)",
        "green-circle": "rgba(22, 163, 74,1)",
      },
      fontFamily: {
        body: "Russo One",
      },
      backgroundImage: {
        "red-gradient":
          "linear-gradient(90deg, rgba(239,68,68,1) 0%, rgba(185,28,28,1) 100%)",
        "texture-screen": "url('./img/pokedex-texture.png')",
      },
      boxShadow: {
        input: `-6px 6px 0 0 ${silverColor}`,
      },
      boxShadow: {
        main: `-10px 10px 0 0 ${silverColor}`,
        input: `-6px 6px 0 0 ${silverColor}`,
        "cyan-circle": "-2.5px 2.5px 0 0 rgba(13, 148, 136,1)",
        "red-circle": "-2.5px 2.5px 0 0 rgba(127, 29, 29,1)",
        "yellow-circle": "-2.5px 2.5px 0 0 rgba(249, 115, 22,1)",
        "green-circle": "-2.5px 2.5px 0 0 rgba(22, 163, 74,1)",
      },
    },
  },
};
