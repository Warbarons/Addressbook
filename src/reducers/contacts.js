import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from "../constants/action-types";
const initialState = {
    contacts: []
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return { ...state, contacts: state.contacts.concat(action.payload) };
        case DELETE_CONTACT:
            return { ...state, contacts: state.contacts.filter((item) => {return item.id !== action.payload})};
        case EDIT_CONTACT:
            return { ...state, contacts: state.contacts.map((item) => {
                return item.id !== action.payload.id ? item : action.payload
            })};
        default:
            return state;
    }
};
export default rootReducer;
