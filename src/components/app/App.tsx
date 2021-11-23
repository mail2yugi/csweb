import React, { useEffect, useState } from "react";
import "./styles.scss";
import 'react-toastify/dist/ReactToastify.css';
import AuthAction from "../../actions/AuthAction";
import AuthStore from "../../stores/AuthStore";
import AppHeader from "../shared/header/AppHeader";
import Pages from "../pages/pages";
import BreadCrumbs from "../shared/breadcrumbs/BredCrumbs";
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {

    const [appKey, setAppKey] = useState('');

    const appInIt = (res) => {
        setAppKey(res.apiKey);
    }

    useEffect(() => {
        AuthStore.addChangeListener('app-in-it', appInIt);
        AuthAction.appInit();
        return () => {
            AuthStore.removeChangeListener('app-in-it', appInIt);
        }
    }, [])

    return (
        <div className="app">
            <ToastContainer />
            <AppHeader apiKey={appKey} />
            <BreadCrumbs apiKey={appKey} />
            <Pages apiKey={appKey} />
        </div>
    );
};
export default App;