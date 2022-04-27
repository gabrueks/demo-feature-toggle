import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    phone: '',
    jwt: '',
    name: ''
  },
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload
    },
    setJWT: (state, action) => {
        state.jwt = action.payload
    },
    setName: (state, action) => {
        state.name = action.payload
    }
  }
})

export const { setPhone, setJWT, setName } = userSlice.actions

export default userSlice.reducer
