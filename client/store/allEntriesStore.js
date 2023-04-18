import Axios from "axios";

const SET_ENTRIES ="SET_ENTRIES"
const CREATE_ENTRY = "CREATE_ENTRY"
const DELETE_ENTRY = "DELETE_ENTRY"


export const setEntries = (entries) =>{
  return{
    type: SET_ENTRIES,
    entries
  }
};

const _createEntry = (entry) => {
  return {
    type: CREATE_ENTRY,
    entry,
  };
};

const _deleteEntry = (entry) => {
  return {
    type: DELETE_ENTRY,
    entry
  };
};

export const fetchEntries = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/entries");
        dispatch(setEntries(data));
  };
};

export const createEntry = (entry) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/entries", entry);
    dispatch(_createEntry(created));
    dispatch(fetchEntries());
  };
};


export const deleteEntry = (id, history) => {
  return async (dispatch) => {
    const { data: entry } = await Axios.delete(`/api/entries/${id}`);
    dispatch(_deleteEntry(entry));
    history.push("/entries");
  };
};


const initialState = [];
export default function entriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ENTRIES:
      return action.entries;
      case CREATE_ENTRY:
        return [...state, action.entry];
        case DELETE_ENTRY:
      return state.filter((entry) => entry.id !== action.entry.id)
      ;
      default:
        return state;
    }
  }
