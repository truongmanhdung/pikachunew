import { combineReducers} from "redux";
import tasks from './list';
import lever from './lever';

const myReducer = combineReducers({
    tasks,
    lever
});

export default myReducer;
