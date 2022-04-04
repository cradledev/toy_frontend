// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import {apiClient } from '@utils'
// import useJwt from '@src/auth/jwt/useJwt'


// const token = localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
// const config = {
//   headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
// }

export const getAllData = createAsyncThunk('appConfig/getAllData', async () => {
  const response = await apiClient.get('/config/slider')
  return response.data.sliders
})

export const getData = createAsyncThunk('appConfig/getData', async params => {
  const response = await apiClient.post('/config/slider/filterData', params)
  return {
    params,
    data: response.data.sliders,
    totalPages: response.data.totalPages
  }
})

export const getSlider = createAsyncThunk('appConfig/getSlider', async id => {
  const response = await apiClient.get(`/config/slider/${id}`)
  return response.data.slider
})

export const editSlider = createAsyncThunk('appConfig/editSlider', async params => {
  const {id, open} = params
  if (open) {
    const response = await apiClient.get(`/config/slider/${id}`)
    return {
      editStatus : open,
      slider : response.data.slider
    }
  } else {
    return {
      editStatus : open,
      slider : null
    }
  }
  
})

export const updateSlider = createAsyncThunk('appConfig/updateSlider', async (params, { dispatch, getState}) => {
  const {id, putData} = params
  // const token = JSON.parse(localStorage.getItem("accessToken"))
  // const config = {
  //   headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
  // }
  await apiClient.put(`/config/updateSlider/${id}`, putData)
  await dispatch(getData(getState().sliders.params))
  return { editStatus : false }

})
export const addStarting = createAsyncThunk('appConfig/addStarting', async flag => {
  return {
    addStatus : flag
  }
})

export const deleteSlider = createAsyncThunk('appConfig/deleteSlider', async (id, { dispatch, getState}) => {
  await apiClient.delete(`/config/slider/${id}/false`)
  await dispatch(getData(getState().sliders.params))
  return id
})

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    editStatus : false,
    addStatus : false,
    selectedSlider: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
        .addCase(getData.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.params = action.payload.params
            state.total = action.payload.totalPages
        })
        .addCase(getAllData.fulfilled, (state, action) => {
            state.allData = action.payload
        })
        .addCase(getSlider.fulfilled, (state, action) => {
            state.selectedSlider = action.payload
        })
        .addCase(editSlider.fulfilled, (state, action) => {
            state.selectedSlider = action.payload.slider
            state.editStatus = action.payload.editStatus
        })
        .addCase(updateSlider.fulfilled, (state, action) => {
            state.editStatus = action.payload.editStatus
        })
        .addCase(addStarting.fulfilled, (state, action) => {
          state.addStatus = action.payload.addStatus
        })
  }
})

export const { startDelete } = appConfigSlice.actions

export default appConfigSlice.reducer
