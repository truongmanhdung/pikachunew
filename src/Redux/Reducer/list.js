import { api1,api2,api3 } from "../../apis/pikachu";
import * as types from "../Constant/types";

const lever = sessionStorage.getItem("lever");
var init = api1;
var cols = 8;
var rows = 8;
if(lever === "2"){
    init = api2;
    cols = 12;
    rows = 12;
}else if(lever === "3"){
    init = api3;
    cols = 16;
    rows = 16;
}else{
    init = api1;
    cols = 8;
    rows = 8;
}

var limit = 4;

const setState = (initialState) => {
    for(let i = 0; i < cols; i++) {
        const random = Math.floor(Math.random() * init.length);
        const item = init[random];
        initialState.push ({
            id: item.id,
            status: false,
            img: item.image,
            check: item.check
        });
        item.check++;
        if(item.check === limit) {
            init.splice(random, 1);
        }
    }
    return initialState;
}

const setStateTwo = (initialStateTwo) => {
    for(let i = 0; i < rows; i++) {
        const array = setState([]);
        initialStateTwo.push(array);
    }
    return initialStateTwo;
}

const newState = setStateTwo([]);
let mount = 0;


const tasks = (state = newState , action) => {
    switch (action.type){
        case types.viewList:
            return state;
        case types.changeStatus:
            state[action.index][action.indexitem].status = !state[action.index][action.indexitem].status;
            return [...state];
        case types.checkTwoButton:
            return [...state];
        case types.changStatusTrue:
            state[action.checkObj[0].index][action.checkObj[0].indexItem].status = true;
            state[action.checkObj[1].index][action.checkObj[1].indexItem].status = true;
            return [...state];
        case types.handleArr:
            const newStateSwap = [];
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if(state[i][j].status === false) {
                        newStateSwap.push(state[i][j]);
                    }
                }
            }
            for (let i = newStateSwap.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newStateSwap[i], newStateSwap[j]] = [newStateSwap[j], newStateSwap[i]];
            }
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (state[i][j].status === false) {
                        state[i][j] = newStateSwap[0];
                        newStateSwap.splice(0, 1);
                    }
                }
            }
            return [...state];
        default: return state;
    }
}

export default tasks;
