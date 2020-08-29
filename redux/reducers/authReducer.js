const initialState = {
  isLoading: true,
  isSignedIn: false,
  currentUser: null,
  addresses:
      {
        pickupAddress:{
          address:null,
          coords:{latitude:null,longitude:null},
          additionalInfo:null,
        },
        deliveryAddress:{
          address:null,
          coords:{latitude:null,longitude:null},
          additionalInfo:null,
        },
      }
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        isLoading: false
      };

    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        currentUser: null,
        isLoading: false
      };
    case "SET_DELIVERY_ADDRESS":
      return {
        ...state,
        addresses:
            {
              ...state.addresses,
              deliveryAddress:action.payload,
            }
      };
    case "SET_PICKUP_ADDRESS":
      return {
        ...state,
        addresses:
            {
              ...state.addresses,
              pickupAddress:action.payload,
            }
      };
    default:
      return state;
  }
};

export default auth;
