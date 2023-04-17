import Axios from "axios";

const TOKEN = "token";
const SET_USERS = "SET_USERS";
const CREATE_USER = "CREATE_USER";
const DELETE_USER = "DELETE_USER";

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

export const createUser = (user, history) => {
  return async (dispatch) => {
      const { data: created } = await Axios.post("/api/users", user);
      dispatch(_createUser(created));
      history.push("/");
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const response = await Axios.get("/api/users", {
          headers: {
            authorization: token,
          },
        });
        const data = response.data;
        console.log(data)
        dispatch(setUsers(data));
      }
    } catch (err) {
      next(err)
    }
  };
};

export const removeUser = (id, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await Axios.delete(`/api/users/${id}`, {
          headers: {
            authorization: token,
          }});
        dispatch(deleteUser(data));
        const { data:newData } = await Axios.get(`/api/users`, {
          headers: {
            authorization: token,
          }});
        dispatch(setUsers(newData));
        history.push("/users");
      }
    } catch (err) {}
  };
};

const initialState = [];
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case CREATE_USER:
      return [...state, action.user];
    case DELETE_USER:
      return state.filter((user) => {
        return user.id !== action.user.id;
      });
    default:
      return state;
  }
}
