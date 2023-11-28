import axios from "axios";

const GET_COMMUNITY_REQUEST = "get community"
const GET_COMMUNITY_ERROR = "error to get community data"
const GET_COMMUNITY_SUCCESS = "successfully get the data"

export const get_community_data = () => async (dispatch)=>{
    dispatch({type:GET_COMMUNITY_REQUEST});
    try {
        const res = await axios.get(`https://heritage-u8vo.onrender.com/community`);
        dispatch({type:GET_COMMUNITY_SUCCESS,payload:res.data})
    } catch (error) {
        dispatch({type:GET_COMMUNITY_ERROR,payload:error.message})
    }

}