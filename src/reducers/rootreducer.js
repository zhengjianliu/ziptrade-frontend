export default function rootreducer(state = {
  images: [],
  user: {}
}, action) {
    switch (action.type) {
  
      case 'UPLOAD_IMAGE':
        console.log({images: state.images.concat(action.payload.images)})
        return {images: state.images.concat(action.payload.images)}
      case 'USER_LOGIN':
        console.log({user:state.user})
        return {user: action.payload.user}
      case 'USER_LOGOUT':
        console.log({user:state.user})
        return {user:[],images:[]}
      // case 'CREATE_NEWLISTING':
      //   return {}
      default:
        return state;
  
    }
  };