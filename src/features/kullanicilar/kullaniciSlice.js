import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import kullaniciService from './kullaniciService'

const initialState = {
    kullanici: null,
    randevuSaatler: [],
    kisiRandevular: [],
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
export const kullaniciDoldur = createAsyncThunk('kullanici/kullaniciDoldur', async (_, thunkAPI) => {
    try {
        return await kullaniciService.kullaniciDoldur()
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const tarihlerGetir = createAsyncThunk('kullanici/tarihlerGetir', async (veri, thunkAPI) => {
    try {
        return await kullaniciService.saatleriFormatla(veri)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const randevuOlustur = createAsyncThunk('kullanici/randevuOlustur', async (veri, thunkAPI) => {
    try {
        return await kullaniciService.randevuOlustur(veri)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const randevularGetir = createAsyncThunk('kullanici/randevularGetir', async (veri, thunkAPI) => {
    try {
        return await kullaniciService.randevularGetir(veri)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const cikisYap = createAsyncThunk('kullanici/cikisYap', async (_, thunkAPI) => {
    try {
        return await kullaniciService.cikisYap()
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
            .addCase(kullaniciDoldur.fulfilled, (state, action) => {
                state.kullanici = action.payload
            })
            .addCase(kullaniciDoldur.rejected, (state, action) => {
                state.message = action.payload
                state.kullanici = null
            })
            .addCase(tarihlerGetir.fulfilled, (state, action) => {
                state.randevuSaatler = action.payload
            })
            .addCase(tarihlerGetir.rejected, (state, action) => {
                state.message = action.payload
                state.randevuSaatler = []
            })
            .addCase(randevuOlustur.fulfilled, (state, action) => {
                state.message = action.payload
            })
            .addCase(randevuOlustur.rejected, (state, action) => {
                state.message = action.payload
            })
            .addCase(randevularGetir.fulfilled, (state, action) => {
                state.kisiRandevular = action.payload
            })
            .addCase(randevularGetir.rejected, (state, action) => {
                state.message = action.payload
            })
            .addCase(cikisYap.fulfilled, (state, action) => {
                state.kullanici = action.payload
            })
            .addCase(cikisYap.rejected, (state, action) => {
                state.message = action.payload
                state.kullanici = null
            })

    }
})

export const { reset } = kullaniciSlice.actions
export default kullaniciSlice.reducer