const initialState = {
    cart : {
        items : [
            { title : 'BIG TASTY', qte : 1 }
        ]
    }
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart : {
                    items : [
                        { title : 'BIG TASTY'}
                    ]
                }
            };
        default:
            return state;
    }
};

export default cart;
