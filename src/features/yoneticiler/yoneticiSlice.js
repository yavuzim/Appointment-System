import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import yoneticiService from './yoneticiService'

const initialState = {
    yonetici: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
export const login = createAsyncThunk('yonetici/login', async (veri, thunkAPI) => {
    try {
        return await yoneticiService.login(veri.email, veri.parola)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})
export const yoneticiSlice = createSlice({
    name: 'yoneticiSlice',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.yonetici = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.yonetici = null
            })
    }
})

export const { reset } = yoneticiSlice.actions
export default yoneticiSlice.reducer