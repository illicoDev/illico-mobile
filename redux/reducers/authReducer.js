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
              deliveryAddress:{
                  address:action.payload.address,
                  coords:{latitude:action.payload.coords.latitude,longitude:action.payload.coords.longitude},
                  additionalInfo:action.payload.additionalInfo,
              },
            }
      };
    case "SET_PICKUP_ADDRESS":
      return {
        ...state,
        addresses:
            {
              ...state.addresses,
              pickupAddress:{
                  address:action.payload.address,
                  coords:{latitude:action.payload.coords.latitude,longitude:action.payload.coords.longitude},
                  additionalInfo:action.payload.additionalInfo,
              },
            }
      };
      case "SET_PHONE_NUMBER":
          return {
              ...state,
              currentUser:
                  {
                      ...state.currentUser,
                      phoneNumber:action.payload,
                  }
          };
      case "SET_NAME":
          return {
              ...state,
              currentUser:
                  {
                      ...state.currentUser,
                      name:action.payload,
                  }
          };
    default:
      return state;
  }
};

export default auth;
