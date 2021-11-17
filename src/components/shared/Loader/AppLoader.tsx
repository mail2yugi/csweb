import React from "react";
import "./AppLoader.scss"

/* 
* TODO ::Plain flug and pay component to represent the loading time of app
*/
const AppLoader: React.FC = () => {

    return (
        <div className="loading">
            <div className="loader"></div>
        </div>

    );
};
export default AppLoader;