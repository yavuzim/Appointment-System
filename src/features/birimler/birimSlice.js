import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import birimService from './birimService'

const initialState = {
    birimler: [],
    secilenBirim: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const birimlerGetir = createAsyncThunk('birim/birimlerGetir', async (_, thunkAPI) => {
    try {
        return await birimService.birimlerGetir()
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const birimSec = createAsyncThunk('birim/birimSec', async (id, thunkAPI) => {
    try {
        return await birimService.secilenBirimGetir(id)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const birimSlice = createSlice({
    name: 'birimSlice',
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
        builder.addCase(birimlerGetir.pending, (state) => {
            state.isLoading = true
        }).addCase(birimlerGetir.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.birimler = action.payload
        }).addCase(birimSec.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
        }).addCase(birimSec.fulfilled, (state, action) => {
            state.secilenBirim = action.payload
            state.isLoading = false
            state.isSuccess = true
        }).addCase(birimSec.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.secilenBirim = null
        })
    }
})

export const { reset } = birimSlice.actions
export default birimSlice.reducer