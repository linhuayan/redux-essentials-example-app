import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { selectPostById } from './postsSlice';

export const SinglePostPage = (props) => {
    console.log('props', props);
    const { postId } = props.match.params

    const post = useSelector(selectPostById)

    console.log('post', post)

    if (!post) {
        return (
            <section>
                <h2>页面未找到！</h2>
            </section>
        )
    }

    return (
        <section>
            <article className='post'>
                <h2>{post.title}</h2>
                <div>
                    <PostAuthor userId={post.user} />
                    <TimeAgo timestamp={post.date} />
                </div>
                <p className='post-content'>{post.content}</p>
                <ReactionButtons post={post} />
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
            </article>
        </section>
    )
}