import axios from 'axios'
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL, CLEAR_ERRORS } from '../constant/productConstants'

export const getProducts = () => async (dispatch)=>{
    try {
        dispatch({
            type : ALL_PRODUCT_REQUEST
        })
        const data  = await axios.get("/api/v1/products");
        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch ({
            type : ALL_PRODUCT_FAIL,
            payload : error.response.data.message
        })

    }

}
// only used function to clear the errors in the store 
export const clearErrors = () => async (dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
}
