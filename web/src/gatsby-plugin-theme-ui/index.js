import { future } from "@theme-ui/presets"

console.log(future)

const tiaInput = {
  borderColor: "greyVeryLight",
  pt: 0,
  pr: 3,
  pb: 0,
  pl: 3,
  height: 5,
  color: "text",
  fontSize: 1,
  fontFamily: "body",
  mb: 2,
  // borderRadius: t => t.radii[2],
  borderRadius: 2,
  "&:focus": {
    borderColor: "pink",
    outline: "none",
  },
}

const fonts = {
  body:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  heading:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  monospace: "Menlo, monospace",
}

export default {
  ...future,
  breakpoints: ["40em", "56em", "64em"],
  fonts: { ...fonts },
  colors: {
    ...future.colors,
    papaya: "papayawhip",
  },
  space: [0, 4, 8, 16, 32, 48, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 48, 64, 128, 256, 512],
  radii: [0, 5, 10],
  forms: {
    input: {
      ...tiaInput,
    },
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  buttons: {
    ...future.buttons,
    primary: {
      "&:hover": { cursor: "pointer" },
      fontWeight: "bold",
    },
  },
}
