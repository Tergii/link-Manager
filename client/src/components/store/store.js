import { configureStore } from '@reduxjs/toolkit';
import slice from '../reducers/loginSys';

export default configureStore({
    reducer: {
        loginSys: slice
    }
})