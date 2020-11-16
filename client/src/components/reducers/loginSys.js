import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'loginSys',
    initialState: {
        userName: '',
        userEmail: '',
        userPass: '',
        regModal: false,
        logModal: false,
        verified: false,
        isEditing: false,
    },
    reducers: {
        addUserData: (state, action) => {
            state.userName = action.payload.login
            state.userPass = action.payload.pass
        },
        setMail: (state, action) => {
            state.userEmail = action.payload
        },
        showRegModal: (state, action) => {
            state.regModal = action.payload
        },
        showLogModal: (state, action) => {
            state.logModal = action.payload
        },
        setVerified: (state, action) => {
            state.verified = action.payload
        },
        setEditing: (state, action) => {
            state.isEditing = action.payload;
        }
    }
});
export default slice.reducer;
export const { addUserData, showRegModal, showLogModal, setVerified, setMail, setEditing } = slice.actions;
export const isRegister = state => state.loginSys.regModal;
export const isLogin = state => state.loginSys.logModal;
export const getUserName = state => state.loginSys.userName;
export const getEmail = state => state.loginSys.userEmail;
export const getPass = state => state.loginSys.userPass;
export const getVerify = state => state.loginSys.verified;
export const getEditing = state => state.loginSys.isEditing;