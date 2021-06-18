import { createStore } from 'redux';

const INITIAL_STATE = {
    data: '1-2'
}

function companyAndUnity(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_COMPANY':
            return { ...state, data: action.company  }
            
            default: 
            return state;
        }
}

const store = createStore(companyAndUnity);

export default store;

