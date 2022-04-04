// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import {apiClient } from '@utils'
// import useJwt from '@src/auth/jwt/useJwt'


// const token = localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
// const config = {
//   headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
// }

export const getAllData = createAsyncThunk('appCategory/getAllData', async () => {
  const response = await apiClient.get('/categories')
  return response.data.categories
})

export const getCategory = createAsyncThunk('appCategory/getCategory', async id => {
  const response = await apiClient.get(`/categories/${id}`)
  return response.data.category
})

export const editCategory = createAsyncThunk('appCategory/editCategory', async params => {
  const {id, open} = params
  if (open) {
    const response = await apiClient.get(`/categories/${id}`)
    return {
      editStatus : open,
      category : response.data.category
    }
  } else {
    return {
      editStatus : open,
      category : null
    }
  }
  
})

export const addStarting = createAsyncThunk('appCategory/addStarting', async params => {
    const {id, open} = params
    if (open) {
      if (id) {
        const response = await apiClient.get(`/categories/${id}`)
        return {
          addStatus : open,
          category : response.data.category
        }  
      } else {
        return {
          addStatus : open,
          category : null
        }
      }
    } else {
      return {
        addStatus : open,
        category : null
      }
    }
    
})

export const renameCategory = createAsyncThunk('appCategory/renameCategory', async (params, { dispatch}) => {
  const {category_id, category_name} = params
  await apiClient.post(`/categories/renameCategory`, {category_id, category_name})
  await dispatch(getAllData())
  return { editStatus : false }

})

export const updateCategory = createAsyncThunk('appCategory/updateCategory', async (params, { dispatch}) => {
  await apiClient.post(`/categories/updateCategory`, params)
  await dispatch(getAllData())
  return true

})
export const addCategory = createAsyncThunk('appCategory/addCategory', async (category, { dispatch }) => {
  await apiClient.post('/categories', category)
  await dispatch(getAllData())
  return { addStatus : false }
})

export const deleteCategory = createAsyncThunk('appCategory/deleteCategory', async (id, { dispatch }) => {
  await apiClient.delete(`/categories/${id}`)
  await dispatch(getAllData())
  return { deleteStatus : false }
})

export const appCategorysSlice = createSlice({
  name: 'appCategory',
  initialState: {
    allData: [],
    editStatus : false,
    deleteStatus : false,
    addStatus : false,
    selectedCategoryForAdd : null,
    selectedCategory: null
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
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteStatus = action.payload.deleteStatus
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.selectedCategory = action.payload.category
        state.editStatus = action.payload.editStatus
      })
      .addCase(renameCategory.fulfilled, (state, action) => {
        state.editStatus = action.payload.editStatus
      })
      .addCase(addStarting.fulfilled, (state, action) => {
        state.selectedCategoryForAdd = action.payload.category
        state.addStatus = action.payload.addStatus
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.addStatus = action.payload.addStatus
      })
  }
})

export const { startDelete } = appCategorysSlice.actions

export default appCategorysSlice.reducer
