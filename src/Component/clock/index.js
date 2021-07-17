import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
Clock.propTypes = {

};

function count (num){
    return num - 1;
}
function Clock(props) {
    const lever = sessionStorage.getItem("lever");
    var time = 180;
    if(lever === "2"){
        time = 540;
    }else if(lever === "3"){
        time = 900;
    }
    const [timeup, setTimeUp] = useState(time);

    useEffect(()=>{
        if(timeup>0){
            setTimeout(()=>{
                const timenew = count(timeup);
                setTimeUp(timenew);
            },1000);
        }
    })
    function showClock(){
        if(timeup>0){
            return (<div className="mx-2">
                <div className="ngoai">
                    <p className="trong" style={{
                        animation: `bg ${time}s 0s linear`
                    }}></p>
                </div>
                <p className="text-white" style={{
                    zIndex: 1000,
                    color: "white",
                    textAlign: "center"
                }}>
                    {`0${Math.floor(timeup/60)}`.slice(-2)}:{`0${Math.floor(timeup%60)}`.slice(-2)}</p>

            </div>)
        }else {
            return (
                <div>
                    het gio
                </div>
            )
        }
    }
    return (
        showClock()
    );
}

export default Clock;
