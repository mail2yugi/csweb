import AppDispatcher from '../dispatcher/AppDispatcher';
import CatsConstatnt from '../constants/CatsConstant';

const CatsAction = {
  getListOfBreeds: (requestData) => {
    AppDispatcher.dispatch({
      actionType: CatsConstatnt.GET_BREEDS_LIST,
      requestData: requestData
    });
  },

  getBreedDetails: (requestData) => {
    AppDispatcher.dispatch({
      actionType: CatsConstatnt.GET_BREED_DETAILS,
      requestData: requestData
    });
  },
};

export default CatsAction;
