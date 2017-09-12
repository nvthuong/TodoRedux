import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//state
let appState = { number : 1, histories: [1], erroMsg: ''};
//action
const add = {
  type: 'ADD',
  value: 1
}

const sub = {
  type: 'SUB',
  value: 1
}

// reducer number
const numberReducer = (state = appState, action) => {
  switch (action.type) {
    case 'ADD':
        let valueAddNumber = state.number + action.value
        state = {
            ...state,
            number: valueAddNumber,
            histories: [...state.histories, valueAddNumber]
        }
      break;
    case 'SUB':
    state = {
        ...state,
        number: state.number - action.value
    }
      break;
  }

  return state;
}

//middleware
//logger
const logger = store => next => action => {
    next(action);
    alert(`State updated: ${JSON.stringify(store.getState())}`);
}
//validate
const checkZero = store => next => action => {
    let currentNumber = store.getState().number.number;
    if(currentNumber == 0){
        next({type: 'LESS_THAN_ZERO'})
    } else{
        next(action);
    }
}

//reducer error
const errorReducer = (state = appState, action) => {
    switch (action.type) {
        case 'LESS_THAN_ZERO':
            state = {
                erroMsg: 'Number can be not less than zero!'   
            }
            break;
    }
    return state;
}

const addAffter3s = () => {
    return dispatch =>{
        setTimeout(() => dispatch(add), 3000);
    }
}

const reducers = combineReducers({number: numberReducer, err: errorReducer});

//create store
const store = createStore(reducers, applyMiddleware(thunk, logger, checkZero));

//test
// // we can get value log using middleware
// store.subscribe(() => {
//   console.log('State updated: ', store.getState());
// })

//  //test validation
// store.dispatch(add);
// store.dispatch(sub);
// store.dispatch(sub);
// store.dispatch(sub);

store.dispatch(addAffter3s());
 
