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
  container: {},
  tasksContainer: {},
  background: {},
  title: {
    fontFamily: commonStyles.fontFamily
  },
  subtitle: {},
  titleBar: {}
});
