export default function rootreducer(state = {
  images: [],
  user: []
}, action) {
    switch (action.type) {
  
      case 'UPLOAD_IMAGE':
        console.log({images: state.images.concat(action.payload.images)})
        return {images: state.images.concat(action.payload.images)}
      case 'USER_LOGIN':
        console.log({user: state.user.concat(action.payload.user)})
        return {user: state.user.concat(action.payload.user)}
      default:
        return state;
  
    }
  };