import { createSlice } from '@reduxjs/toolkit';


export const dataManagment = createSlice({
    name: 'dataManagment',
    initialState: {
        fetchedData: undefined,
    },
    reducers: {
        setFetchedData: (state, action) => {
            state.fetchedData = action.payload
        },
    }
})

export default dataManagment.reducer;
export const { setFetchedData } = dataManagment.actions
export const getFetchedData = state => state.dataManagment.fetchedData;