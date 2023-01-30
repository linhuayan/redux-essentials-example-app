import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' }
]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // 不能这样改，猜想是因为对象的keys的length为1。
            return action.payload
        })
    }
})

export default usersSlice.reducer   

export const selectAllUsers = state => state.users

export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)