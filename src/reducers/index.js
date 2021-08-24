import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

export const manageInputFields = (
  state = { fields: [{ value: null }] },
  action
) => {
  switch (action.type) {
    case "ADD_INPUT":
      return { ...state, fields: [...state.fields, { value: null }] };
    case "REMOVE_INPUT":
      return { ...state, fields: [...state.fields.slice(1)] };
    default:
      return state;
  }
};

export default combineReducers({
  form: formReducer,
  manageInputFields: manageInputFields
});
