import React, { Component } from "react";
import * as Font from "expo-font";
import Notebook from "./Pages/Notebook";

export default class App extends Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      lato: require("../assets/fonts/Lato.ttf")
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    return this.state.fontLoaded ? <Notebook /> : null;
  }
}
