import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import yoneticiService from './yoneticiService'

const initialState = {
    yonetici: null,
    moderatorler: [],
    yetkililer: [],
    randvular: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    moderatorAtamaMesaj: ''
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

export const cikisYap = createAsyncThunk('yonetici/cikisYap', async (_, thunkAPI) => {
    try {
        return await yoneticiService.cikisYap()
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const moderatorlerGetir = createAsyncThunk('yonetici/moderatorlerGetir', async (_, thunkAPI) => {
    try {
        return await yoneticiService.moderatorlerGetir()
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const birimeModeratorAta = createAsyncThunk('yonetici/birimeModeratorAta', async (veri, _, thunkAPI) => {
    try {
        return await yoneticiService.birimeModeratorAta(veri.moderator, veri.birim)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const birimModeratorlerGetir = createAsyncThunk('yonetici/birimModeratorlerGetir', async (_, thunkAPI) => {
    try {
        return await yoneticiService.birimModeratorlerGetir()
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const son10birimRandevularGetir = createAsyncThunk('yonetici/son10birimRandevularGetir', async (birimId, thunkAPI) => {
    try {
        return await yoneticiService.son10birimRandevularGetir(birimId)
    } catch (error) {
        const message = error.message
        return thunkAPI.rejectWithValue(message)
    }
})
export const durumGuncelle = createAsyncThunk('yonetici/durumGuncelle', async (veri, thunkAPI) => {
    try {
        return await yoneticiService.durumDegistir(veri)
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
            state.moderatorAtamaMesaj = ''
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
            .addCase(moderatorlerGetir.pending, (state) => {
                state.isLoading = true
            })
            .addCase(moderatorlerGetir.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.moderatorler = action.payload
            })
            .addCase(moderatorlerGetir.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.moderatorler = []
            })
            .addCase(birimeModeratorAta.fulfilled, (state, action) => {
                state.moderatorAtamaMesaj = action.payload
            })
            .addCase(birimeModeratorAta.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(birimModeratorlerGetir.fulfilled, (state, action) => {
                state.yetkililer = action.payload
            })
            .addCase(son10birimRandevularGetir.pending, (state) => {
                state.isLoading = true
            })
            .addCase(son10birimRandevularGetir.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.randvular = action.payload
            })
            .addCase(son10birimRandevularGetir.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.randvular = []
            })
            .addCase(durumGuncelle.pending, (state) => {
                state.isLoading = true
                state.isSuccess=false
            })
            .addCase(durumGuncelle.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(durumGuncelle.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = yoneticiSlice.actions
export default yoneticiSlice.reducer