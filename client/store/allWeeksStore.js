import Axios from "axios";

const SET_WEEKS ="SET_WEEKS"
const CREATE_WEEK = "CREATE_WEEK"
const DELETE_WEEK = "DELETE_WEEK"


export const setWeeks = (weeks) =>{
  return{
    type: SET_WEEKS,
    weeks
  }
};

const _createWeek = (week) => {
  return {
    type: CREATE_WEEK,
    week,
  };
};

const _deleteWeek = (week) => {
  return {
    type: DELETE_WEEK,
    week
  };
};

export const fetchWeeks = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/weeks");
        dispatch(setWeeks(data));
  };
};

export const createWeek = (week) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/weeks", week);
    dispatch(_createWeek(created));
    // history.push("/weeks");
  };
};

export const deleteWeek = (id, history) => {
  return async (dispatch) => {
    const { data: week } = await Axios.delete(`/api/weeks/${id}`);
    dispatch(_deleteWeek(week));
    history.push("/weeks");
  };
};


const initialState = [];
export default function weeksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WEEKS:
      return action.weeks;
      case CREATE_WEEK:
        return [...state, action.week];
        case DELETE_WEEK:
      return state.filter((week) => week.id !== action.week.id)
      ;
      default:
        return state;
    }
  }
