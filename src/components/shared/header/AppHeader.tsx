import React from "react";
import "./AppHeader.scss";
import { BaseProps } from "../../../model/BaseModel";

/* 
* TODO ::APP header component to dispaly loggo and to demonotrate the theme change options
* Based on this approach we can enable the user to change the Theme as per the ueser choic by following below steps
* 1) Place holder for Theme CRUD operations. 
*       Them can be created with  input colors from primaty-color, primary-text-color ect..
* 2) Provision to apply a Them
* 3) Provison to get a current them for logged in user.
* 4) Response we update to root css variables.
* Note : any color can be used in system must and should define a varible and use them.
*/

interface HeaderProps extends BaseProps {
    aid?: "app-header"
}

const AppHeader: React.FC<HeaderProps> = (props: HeaderProps) => {

    const changeTheme = (color) => {
        const root = document.querySelector(':root') as HTMLElement;
        root.style.setProperty('--primary-color', color);
    }

    return (
        <div className="app-header" id={props.aid}>
            <div className="container">
                <strong>CSWEB</strong>
                <div className="right"><span className="red" onClick={changeTheme.bind(this,'#970303')}>Theme</span> <span className="default" onClick={changeTheme.bind(this,'#1776BF')}>Default</span></div>
            </div>
        </div>
    );
};
export default AppHeader;