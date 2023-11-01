import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import kullaniciService from './kullaniciService'

const initialState = {
    kullanici: null,
    message: ""
}

export const loginGoogle = createAsyncThunk('kullanici/loginGoogle', async (veri, thunkAPI) => {
    console.log('login giriş');
    try {
        return await kullaniciService.googleLogin()
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const kullaniciSlice = createSlice({
    name: 'kullanici',
    initialState,
    reducers: {
        reset: (state) => {
            state.kullanici = null
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginGoogle.fulfilled, (state, action) => {
                state.kullanici = action.payload
            })
            .addCase(loginGoogle.rejected, (state, action) => {
                state.message = action.payload
                state.kullanici = null
            })
    }
})

export const { reset } = kullaniciSlice.actions
export default kullaniciSlice.reducer