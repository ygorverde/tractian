import { createStore } from 'redux';

const INITIAL_STATE = {
    data: ''
}

function courses(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_COURSE':
            return { ...state, data: [ ...state.data, action.title ] }
        case 'SET_COMPANY':
            return { ...state, data: action.company  }
            
            default: 
            return state;
        }
}

const store = createStore(courses);

export default store;

