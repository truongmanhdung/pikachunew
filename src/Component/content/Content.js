import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../Redux/Actions/index'
import Clock from "../clock/index";
import { Link } from "react-router-dom";
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkHandler: 10,
            time: 730,
            checkReset: 'off',
        }
    }

    resetGame = (checkReset) => {
        this.setState({
            checkReset: checkReset,
        })
    }

    checkHandleArrSwap = (list) => {
        const { checkSwapArr } = this.props;
        const { checkHandler } = this.state;
        let handleLimit = checkHandler - 1;
        this.setState({
            checkHandler: handleLimit,
        })
        if (handleLimit < 0) {
            alert("HẾT LƯỢT ĐẢO");
            this.setState({
                checkHandler: 0,
            })
        } else {
            checkSwapArr(list);
        }
    }

    handleTime = () => {
        setInterval(() => {
            this.setState((prevState) => ({
                time: prevState.time - 1,
            }))
        }, 1000);
    }

    changeStatusItem = (arr, list, item, index, indexitem) => {
        console.log(arr);
        console.log(list);
        console.log(item);
        console.log(index);
        console.log(indexitem);
        const { checkButtonClick } = this.props;
        checkButtonClick(arr, list, item, index, indexitem);

    }
   

    render() {
        const lever = sessionStorage.getItem("lever");
        var a = 84;
        var b = "Dễ"
        if(lever === "2"){
            a = 56;
            b = "Trung bình"
        }else if(lever === "3"){
            a = 42;
            b = "Khó"
        }else{
            a = 84;
        }
        const { list } = this.props;
        const { checkHandler, time, checkReset } = this.state;
        const showIcon = list.map((arr, index) => {
            return (
                <div key={index}>
                    {arr.map((item, indexitem) => {
                        if (checkReset === 'on') {
                            item.status = false;
                        }
                        return (
                            <div key={indexitem} style={item.status === false ? {} : { opacity: 0 }}>
                                <div className="focusIcon p-2 bg-light"
                                    style={{ width: a, height: a, boxSizing: "border-box", border: '1px solid', cursor: "pointer" }}
                                    onClick={() => this.changeStatusItem(arr, list, item, index, indexitem)} disabled={item.status}>
                                    <img style={{ width: "100%" }} src={item.img} alt='error' />
                                </div>
                            </div>
                        )
                    })}
                </div>)
        })
        return (
            <div>
                <div className="d-flex justify-content-around"
                    style={{ width: "1000px", margin: "0px auto", marginBottom: 0 }}>
                    <div className="text-center">
                        <h1 style={{
                            color: "rgb(253, 125, 74)"
                        }}>Mức độ</h1>
                        <h1 style={{
                            color: "yellow",
                            fontWeight: "bold"
                        }}>{b}</h1>
                        <h1 style={{
                            color: "rgb(253, 125, 74)"

                        }}>Lượt đổi</h1>
                        <h1 style={{
                            color: "yellow",
                            fontWeight: "bold"
                        }}>{checkHandler}</h1>
                        <h1 style={{
                            color: "rgb(253, 125, 74)"
                        }}>Điểm</h1>
                        <h1 style={{
                            color: "yellow",
                            fontWeight: "bold"
                        }}>0</h1>
                    </div>
                    <div className="body_game d-flex flex-wrap" style={{
                        width: 672,
                        height: 672,
                        margin: "0 auto"
                    }}>
                        {showIcon}
                    </div>
                    <Clock />
                </div>
                <div className="d-flex ps-3" style={{
                    justifyContent: "space-between",
                    width: "600px",
                    alignItems: "center",
                    margin: "10px auto",
                }}>
                    <div className="d-flex align-items-center">
                        <i style={{
                            color: "yellow"
                        }} className="fas fa-volume-up">
                        </i>
                        <h5 style={{
                            color: "rgb(253, 125, 74)"
                        }} className="m-0 mx-2">Tắt âm thanh</h5>
                    </div>
                    <div className="d-flex align-items-center" onClick={this.checkHandleArrSwap}>
                        <i style={{
                            color: "yellow"
                        }} className="fas fa-sync-alt">
                        </i>
                        <h5 style={{
                            color: "rgb(253, 125, 74)"
                        }} className="m-0 mx-2">Đổi vị trí</h5>
                    </div>
                    <div className="d-flex align-items-center" onClick={()=>this.resetGame(true)}>
                        <i style={{
                            color: "yellow"
                        }} className="fas fa-building">
                        </i>
                        <h5 style={{
                            color: "rgb(253, 125, 74)"
                        }} className="m-0 mx-2">Chơi lại</h5>
                    </div>
                    <Link to="/" style={{textDecoration: "none"}} className="d-flex align-items-center">
                        <i style={{
                            color: "yellow"
                        }} className="fas fa-building">
                        </i>
                        <h5 style={{
                            color: "rgb(253, 125, 74)"
                        }} className="m-0 mx-2">Trang chủ</h5>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.tasks,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        newState: (index, indexitem) => dispatch(action.changeStatusIcon(index, indexitem)),
        checkButtonClick: (arr, list, item, index, indexitem, point) => dispatch(action.checkButton(arr, list, item, index, indexitem, point)),
        checkSwapArr: (list) => dispatch(action.swapArr(list)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
