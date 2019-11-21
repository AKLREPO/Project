import _ from "lodash";
import jsonPlaceHolder from "../apis/jsonplaceHolder";

export const fetchPostsandUsers = () =>  async (dispatch, getState) => {

    await dispatch(fetchPosts());
    
    const userIds = _.uniq(_.map(getState().posts, "userId"));
    userIds.forEach(id => dispatch(fetchUser(id)));

}

export const fetchPosts =  () => {
    console.log("Started calling action");
    //getstate can be omitted
    //returns a function using async and await
    return async (dispatch, getState) => {
        const promise = await jsonPlaceHolder.get("/posts");
        
        dispatch({
            type: "FETCH_POSTS",
            payload: promise.data
        });

    }
};


export const fetchUser = (id) => async (dispatch) => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch(
    {
            type:"FETCH_USER",
            payload: response.data
    });

};


/*

const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch(
    {
            type:"FETCH_USER",
            payload: response.data
    });

});
*/
