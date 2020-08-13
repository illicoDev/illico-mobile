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
                cart : {
                    items : [
                        ...state.cart.items,
                        { title : action.item.title, qte:action.item.qte}
                    ]
                }
            };
        default:
            return state;
    }
};

export default cart;
