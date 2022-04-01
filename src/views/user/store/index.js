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

export const editUser = createAsyncThunk('appUsers/editUser', async params => {
  const {id, open} = params
  if (open) {
    const response = await apiClient.get(`/users/${id}`)
    return {
      editStatus : open,
      user : response.data.user
    }
  } else {
    return {
      editStatus : open,
      user : null
    }
  }
  
})

export const updateUser = createAsyncThunk('appUsers/updateUser', async (params, { dispatch, getState}) => {
  const {id, putData} = params
  // const token = JSON.parse(localStorage.getItem("accessToken"))
  // const config = {
  //   headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
  // }
  await apiClient.put(`/users/${id}`, putData)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return { editStatus : false }

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
  return { deleteStatus : false }
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    editStatus : false,
    deleteStatus : false,
    selectedUser: null
  },
  reducers: {
    startDelete: (state, action) => {
      state.deleteStatus = action.payload.deleteStatus
    }
  },
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
      .addCase(editUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload.user
        state.editStatus = action.payload.editStatus
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.editStatus = action.payload.editStatus
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteStatus = action.payload.deleteStatus
      })
  }
})

export const { startDelete } = appUsersSlice.actions

export default appUsersSlice.reducer
