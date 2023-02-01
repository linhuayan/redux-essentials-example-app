import { createAsyncThunk, createSlice, createEntityAdapter, createSelector, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { client } from '../../api/client'

// const initialState = [
//     {
//         id: '1',
//         title: 'First Post!',
//         content: 'Hello!',
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             hooray: 0,
//             heart: 0,
//             rocket: 0,
//             eyes: 0
//         }
//     },
//     {
//         id: '2',
//         title: 'Second Post',
//         content: 'Move text',
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             hooray: 0,
//             heart: 0,
//             rocket: 0,
//             eyes: 0
//         }
//     }
// ]

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  console.log('response', response)
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost',
  // payload 创建者接收部分“{title, content, user}”对象
  async initialPost => {
    // 我们发送初始数据到 API server
    const response = await client.post('fakeApi/posts', initialPost);
    // 响应包括完整的帖子对象，包括唯一 ID
    return response.data
  })

const initialState = {
  status: 'idle',
  posts: [],
  error: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded(state, action) {
    //     state.push(action.payload)
    // },
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId
          }
        }
      }
    },
    postUpated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        console.log('帖子', state)
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      // 我们可以直接将新的帖子对象添加到我们的帖子数组中
      state.posts.push(action.payload)
    })
  }
})

export const { postAdded, postUpated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)

/**
 * 记忆selector
 * 当调用`selectPostsByUser(state, userId)`时，
 * `createSelector`会将所有参数传递给每个输入selector。
 * 无论这些输入selector返回什么，
 * 都将成为输出selector的参数
 * [selectAllPosts, (state, userId) => userId]的返回值将是
 * 输出selector (posts, userId) => posts.filter(post => post.user === userId) 的参数
 *  */
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)