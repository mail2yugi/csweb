import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstant';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import * as appConfig from '../assets/config.json';

const AuthStore = assign({}, EventEmitter.prototype, {
    emitChange: function (event, data) {
        this.emit(event, data);
    },

    addChangeListener: function (event, callback) {
        return this.on(event, callback);
    },

    removeChangeListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    emitAppInitializerData: function (response) {
        this.emit('app-in-it', response);
    },

    emitUpdateBreadCrumbList: function (response) {
        this.emit('breadcrumb-list', response);
    },

    notifyBreadCrumbClick: function (response) {
        this.emit('notify-breadcrumb-click', response);
    },
});
AppDispatcher.register((action) => {
    switch (action.actionType) {
        case AuthConstants.APP_IN_IT:
            /* 
            * TODO ::Always Load configuration from the API and set to app initilize.
            */
            // AuthApi.getAppKey().then((res) => {
            //     AuthStore.emitAppInitializerData(appConfig);
            // });
            AuthStore.emitAppInitializerData(appConfig);
            break;
        case AuthConstants.UPDATE_BREADCRUMB_LIST:
            AuthStore.emitUpdateBreadCrumbList(action.requestData.links);
            break;
        case AuthConstants.NOTIFY_BREADCRUMB_CLICK:
            AuthStore.notifyBreadCrumbClick(action.requestData.link);
            break;
        default://no op
    }
});

export default AuthStore;
