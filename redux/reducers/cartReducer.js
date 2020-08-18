const initialState = {
    total: 10,
    totalPrice: 0,
    delivery: 10,
    items: [],
    cacheMenu: {}
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                items : [...state.items, action.payload],
                total : state.total + action.payload.price,
                totalPrice : state.totalPrice + action.payload.price
            };
        case 'DELETE_ITEM':
            return {
                ...state,
                items : state.items.filter(item => item.uid !== action.payload.uid),
                total : state.total - action.payload.price,
                totalPrice : state.totalPrice - action.payload.price
            };
        case 'ADD_QT_ITEM':
            return {
                ...state,
                items : state.items.map( item => {
                        if(item.uid === action.payload.uid){
                            return { ...item, qte: item.qte + 1 };
                        }
                        return item;
                }),
                total : state.total + action.payload.price,
                totalPrice : state.totalPrice + action.payload.price
            };
        case 'SUB_QT_ITEM':
            return {
                ...state,
                items : state.items.map( item => {
                    if(item.uid === action.payload.uid && (item.qte > 1)){
                        return { ...item, qte: item.qte - 1 };
                    }
                    return item;
                }),
                total : action.payload.qte > 1 ? state.total - action.payload.price : state.total,
                totalPrice : action.payload.qte > 1 ? state.totalPrice - action.payload.price : state.totalPrice
            };
        case 'EMPTY_CART':
            return {
                ...state,
                items : [],
                total : 10,
                totalPrice : 0
            };
        case 'PUSH_ORDER_CACHE':
            return {
                ...state,
                cacheMenu : action.payload
            };
        case 'CHECK_ITEM':
            return {
                ...state,
                cacheMenu : {...state.cacheMenu,
                                elements : state.cacheMenu.elements.map(element => {
                                            if(element.key === action.payload.elementKey){
                                                return {...element, items : element.items.map(item => {
                                                        if(!action.payload.checked && (item.key === action.payload.itemKey)){
                                                            return { ...item, checked: !item.checked };
                                                        }
                                                        return { ...item, checked: false };
                                                    })}
                                            }
                                            return element;
                                             })
                }
            };
        default:
            return state;
    }
};

export default cart;
