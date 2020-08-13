const initialState = {
  currentAddress: {address:null},
  addresses: []
};

const addressBook = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ADDRESS':
      return {
        ...state,
        currentAddress: {address:action.address}
      };
    default:
      return state;
  }
};

export default addressBook;
