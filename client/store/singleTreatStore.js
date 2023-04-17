import axios from "axios";

// Action Types
const SET_SINGLE_TREAT = "SET_SINGLE_TREAT";
const UPDATE_SINGLE_TREAT = "UPDATE_SINGLE_TREAT";
const TOKEN = "token";

// Action creators
export const _setSingleTreat= (treatdata) => {
  return {
    type: SET_SINGLE_TREAT,
    treatdata,
  };
};

const _updateSingleTreat = (treatdata) => {
  return {
    type: UPDATE_SINGLE_TREAT,
    treatdata,
  };
};

//Thunks
export const fetchTreat = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/treats/${id}`);
    dispatch(_setSingleTreat(data));
  };
};

export const updateSingleTreat = (treat, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/treats/${treat.id}`, treat);
        const { data: treatData } = await axios.get(`/api/treats/${treat.id}`);
        dispatch(_updateSingleTreat(treatData));
        history.push(`/treats/${treat.id}`)
      }
     catch (error) {
      console.log("TREAT", treat)
    }
  };
};

// reducer
const initialState = [];
const singleTreatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_TREAT:
      return action.treatdata;
    case UPDATE_SINGLE_TREAT:
      return action.treatdata;
    default:
      return state;
  }
};

export default singleTreatReducer;
