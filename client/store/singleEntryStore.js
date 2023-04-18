import axios from "axios";

// Action Types
const SET_SINGLE_ENTRY = "SET_SINGLE_ENTRY";
const UPDATE_SINGLE_ENTRY = "UPDATE_SINGLE_ENTRY";
const TOKEN = "token";

// Action creators
export const _setSingleEntry= (entrydata) => {
  return {
    type: SET_SINGLE_ENTRY,
    entrydata,
  };
};

const _updateSingleEntry = (entrydata) => {
  return {
    type: UPDATE_SINGLE_ENTRY,
    entrydata,
  };
};

//Thunks
export const fetchEntry = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/entries/${id}`);
    dispatch(_setSingleEntry(data));
  };
};

export const updateSingleEntry = (entry, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/entries/${entry.id}`, entry);
        const { data: entryData } = await axios.get(`/api/entries/${entry.id}`);
        dispatch(_updateSingleEntry(entryData));
        history.push(`/entries/${entry.id}`)
      }
     catch (error) {
      console.log("ENTRY", entry)
    }
  };
};

// reducer
const initialState = [];
const singleEntryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_ENTRY:
      return action.entrydata;
    case UPDATE_SINGLE_ENTRY:
      return action.entrydata;
    default:
      return state;
  }
};

export default singleEntryReducer;
