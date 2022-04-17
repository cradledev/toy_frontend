// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import {apiClient } from '@utils'

export const getData = createAsyncThunk('appPromotionDiscount/getData', async params => {
  const response = await apiClient.post('/discount/filterData', params)
  return {
    params,
    data: response.data.discounts,
    totalPages: response.data.totalPages
  }
})

export const saveDiscount = createAsyncThunk('appPromotionDiscount/saveDiscount', async (params, { dispatch, getState}) => {
  const response = await apiClient.post('/discount', params)
  dispatch(getData(getState().discounts.params))
  return response
})

export const getDiscount = createAsyncThunk('appPromotionDiscount/getDiscount', async id => {
  const response = await apiClient.get(`/discount/${id}`)
  return response.data.discount
})

export const editDiscount = createAsyncThunk('appPromotionDiscount/editDiscount', async params => {
  const {id, open} = params
  if (open) {
    const response = await apiClient.get(`/discount/${id}`)
    return {
      editStatus : open,
      discount : response.data.discount
    }
  } else {
    return {
      editStatus : open,
      discount : null
    }
  }
  
})

export const updateDiscount = createAsyncThunk('appPromotionDiscount/updateDiscount', async (params, { dispatch, getState}) => {
  const {id, putData} = params
  await apiClient.put(`/discount/updateDiscount/${id}`, putData)
  dispatch(getData(getState().discounts.params))
  return { editStatus : false }

})
export const addStarting = createAsyncThunk('appPromotionDiscount/addStarting', async flag => {
  console.log(flag)
  return {
    addStatus : flag
  }
})


export const deleteDiscount = createAsyncThunk('appPromotionDiscount/deleteDiscount', async (params, { dispatch, getState}) => {
  const {id, flag} = params
  await apiClient.delete(`/discount/${id}/${flag}`)
  dispatch(getData(getState().discounts.params))
  return id
})

export const appPromotionDiscountSlice = createSlice({
  name: 'appPromotionDiscount',
  initialState: {
    data: [],
    total: 1,
    params: {},
    editStatus : false,
    addStatus : false,
    selectedDiscount: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
        .addCase(getData.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.params = action.payload.params
            state.total = action.payload.totalPages
        })
        .addCase(getDiscount.fulfilled, (state, action) => {
            state.selectedDiscount = action.payload
        })
        .addCase(editDiscount.fulfilled, (state, action) => {
            state.selectedDiscount = action.payload.discount
            state.editStatus = action.payload.editStatus
        })
        .addCase(updateDiscount.fulfilled, (state, action) => {
            state.editStatus = action.payload.editStatus
        })
        .addCase(addStarting.fulfilled, (state, action) => {
          state.addStatus = action.payload.addStatus
        })
  }
})

export const { startDelete } = appPromotionDiscountSlice.actions

export default appPromotionDiscountSlice.reducer
