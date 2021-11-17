import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstatnt from '../constants/AuthConstant';

const AuthAction = {
  appInit: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstatnt.APP_IN_IT
    });
  },

  updateBreadCrumbList: (requestData) => {
    AppDispatcher.dispatch({
      actionType: AuthConstatnt.UPDATE_BREADCRUMB_LIST,
      requestData: requestData
    });
  },

  notifyBreadCrumbClick: (requestData) => {
    AppDispatcher.dispatch({
      actionType: AuthConstatnt.NOTIFY_BREADCRUMB_CLICK,
      requestData: requestData
    });
  }
};

export default AuthAction;
