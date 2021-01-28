import { ADD_TO_BASKET, EMPTY_BASKET, REMOVE_FROM_BASKET, SET_USER } from "./ActionTypes"

export const initialState = {
    user: null,
    basket: []
}

export const getBasketTotal = basket => basket?.reduce((sum, item) => sum + item.price, 0);

const reducer = (state, action) => {
    switch(action.type) {
        case ADD_TO_BASKET:
            return {
                ...state, 
                basket: [...state.basket, action.item]
            };
        case REMOVE_FROM_BASKET:
            // Returns the ID of the first item that matches 
            const index = state.basket.findIndex(basketItem => basketItem.id === action.id); 
            let newBasket = [...state.basket];
            if(index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id: ${action.id}) as it's not in the basket!`);
            }
            return {
                ...state,
                basket: newBasket
            }
        case SET_USER:
            return {
                ...state, 
                user: action.user
            };
        case EMPTY_BASKET:
            return {
                ...state, 
                basket: []
            };
        default:
            return state;
    }
}   

export default reducer;