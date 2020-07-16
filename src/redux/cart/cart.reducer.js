import CartActionTypes from './cart.types';
import {addItemToCart} from './cart.utils';
const INITIAL_STATE={
    hidden: true,
    cartItmes:[]
};
const CartReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEM:
            return{
                ...state,
                cartItmes:addItemToCart(state.cartItmes,action.payload)
            }
        default:
            return state
    }
}

export default CartReducer;