import { SET_NAME, SET_EMAIL, GET_USERS} from "./types";
const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => {
    try{
        return async dispatch => {
            const result = await fetch(API_URL);
            const data = await result.json();
            if(data){
                dispatch({
                    type: GET_USERS,
                    payload: data
                })
            } else {
                console.log('Error')
            }
        }
    }
    catch (error){
        console.log('Error')
    }
}

export const setName = name => dispatch => {
    dispatch({ 
        type: SET_NAME,
        payload: name
    })
}

export const setEmail = email => dispatch => {
    dispatch({
        type: SET_EMAIL,
        payload: email
    })
}

