// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import {apiClient } from '@utils'
// import useJwt from '@src/auth/jwt/useJwt'


// const token = localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
// const config = {
//   headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
// }

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await apiClient.get('/users')
  return response.data.users
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await apiClient.post('/users/filterData', params)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.totalPages
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await apiClient.get(`/users/${id}`)
  return response.data.user
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await apiClient.post('/users', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await apiClient.delete(`/users/${id}/false`)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appUsersSlice.reducer
