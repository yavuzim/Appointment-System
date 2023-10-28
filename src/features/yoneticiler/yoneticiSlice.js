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

export const bilgilerGetir = createAsyncThunk('yonetici/bilgilerGetir', async (uid, thunkAPI) => {
    try {
        return await yoneticiService.yoneticiBilgilerGetir(uid)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const cikisYap = createAsyncThunk('yonetici/cikisYap', async (_,thunkAPI) => {
    try {
        return await yoneticiService.cikisYap()
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
            .addCase(bilgilerGetir.pending, (state) => {
                state.isLoading = true
            })
            .addCase(bilgilerGetir.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.yonetici = action.payload
            })
            .addCase(bilgilerGetir.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.yonetici = null
            })
            .addCase(cikisYap.pending, (state) => {
                state.isLoading = true
            })
            .addCase(cikisYap.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.yonetici = action.payload
            })
            .addCase(cikisYap.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.yonetici = null
            })
    }
})

export const { reset } = yoneticiSlice.actions
export default yoneticiSlice.reducer