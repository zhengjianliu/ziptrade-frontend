const initialState = {
  user: {},
  items: [],
  favorites: [],
  loggedin: false
}
export default function rootreducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        user: action.payload.user,
        items: action.payload.user.items,
        favorites: action.payload.user.favorites,
        loggedin: true
      }
    case 'USER_LOGOUT':
      return {
        user: {},
        loggedin:false
      }
    case 'ADD_ITEM':
      console.log({...state, items: [...state.items, action.data]})
      return {...state, items: [...state.items, action.data]}
    default:
      return state;
  }
};
