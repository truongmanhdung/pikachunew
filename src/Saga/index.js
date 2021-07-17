import {takeLatest, call, put, fork, take, all } from 'redux-saga/effects'
import * as types from './../Redux/Constant/types'
import * as leverType from '../Redux/Constant/lever'
import {updateLeverSuccess} from "../Redux/Actions/lever";
let checkRequest = 0;
let checkObj = [];
let checkHandle = [];

function* watcherClick() {
    while(true) {
        const action = yield take(types.checkTwoButton);
        yield fork(getTwoClick, action);
    }
}

var rows = 8;
var cols = 8;

const lever = sessionStorage.getItem("lever");
if(lever === "2"){
    rows = 12;
    cols = 12;
}else if(lever === "3"){
    rows = 16;
    cols = 16;
}else{
    rows = 8;
    cols = 8;
}

// return true la hết đường đi, thuc hien dao mang > va nguoc lai
const addSameId = (list) => {
    let flag = true; //Khoi tao mac dinh la het duong di ::!!
    for (let i = 0; i < rows*3; i++) {
        for (let j = 0; j < rows; j++) {
            for (let k = 0; k < cols; k++) {
                if (list[j][k].id === i && list[j][k].status === false) {
                    list[j][k].index = j;
                    list[j][k].indexItem = k;
                    checkHandle.push(list[j][k]);
                }
            }
        }
        if(!checkEndRoad(list)) {
            flag = false; // còn đường đi
            break;
        }
        checkHandle = [];
    }
    checkHandle = [];
    return flag; // return het đường đi
}

//return true la het duong di voi object chua cac con co cung id va nguoc lai :::))
const checkEndRoad = (list) => {
    for(let i = 0; i < checkHandle.length; i++){
        for(let j = i+1; j < checkHandle.length; j++){
            if(checkTwoPoint2(list, checkHandle[i].index, checkHandle[j].index, checkHandle[i].indexItem, checkHandle[j].indexItem, checkHandle[i], checkHandle[j])){
                return false;
            }
        }
    }
    return true;
}

const checkLineX = (list, x1, x2, y1, y2) => { //xét tọa độ ko của nó, nhìn hiểu
    let min = Math.min(y1, y2);
    let max = Math.max(y1, y2);
    if(x1 === x2) {
        for(let i = min; i <= max; i++) {
            if(!list[x1][i].status) {
                return false;
            }
        }
        return true;
    }
}

const checkLineY = (list, x1, x2, y1, y2) => {
    let min = Math.min(x1, x2);
    let max = Math.max(x1, x2);
    if(y1 === y2) {
        for(let i = min; i <= max; i++) {
            if(!list[i][y1].status) {
                return false;
            }
        }
        return true;
    }
}

const checkRectX = (list, pMin, pMax) => {
    if(pMin.indexItem > pMax.indexItem) {
        [pMin, pMax] = [pMax, pMin];
    }
    for(let y = pMin.indexItem + 1; y < pMax.indexItem; y++) {
        if (
            checkLineX(list, pMin.index, pMin.index, pMin.indexItem, y) &&
            checkLineY(list, pMin.index, pMax.index , y, y) &&
            checkLineX(list, pMax.index, pMax.index, y, pMax.indexItem)
        ) {
            return true;
        }
    }
    return false;
}

const checkRectY = (list, pMin, pMax) => {
    if(pMin.index > pMax.index) {
        [pMin, pMax] = [pMax, pMin];
    }
    for(let x = pMin.index + 1; x < pMax.index; x++) {
        if (
            checkLineY(list, pMin.index, x, pMin.indexItem, pMin.indexItem) &&
            checkLineX(list, x, x , pMin.indexItem, pMax.indexItem ) &&
            checkLineY(list, x, pMax.index , pMax.indexItem, pMax.indexItem)
        ) {
            return true;
        }
    }
    return false;
}

const checkMoreX = (list, type, pMin, pMax) => {
    if(pMin.indexItem > pMax.indexItem) {
        [pMin, pMax] = [pMax, pMin];
    }
    let y = pMax.indexItem;
    let row = pMin.index;
    if(type === -1){
        y = pMin.indexItem;
        row = pMax.index;
    }
    if(checkLineX(list, row, row, pMin.indexItem, pMax.indexItem)){
        while(list[pMin.index][y].status && list[pMax.index][y].status) {
            if(checkLineY(list, pMin.index, pMax.index, y, y)) {
                return true;
            }
            y += type;
            if (!list[pMin.index][y]) {
                return true;
            }
        }
    }
    return false;
}

const checkMoreY = (list, type, pMin, pMax) => {
    if(pMin.index > pMax.index) {
        [pMin, pMax] = [pMax, pMin];
    }
    let x = pMax.index;
    let col = pMin.indexItem;
    if(type === -1){
        x = pMin.index;
        col = pMax.indexItem;
    }
    if(checkLineY(list, pMin.index, pMax.index, col, col)) {
        while(list[x][pMin.indexItem].status && list[x][pMax.indexItem].status) {
            if(checkLineX(list, x, x, pMin.indexItem, pMax.indexItem)) {
                return true;
            }
            x += type;
            if (!list[x]) {
                return true;
            }
        }
    }
    return false;
}

const checkTwoPoint = (list, x1, x2, y1, y2, pMin, pMax) => {
    list[x1][y1].status = true;
    list[x2][y2].status = true;
    return checkLineX(list, x1, x2, y1, y2) ||
        checkLineY(list, x1, x2, y1, y2) ||
        checkRectX(list, pMin, pMax) ||
        checkRectY(list, pMin, pMax) ||
        checkMoreX(list, 1, pMin, pMax) ||
        checkMoreX(list, -1, pMin, pMax) ||
        checkMoreY(list, 1, pMin, pMax) ||
        checkMoreY(list, -1, pMin, pMax);
}

const checkTwoPoint2 = (list, x1, x2, y1, y2, pMin, pMax) => {
    list[x1][y1].status = true;
    list[x2][y2].status = true;
    if (checkLineX(list, x1, x2, y1, y2) ||
        checkLineY(list, x1, x2, y1, y2) ||
        checkRectX(list, pMin, pMax) ||
        checkRectY(list, pMin, pMax) ||
        checkMoreX(list, 1, pMin, pMax) ||
        checkMoreX(list, -1, pMin, pMax) ||
        checkMoreY(list, 1, pMin, pMax) ||
        checkMoreY(list, -1, pMin, pMax)) {
        return true;
    } else {
        list[x1][y1].status = false;
        list[x2][y2].status = false;
        return false;
    }
}

function* handleItem(list) {
    if(checkObj[0].id === checkObj[1].id &&
         list[checkObj[0].index][checkObj[0].indexItem]
          !== list[checkObj[1].index][checkObj[1].indexItem]) {
        const x1 = checkObj[0].index;
        const x2 = checkObj[1].index;
        const y1 = checkObj[0].indexItem;
        const y2 = checkObj[1].indexItem;
        const pMin = checkObj[0];
        const pMax = checkObj[1];
        if(checkTwoPoint(list, x1, x2, y1, y2, pMin, pMax)) {
            yield put({type: types.changStatusTrue, checkObj});
            // yield put({type: types.checkPointAdd, point});
        }
    }
    checkObj = [];
    checkRequest = 0;
}

function* getTwoClick(action) {
    let {item, list, point} = action;
    checkRequest++;
    item.index = action.index;
    item.indexItem = action.indexitem;
    checkObj.push(action.item);
    const newList1 = JSON.parse(JSON.stringify(list));
    if(addSameId(newList1)){
        yield put({type: types.handleArr})
    }
    const newList = JSON.parse(JSON.stringify(list));
    if(checkRequest === 2) {
        try {
            yield call(() => handleItem(newList, point));
        } catch(error) {
            console.log(error);
        }
    }
}
function* updateLeverSaga({payload}){
    const {lever} = payload;
    yield sessionStorage.setItem("lever",lever);
    yield put(updateLeverSuccess(lever));
}

function* rootSaga() {
    yield takeLatest(leverType.LEVER, updateLeverSaga);
    yield all([
        watcherClick(),
    ])
}

export default rootSaga;
