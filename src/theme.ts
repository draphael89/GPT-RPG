import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f0e4ff",
      100: "#cbb2ff",
      200: "#a480ff",
      300: "#7b4dff",
      400: "#541bff",
      500: "#3b01e6",
      600: "#2d00b4",
      700: "#1f0082",
      800: "#110050",
      900: "#06001f",
    },
    parchment: {
      50: "#fff9e6",
      100: "#ffefc0",
      200: "#ffe599",
      300: "#ffdb72",
      400: "#ffd14b",
      500: "#ffc724",
      600: "#e6b31f",
      700: "#cc9f1b",
      800: "#b38b17",
      900: "#997713",
    },
  },
  fonts: {
    heading: "'MedievalSharp', cursive",
    body: "'Roboto Slab', serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: (props: { colorScheme: string }) => ({
          bg: `${props.colorScheme}.500`,
          color: "white",
          _hover: {
            bg: `${props.colorScheme}.600`,
          },
        }),
        outline: (props: { colorScheme: string }) => ({
          border: "2px solid",
          borderColor: `${props.colorScheme}.500`,
          color: `${props.colorScheme}.500`,
          _hover: {
            bg: `${props.colorScheme}.50`,
          },
        }),
      },
    },
  },
});

export default theme;