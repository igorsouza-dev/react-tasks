import React, { Component } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  DatePickerAndroid,
  DatePickerIOS,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert
} from "react-native";

import moment from "moment";
import commonStyles from "../commonStyles";
import { Platform } from "@unimodules/core";
const initialState = {
  desc: "",
  date: new Date()
};
export default class AddTask extends Component {
  constructor() {
    super();
    this.state = { ...initialState };
  }
  handleAndroidDateChanged = () => {
    DatePickerAndroid.open({
      date: this.state.date
    }).then(e => {
      if (e.action !== DatePickerAndroid.dismissedAction) {
        const momentDate = moment(this.state.date);
        momentDate.date(e.day);
        momentDate.month(e.month);
        momentDate.year(e.year);
        this.setState({ date: momentDate.toDate() });
      }
    });
  };
  save = () => {
    if (!this.state.desc.trim()) {
      Alert.alert("Invalid data", "You should inform a description!");
      return;
    }
    const data = { ...this.state };
    this.props.onSave(data);
    this.setState({ ...initialState });
  };

  render() {
    const { onCancel, isVisible } = this.props;
    let datepicker = null;
    if (Platform.OS === "ios") {
      datepicker = (
        <DatePickerIOS
          mode="date"
          date={this.state.date}
          onDateChange={date => this.setState({ date })}
        />
      );
    } else {
      datepicker = (
        <TouchableOpacity onPress={this.handleAndroidDateChanged}>
          <Text style={styles.date}>
            {moment(this.state.date)
              .locale("pt-br")
              .format("ddd, D [de] MMMM")}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <Modal
        onRequestClose={onCancel}
        visible={isVisible}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.offset}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>New Task!</Text>
          <TextInput
            placeholder="Description..."
            style={styles.input}
            onChangeText={desc => this.setState({ desc })}
            value={this.state.desc}
          />

          {datepicker}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.button}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.offset}></View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "space-between"
  },
  offset: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.default
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.default,
    color: commonStyles.colors.secondary,
    textAlign: "center",
    fontSize: 15,
    padding: 15
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    width: "90%",
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 6
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    textAlign: "center"
  },
  buttonsContainer: { flexDirection: "row", justifyContent: "flex-end" }
});
