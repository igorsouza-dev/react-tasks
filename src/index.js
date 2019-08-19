import React, { Component } from "react";
import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native";

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
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <Text style={{ fontFamily: "lato", fontSize: 56 }}>
            Hello, world!
          </Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontFamily: "lato"
  }
});
