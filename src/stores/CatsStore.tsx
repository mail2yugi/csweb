import AppDispatcher from '../dispatcher/AppDispatcher';
import CatsConstant from '../constants/CatsConstant';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import CatsApi from '../api/CatsApi';
import { toast } from 'react-toastify';

/* 
* TODO ::Always create a UI model and map response model to UI Model and return the converted model to component
*/

const CatsStore = assign({}, EventEmitter.prototype, {
    emitChange: function (event, data) {
        this.emit(event, data);
    },

    addChangeListener: function (event, callback) {
        return this.on(event, callback);
    },

    removeChangeListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    emitBreedsList: function (response) {
        // API Should return alwasy the needed metadata in list 
        this.emit('breed-list', response);
    },

    emitBreedsListError: function (response) {
        // API Should return alwasy the needed metadata in list 
        this.emit('breed-list-error', response);
    },

    emitBreedDetails: function (response) {
        this.emit('breed-details', response);
    },

    emitBreedDetailsError: function (response) {
        this.emit('breed-details-error', response);
    },
});
AppDispatcher.register((action) => {
    switch (action.actionType) {
        case CatsConstant.GET_BREEDS_LIST:
            CatsApi.getBreedList(action.requestData).then((res) => {
                CatsStore.emitBreedsList(res.data);
            }, (error) => {
                toast("Failed to load data");
                CatsStore.emitBreedsListError(error);
            });
            break;
        case CatsConstant.GET_BREED_DETAILS:
            CatsApi.getBreedDetails(action.requestData).then((res) => {
                CatsStore.emitBreedDetails(res.data);
            }, (error) => {
                toast("Failed to load data");
                CatsStore.emitBreedDetailsError(error);
            });
            break;
        default://no op
    }
});

export default CatsStore;
