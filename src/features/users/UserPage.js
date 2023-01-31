import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { selectAllPosts, selectPostsByUser } from "../posts/postsSlice";
import { selectUserById } from "./usersSlice";

export const UserPage = ({ match }) => {
    const { userId } = match.params

    const user = useSelector(state => selectUserById(state, userId))
    console.log('user用户', user)

    const postsForUser = useSelector(state => selectPostsByUser(state, userId))

    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user.name}</h2>
            <ul>{postTitles}</ul>
        </section>
    )
}