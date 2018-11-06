
export default rootReducer;

function rootReducer(state, action) {
  switch(action.type) {
    case 'SET_DEVICES':
    return { ...state, devices: action.data }
        
    case 'SET_ENTORNOS':
    return { ...state, entornos: action.data }
    
    default:
    return { ...state }
  }
}
