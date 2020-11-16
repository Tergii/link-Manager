import { configureStore } from '@reduxjs/toolkit';
import slice from '../reducers/loginSys';
import dataManagment from '../reducers/dataManagment';

export default configureStore({
    reducer: {
        loginSys: slice,
        dataManagment,
    }
})