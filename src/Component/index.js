import React from 'react';
import PropTypes from 'prop-types';
import backgroud from "../image/bgd.jpg";
import {Route, Switch} from "react-router-dom";
import routers from "../routers";
import routes from "../routers";
Home.propTypes = {

};

function Home(props) {
    const showContent = (routes) => {
        let result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                );
            });
        }
        return <Switch>{result}</Switch>;
    };
    return (
        <div className="home p-5" style={{
            backgroundImage: `url(${backgroud})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100vh"
        }}>
            {showContent(routes)}
        </div>
    );
}

export default Home;
