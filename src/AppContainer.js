import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import TaskList from './views/entityInbox/index';
import taskListReducer from './views/entityInbox/reducer';

let appState = {
    data: [
        { title: 'Go to the office', isFinished: true },
        { title: 'Prepare tasks for today', isFinished: false },
        { title: 'Team meeting', isFinished: false },
        { title: 'Commit tasks changed', isFinished: false },
    ]
}
const store = createStore(taskListReducer, appState);

export default class TodoRedux extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data : [
            { title: 'Go to the office', isFinished: true },
            { title: 'Prepare tasks for today', isFinished: false },
            { title: 'Team meeting', isFinished: false },
            { title: 'Commit tasks changed', isFinished: false },
          ]
        }


      }

    render() {
        return (
            <Provider store={store} >
                <View style={styles.container}>
                    <TaskList
                        listData={ this.state.data }  
                    />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E1F5FE'
    }
  });

AppRegistry.registerComponent('TodoRedux', () => TodoRedux);
