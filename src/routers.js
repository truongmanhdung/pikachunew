import React from "react";
import Content from "./Component/content/Content";
import ShowStart from "./Component/showstart/index"
import Level from "./Component/level";
import Help from "./Component/help";
const routes = [
    {
        path: "/startgame",
        exact: false,
        component: () => <Content/>,
    },
    {
        path: "/",
        exact: true,
        component: () => <ShowStart/>,
    },
    {
        path: "/startlevel",
        exact: false,
        component: () => <Level/>,
    },
    {
        path: "/help",
        exact: false,
        component: () => <Help/>,
    },




];

export default routes;
