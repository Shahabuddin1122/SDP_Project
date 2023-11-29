import axios from "axios";

const GET_NOTIFICATION_REQUEST = "get notification"
const GET_NOTIFICATION_ERROR = "error to get notification"
const GET_NOTIFICATION_SUCCESS = "successfully get the data"

export const get_notification_request = (id) => async (dispatch)=>{
    dispatch({type:GET_NOTIFICATION_REQUEST});
    try {
        const res = await axios.get(`https://heritage-u8vo.onrender.com/notifications/${id}`);
        dispatch({type:GET_NOTIFICATION_SUCCESS,payload:res.data})
    } catch (error) {
        dispatch({type:GET_NOTIFICATION_ERROR,payload:error.message})
    }

}
export const notification_delete = (id) => async (dispatch)=>{
    dispatch({type:GET_NOTIFICATION_REQUEST});
    try {
        const res = await axios.delete(`https://heritage-u8vo.onrender.com/notifications/${id}`);
        dispatch({type:GET_NOTIFICATION_SUCCESS,payload:res.data})
    } catch (error) {
        dispatch({type:GET_NOTIFICATION_ERROR,payload:error.message})
    }

}
