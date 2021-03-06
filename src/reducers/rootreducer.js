const initialState = {
  user: {},
  items: [],
  favorites: [],
  loggedin: false,
  currentItem: [],
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
      return{...state, user:action.newUserInfo}
    case 'ADD_ITEM':
      return {...state, items: [...state.items, action.data]}
    case 'UPDATE_EDITED_ITEM':
      let editedItemIdx = ""
      state.items.forEach((item,idx)=>{
        if(item.id === state.currentItem.id){
          editedItemIdx = idx
        }
      })
      let newItems = state.items
      newItems.splice(editedItemIdx,1,action.updatedItem)
      return {...state, items: newItems}

    case 'DELETE_ITEM':
    const items = state.items.filter(item=> item.id!== action.deletedItem.id)
      return {...state, items:items}
    case 'CURRENT_ITEM':
      return {...state, currentItem: action.selectedItem}
    case 'ADD_FAVORITE':
      return{...state, favorites:[...state.favorites, action.data]}
    case 'UNLIKE':
      const favorites = state.favorites.filter(favorite=> favorite.id !== action.unlike.id)
      return {...state, favorites:favorites}
    default:
      return state;
  }
};
