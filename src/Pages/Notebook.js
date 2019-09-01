import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from "react-native";
import moment from "moment";
import "moment/locale/pt-br";

import Task from "../Components/Task";

import todayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyles";

import Icon from "react-native-vector-icons/FontAwesome";

export default class Notebook extends Component {
  state = {
    tasks: [
      {
        id: 1,
        desc: "Buy course",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: 2,
        desc: "Finish course",
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: 3,
        desc: "Get a job",
        estimateAt: new Date(),
        doneAt: null
      }
    ],
    showDonetasks: true,
    visibleTasks: []
  };
  filterTasks = () => {
    const { showDonetasks, tasks } = this.state;
    let visibleTasks = [];
    if (showDonetasks) {
      visibleTasks = [...tasks];
    } else {
      visibleTasks = tasks.filter(task => task.doneAt === null);
    }
    this.setState({ visibleTasks });
  };

  toggleFilter = () => {
    this.setState(
      { showDonetasks: !this.state.showDonetasks },
      this.filterTasks
    );
  };

  toggleTask = id => {
    const tasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.doneAt = task.doneAt ? null : new Date();
      }
      return task;
    });

    this.setState({ tasks }, this.filterTasks);
  };

  componentDidMount = () => {
    this.filterTasks();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDonetasks ? "eye" : "eye-slash"}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>
              {moment()
                .locale("pt-br")
                .format("ddd, D [de] MMMM")}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.tasksContainer}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <Task {...item} toggleTask={this.toggleTask} />
            )}
          ></FlatList>
        </View>
      </SafeAreaView>
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
  },
  iconBar: {
    marginTop: Platform.OS === "ios" ? 30 : 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
