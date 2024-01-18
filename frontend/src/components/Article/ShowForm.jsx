
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as articleActions from "../../store/articles";

function ShowForm() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const articles = useSelector(articleActions.selectArticlesArray());

    useEffect(() => {
        dispatch(articleActions.fetchArticles())
    }, [])

    useEffect(() => {
        console.log(articles);
    }, [articles]);

    return (
        <p>test</p>
    )
}

export default ShowForm;