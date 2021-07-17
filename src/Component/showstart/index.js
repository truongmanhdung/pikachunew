import React from 'react';
import pikachu from '../../image/1.png';
import {Link} from "react-router-dom";
import logo from "../../image/bgd.jpg";

function StartView(props) {

    return (
        <div>
            <div className="text-center pb-5">
                <img src={logo} style={{
                    width: 300
                }} alt=""/>
            </div>
            <div className="row align-items-center">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="text-center">
                        <div className="m-3">
                            <Link to="/startgame" className="btn btn-primary">Chơi ngay</Link>
                        </div>
                        <div className="m-3">
                            <Link to="/startlevel" className="btn btn-info">Chọn level</Link>
                        </div>
                        <div className="m-3">
                            <Link className="btn btn-danger">Hướng dẫn</Link>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">
                    <img src={pikachu} style={{
                        width: "100%"
                    }} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default StartView;
