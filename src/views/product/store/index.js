// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import {apiClient } from '@utils'

export const getProducts = createAsyncThunk('appEcommerce/getProducts', async params => {
  const response = await apiClient.post('/products/getProducts', { ...params })
  return { params, data: response.data }
})

export const getProduct = createAsyncThunk('appEcommerce/getProduct', async id => {
  const response = await apiClient.get(`/products/${id}`)
  return response.data.product
})

export const deleteProduct = createAsyncThunk('appEcommerce/deleteProduct', async (id, { dispatch, getState }) => {
  await apiClient.delete(`/products/${id}/false`)
  dispatch(getProducts(getState().products.params))
  return id
})

export const editProduct = createAsyncThunk('appEcommerce/editProduct', async params => {
  const {id, open} = params
  console.log(params)
  if (open) {
    const response = await apiClient.get(`/products/${id}`)
    return {
      editStatus : open,
      product : response.data.product
    }
  } else {
    return {
      editStatus : open,
      product : null
    }
  }
  
})

export const updateProduct = createAsyncThunk('appEcommerce/updateProduct', async (params, { dispatch, getState}) => {
  const id = params.id
  const putData = params.data
  const type = params.type
  // const token = JSON.parse(localStorage.getItem("accessToken"))
  // const config = {
  //   headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
  // }
  if (type === "image") {
    await apiClient.put(`/products/updateProduct/${id}`, {...putData}, { headers : {
      "content-type": "multipart/form-data",
      Accept: '*/*'
     }
    })
  } else {
    await apiClient.put(`/products/updateProduct/${id}`, {...putData})
  }
  dispatch(getProducts(getState().products.params))
  return { editStatus : false }
  

})

export const addStarting = createAsyncThunk('appEcommerce/addStarting', async flag => {
  console.log(flag)
  return {
    addStatus : flag
  }
  
})

export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    params: {},
    products: [],
    totalProducts: 0,
    editStatus : false,
    addStatus : false,
    productDetail: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.params = action.payload.params
        state.products = action.payload.data.products
        state.totalProducts = action.payload.data.total
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.product
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.product
        state.editStatus = action.payload.editStatus
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.editStatus = action.payload.editStatus
      })
      .addCase(addStarting.fulfilled, (state, action) => {
        state.addStatus = action.payload.addStatus
      })
  }
})

export default appEcommerceSlice.reducer
