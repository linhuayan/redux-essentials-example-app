import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';

export const SinglePostPage = (props) => {
    console.log('props', props);
    const { postId } = props.match.params

    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    )

    console.log('post', post)

    if (!post) {
        return (
            <section>
                <h2>页面未找到！</h2>
            </section>
        )
    }

    return (
        <section>111
            <article className='post'>
                <h2>{post.title}</h2>
                <p className='post-content'>{post.content}</p>
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
                <PostAuthor userId={post.user} />
            </article>
        </section>
    )
}