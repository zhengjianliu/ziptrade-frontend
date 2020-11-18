export default function rootreducer(state = {images: []}, action) {
    switch (action.type) {
  
      case 'UPLOAD_IMAGE':
        return {
          ...state,
          images: [...state.images, action.images]
        }
  
      default:
        return state;
  
    }
  };