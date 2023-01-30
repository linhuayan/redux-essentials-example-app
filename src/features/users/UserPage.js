import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";

export const UserPage = ({ match }) => {
    const { userId } = match.params

    const user = useSelector(state => selectUserById(state, userId))
}