import axios from "axios";

// Action Types
const SET_SINGLE_WEEK = "SET_SINGLE_WEEK";
const UPDATE_SINGLE_WEEK = "UPDATE_SINGLE_WEEK";
const TOKEN = "token";

// Action creators
export const _setSingleWeek= (weekdata) => {
  return {
    type: SET_SINGLE_WEEK,
    weekdata,
  };
};

const _updateSingleWeek = (weekdata) => {
  return {
    type: UPDATE_SINGLE_WEEK,
    weekdata,
  };
};

//Thunks
export const fetchWeek = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/weeks/${id}`);
    dispatch(_setSingleWeek(data));
  };
};

export const updateSingleWeek = (week, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/weeks/${week.id}`, week);
        const { data: weekData } = await axios.get(`/api/weeks/${week.id}`);
        dispatch(_updateSingleWeek(weekData));
        history.push(`/weeks/${week.id}`)
      }
     catch (error) {
      console.log("WEEK", week)
    }
  };
};

// reducer
const initialState = [];
const singleWeekReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_WEEK:
      return action.weekdata;
    case UPDATE_SINGLE_WEEK:
      return action.weekdata;
    default:
      return state;
  }
};

export default singleWeekReducer;
