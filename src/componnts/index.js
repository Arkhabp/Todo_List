import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  RecyclerViewBackedScrollView,
} from 'react-native';

const Task = props => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.itemLeft}>
        <View style={styles.box}></View>
        <Text style={styles.task}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  box: {
    backgroundColor: '#55BCF6',
    height: 24,
    width: 24,
    borderRadius: 5,
    opacity: 0.4,
    marginRight: 15,
  },
  task: {
    color: 'black',
    maxWidth: '80%',
  },
  circular: {
    borderColor: ' blue',
    borderWidth: 2,
    height: 15,
    width: 15,
    borderRadius: 6,
  },
});
export default Task;
