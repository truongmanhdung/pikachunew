import * as leverTypes from '../Constant/lever';

const initialState = {
    lever: "1"
};

const myReduces = (state = initialState, action)=>{
    switch(action.type){
        case leverTypes.LEVER_SUCCESS: {
            const lever = sessionStorage.getItem("lever");
            return {
                ...state,
                lever
            };
        }
        default:
            return state;
    };
};

export default myReduces;
