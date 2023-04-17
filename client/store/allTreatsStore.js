import Axios from "axios";

const SET_TREATS ="SET_TREATS"
const CREATE_TREAT = "CREATE_TREAT"
const DELETE_TREAT = "DELETE_TREAT"


export const setTreats = (treats) =>{
  return{
    type: SET_TREATS,
    treats
  }
};

const _createTreat = (treat) => {
  return {
    type: CREATE_TREAT,
    treat,
  };
};

const _deleteTreat = (treat) => {
  return {
    type: DELETE_TREAT,
    treat
  };
};

export const fetchTreats = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/treats");
        dispatch(setTreats(data));
  };
};

export const createTreat = (treat) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/treats", treat);
    dispatch(_createTreat(created));
    // history.push("/treats");
  };
};

export const deleteTreat = (id, history) => {
  return async (dispatch) => {
    const { data: treat } = await Axios.delete(`/api/treats/${id}`);
    dispatch(_deleteTreat(treat));
    history.push("/treats");
  };
};


const initialState = [];
export default function treatsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TREATS:
      return action.treats;
      case CREATE_TREAT:
        return [...state, action.treat];
        case DELETE_TREAT:
      return state.filter((treat) => treat.id !== action.treat.id)
      ;
      default:
        return state;
    }
  }
