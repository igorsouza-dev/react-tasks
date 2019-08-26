import React, { Component } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import todayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyles";

export default class Pages extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Today</Text>
            <Text style={styles.subtitle}>
              {moment()
                .locale("pt-br")
                .format("ddd, D [de] MMMM")}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.tasksContainer}>
          <Text>Task 1</Text>
          <Text>Task 2</Text>
          <Text>Task 3</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tasksContainer: {
    flex: 7
  },
  background: {
    flex: 3
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 30
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
