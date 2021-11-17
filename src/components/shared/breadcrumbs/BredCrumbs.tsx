import React, { useEffect, useState } from "react";
import "./BredCrumbs.scss";
import { BaseProps } from "../../../model/BaseModel";
import AuthStore from "../../../stores/AuthStore";
import AuthAction from "../../../actions/AuthAction";

/* 
* TODO ::BreadCrumb component wich will render the input provided in array
* Consumer can be able to update the list by UPDATE_BREADCRUMB_LIST key 
* Consumer can get notify from the event key NOTIFY_BREADCRUMB_CLICK
* Note : refer BreedList component.
*/

interface BreadCrumbsProps extends BaseProps {
    aid?: '',
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = () => {

    const [breadCrumbList, setBreadCrumbList] = useState([]);

    const onBreadCrumbClickHandler = (link, index) => {
        if (index === 0 || breadCrumbList.length - 1 === index) {
            return;
        }
        AuthAction.notifyBreadCrumbClick({ apiKey: '', link: link });
    }

    const addBreadCrumbLink = (linkArray: Array<string>) => {
        setBreadCrumbList(linkArray);
    }
    
    useEffect(() => {
        AuthStore.addChangeListener('breadcrumb-list', addBreadCrumbLink);
        return () => {
            AuthStore.removeChangeListener('breadcrumb-list', addBreadCrumbLink);
        }
    }, [])

    const showBreadCrump = () => {
        if (breadCrumbList && breadCrumbList.length > 0) {
            return (breadCrumbList.map((obj, i) => {
                const lastlength = breadCrumbList.length - 1;
                return (
                    <span key={"br" + i} onClick={onBreadCrumbClickHandler.bind(null, obj, i)} className={lastlength !== i ? "active" : ""}>{obj}
                        {lastlength !== i ? <i className="fas fa-chevron-right"></i> : null}
                    </span>
                )
            })
            )
        }
    }

    return (
        <div className="breadcrumb-container">
            <div className="breadcrumb-wrapper clearfix">
                {showBreadCrump()}
            </div>
        </div>
    )
};
export default BreadCrumbs;