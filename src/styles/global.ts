import { createGlobalStyle } from "styled-components";
import { device } from "./responsive/devices";

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
    padding: 0 1rem;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 1em;
  }
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme["gray-700"]};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme["green-700"]};
    border-radius: 15px;
    height: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme["green-500"]};
    max-height: 10px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme["green-500"]};
  }
  body {
    background: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};
    -webkit-font-smoothing: antialiased;
  }
  body,
  input,
  textarea,
  button {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  @media ${device.tabletM} {
    :root {
      font-size: 87.5%;
    }
  }

  @media ${device.mobileL} {
    :root {
      font-size: 75%;
    }
  }

  @media ${device.mobileM} {
    :root {
      font-size: 62.5%;
    }
  }
`;
