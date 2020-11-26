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
    console.log(state)
      return {
        user: {},
        items: [],
        favorites: [],
        loggedin: false
      }
    case 'ADD_ITEM':
      return {...state, items: [...state.items, action.data]}
    case 'ADD_FAVORITE':
      return{...state, favorites:[...state.favorites, action.data]}
    case 'UNLIKE':
      const favorites = state.favorites.filter(favorite=> favorite.id !== action.id.id)
      console.log(favorites, action.id)
      return {...state, favorites:favorites}
    default:
      return state;
  }
};
