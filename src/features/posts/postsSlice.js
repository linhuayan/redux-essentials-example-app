import { createAsyncThunk, createSlice, createEntityAdapter, createSelector, nanoid } from '@reduxjs/toolkit'
import { client } from '../../api/client'

/**
 * const initialState = {
 *  ids: [],
 *  entities: {
 *    post1: {
 *        id: '1',
 *        title: 'First Post!',
 *       content: 'Hello!',
 *       date: sub(new Date(), { minutes: 10 }).toISOString(),
 *       reactions: {
 *           thumbsUp: 0,
 *           hooray: 0,
 *           heart: 0,
 *           rocket: 0,
 *           eyes: 0
 *       }
 *   },
 *   post2: {
 *        id: '2',
 *        title: 'Second Post',
 *        content: 'Move text',
 *        date: sub(new Date(), { minutes: 5 }).toISOString(),
 *        reactions: {
 *            thumbsUp: 0,
 *            hooray: 0,
 *            heart: 0,
 *            rocket: 0,
 *            eyes: 0
 *        }
 *   }
 *  },
 *  status: 'idle',
 *  error: null
 * }
*/

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
})

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
      // const existingPost = state.posts.find(post => post.id === id)
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      // const existingPost = state.posts.find(post => post.id === postId)
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      // Use the `upsertMany` reducer as a mutating update utility
      postsAdapter.upsertMany(state, action.payload)
    },
    // Use the `addOne` reducer for the fulfilled case
    [addNewPost.fulfilled]: postsAdapter.addOne
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