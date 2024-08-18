import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923",
    },
    parchment: {
      100: "#fef6e4",
      200: "#fde9c4",
      300: "#fcdca4",
      400: "#fbcf84",
      500: "#fac264",
    },
  },
  fonts: {
    heading: "'Merriweather', serif",
    body: "'Roboto', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: {
          bg: "brand.600",
          color: "white",
          _hover: {
            bg: "brand.700",
          },
        },
        outline: {
          borderColor: "brand.600",
          color: "brand.600",
          _hover: {
            bg: "brand.50",
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: "white",
            _hover: {
              bg: "gray.50",
            },
            _focus: {
              bg: "gray.50",
              borderColor: "brand.500",
            },
          },
        },
      },
    },
  },
});

export default theme;