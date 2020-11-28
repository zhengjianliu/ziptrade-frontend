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
        items: [],
        favorites: [],
        loggedin: false
      }
    case 'UPDATE_USER':
      return{...state.user, user:action.updateduser}
    case 'ADD_ITEM':
      return {...state, items: [...state.items, action.data]}
    case 'DELETE_ITEM':
    const items = state.items.filter(item=> item.id!== action.deletedItem.id)
      return {...state, items:items}
    case 'ADD_FAVORITE':
      return{...state, favorites:[...state.favorites, action.data]}
    case 'UNLIKE':
      const favorites = state.favorites.filter(favorite=> favorite.id !== action.unlike.id)
      return {...state, favorites:favorites}
    default:
      return state;
  }
};
