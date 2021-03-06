import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import "moment/locale/pt-br";

import commonStyles from "../commonStyles";

export default class Task extends Component {
  render() {
    const { doneAt, desc, estimateAt, toggleTask, id } = this.props;
    let check = null;
    if (doneAt !== null) {
      check = (
        <View style={styles.done}>
          <Icon name="check" size={20} color={commonStyles.colors.secondary} />
        </View>
      );
    } else {
      check = <View style={styles.pending}></View>;
    }
    const descStyle =
      doneAt !== null
        ? { textDecorationLine: "line-through", fontWeight: "bold" }
        : {};
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => toggleTask(id)}>
          <View style={styles.checkContainer}>{check}</View>
        </TouchableWithoutFeedback>

        <View>
          <Text style={[styles.description, descStyle]}>{desc}</Text>
          <Text style={styles.date}>
            {moment(estimateAt)
              .locale("pt-br")
              .format("ddd, D [de] MMMM")}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#aaa"
  },
  checkContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%"
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: "#4d7031",
    alignItems: "center",
    justifyContent: "center"
  },
  pending: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 15,
    borderColor: "#555"
  },
  description: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12
  }
});
