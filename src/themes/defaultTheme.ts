export interface IThemeProp {
  theme: ITheme
}

export interface ITheme {
  background: string,
  headline: string,
  paragraph: string,
  button: string,
  buttonText: string,
  stroke: string,
  main: string,
  highlight: string,
  secondary: string,
  tertiary: string

}

// palette from here: https://www.happyhues.co/palettes/10
export const DefaultTheme: ITheme = {
  background: "#004643",
  headline: "#fffffe",
  paragraph: "abd1c6",
  button: "#f9bc60",
  buttonText: "001e1d",
  stroke: "#001e1d",
  main: "#e8e4e6",
  highlight: "#f9bc60",
  secondary: "#abd1c6",
  tertiary: "#e16163"
}