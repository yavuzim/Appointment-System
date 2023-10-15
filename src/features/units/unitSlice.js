import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import unitService from './unitService'

const initialState = {
    units: [],
    selectedUnit: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const unitsGet = createAsyncThunk('unit/unitsGet', async (_, thunkAPI) => {
    try {
        return await unitService.unitsGet()
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const unitSlice = createSlice({
    name: 'unitSlice',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(unitsGet.pending, (state) => {
            state.isLoading = true
        }).addCase(unitsGet.fulfilled, (state, action) => {
            state.isLoading = true
            state.isSuccess = true
            state.units = action.payload
        })
    }
})

export const {reset}=unitSlice.actions
export default unitSlice.reducer