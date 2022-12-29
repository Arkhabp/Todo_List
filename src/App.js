import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './componnts';

export default function App() {
  const [textInput, setTextInput] = useState();
  const [todos, setTodos] = useState([
    {id: 1, task: 'First todo', completed: true},
    {id: 2, task: 'Second todo', completed: false},
  ]);

  // CALL GetTodosFromUserDevices Function
  useEffect(() => {
    getTodosFromUserDevice();
  }, []);
  // CALL SaveTodoToUserDevices Function
  useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);

  const ListItem = ({todo}) => {
    return (
      <View style={styles.ListItem}>
        <View>
          <Text
            style={{
              fontSize: 15,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.task}
          </Text>
        </View>
        {/* Condition */}
        <View style={{flexDirection: 'row'}}>
          {!todo?.completed && (
            <TouchableOpacity
              style={[styles.DoneBotton]}
              onPress={() => markTodoComplete(todo?.id)}>
              <Text>D</Text>
            </TouchableOpacity>
          )}
          {/* Delete Botton */}
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.DeleteBotton]}
              onPress={() => deleteTodo(todo?.id)}>
              <Text>C</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  // AscyncStorage
  const saveTodoToUserDevice = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (e) {
      console.log(e);
    }
  };
  // Get TodoFromUserDevice Function
  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ADD TODO
  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please Input Some Task!!');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput('');
      Keyboard.dismiss();
    }
  };
  //  COMPLETED TODO
  const markTodoComplete = todoId => {
    console.log(todoId);
    const newTodos = todos.map(item => {
      if (item.id == todoId) {
        return {...item, completed: true};
      }
      return item;
    });
    setTodos(newTodos);
  };
  // DELETE ITEM
  const deleteTodo = todoId => {
    const newTodos = todos.filter(item => item.id != todoId);
    setTodos(newTodos);
  };
  // DDELETE ALL
  const clearTodo = () => {
    Alert.alert('Confirm', 'Are You Sure Want Deleted All Todos?', [
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {
        text: 'No',
      },
    ]);
  };
  // First function

  // const [taskItems, setTaskItems] = useState([]);
  // const handleAddTask = () => {
  //   Keyboard.dismiss();
  //   setTaskItems([...taskItems, task]);
  //   setTask(null);
  // };

  // const completeTask = index => {
  //   let itemsCopy = [...taskItems];
  //   itemsCopy.splice(index, 1);
  //   setTaskItems(itemsCopy);
  // };
  // first function
  return (
    <View style={styles.Container}>
      {/* Todays Task Heeader */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <TouchableOpacity
          style={styles.deleteAll}
          onPress={() => clearTodo()}></TouchableOpacity>
      </View>
      {/* FlatList */}
      <FlatList
        data={todos}
        renderItem={({item}) => <ListItem todo={item} />}
      />
      {/* FlatList End */}

      {/* Task List */}

      {/* Write a Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a Task'}
          value={textInput}
          onChangeText={text => setTextInput(text)}
        />

        <TouchableOpacity onPress={() => addTodo()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  deleteAll: {
    backgroundColor: 'red',
    height: 25,
    width: 20,
    borderRadius: 5,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ListItem: {
    padding: 20,
    backgroundColor: 'black',
    flexDirection: 'row',
    borderRadius: 7,
    marginVertical: 6,
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  DoneBotton: {
    height: 25,
    width: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginRight: 10,
  },
  DeleteBotton: {
    height: 25,
    width: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 250,
    color: '#FFFF',
    backgroundColor: 'black',
    borderRadius: 25,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 55,
    height: 55,
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});
