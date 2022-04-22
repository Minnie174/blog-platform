import React, {useEffect, useState} from "react";
import classes from '../../styles/full-article.module.scss';
import {format} from "date-fns";
import Vector from "../../utilities/img/Vector.svg";
import {Button, Tag, Popconfirm, message, notification} from "antd";
import ReactMarkdown from 'react-markdown';
import {useNavigate, useParams} from "react-router-dom";
import {uniqueId} from "lodash/util";
import ApiService from "../../utilities/api-service/api-service";
import {useDispatch, useSelector} from "react-redux";
import {deleteLike, deleteNews, getOldArticle, getSingleArticle, likeArticle} from "../../redux/actions";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import Loader from "../loader";

const FullArticle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const loading = useSelector(state => state.articles.isLoading)
    const isToken = JSON.parse(localStorage.getItem('token')) !== null; // true - значит, залогинен
    const articleOne = useSelector(state => state.articles.fullArticle)

    const statusLike = useSelector(state => state.articles.isLike);
    const statusUnLike = useSelector(state => state.articles.isUnlike);
    const isErrorLike = useSelector(state => state.articles.isError);

    const info = useSelector(state => state.articles.fullArticle); // запихнули инфу о статье в стор
    const user = JSON.parse(localStorage.getItem('user')) || ''

    useEffect(() => {
        if (!isToken) {
            dispatch(getSingleArticle(id)) // мб поменять
        }
        dispatch(getSingleArticle(id))
        dispatch(getOldArticle(id))
    }, [id, statusLike, statusUnLike]) // может и прокатит, но тогда надо оперативно менять статус лайка.

    const renderArticle = (fillArticle) => {
        const {title, favoritesCount, favorited, description, tagList, author, body, slug, createdAt} = fillArticle;

        const handleLike = () => {
            if (isToken) {
                if (!favorited) {
                    dispatch(likeArticle(id))
                }
                dispatch(deleteLike(id))
            } else {
                return notification['warning']({
                    message: 'Error',
                    description: 'You should sign in'
                })
            }
        }

        const getDate = (whenCreated) => {
            const res = format(new Date(whenCreated), 'MMMM dd, yyyy');
            return res;
        }

        const confirm = () => {
            if (info.author.username !== user.username.toLowerCase()) {
                return notification['warning']({
                    message: 'Error',
                    description: 'No access'
                })
            }
            dispatch(deleteNews(slug));
            navigate('/')
            // прописать логику удаления статьи (?) // диспатчим запрос на удаление статьи
        }

        const cancel = () => {
            console.log('cancel')
        }

        const editNews = () => {
            if (info.author.username !== user.username.toLowerCase()) {
                return notification['warning']({
                    message: 'Error',
                    description: 'No access'
                })
            }
            navigate(`/articles/${slug}/edit`)
        }

        const loader = loading ? <Loader /> : null

        const IsLogin = () => {
            return (
                <div className={classes.buttons}>
                    <Popconfirm title="Are you sure to delete this article?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No">
                        <Button className={classes.delete} danger>Delete</Button>
                    </Popconfirm>
                    <Button className={classes.edit} htmlType="button" onClick={editNews}>Edit</Button>
                </div>
            )
        }

        return (
            <div className={classes['full-article']}>
                {loader}
                <div>
                    <div className={classes.change}>
                        <div>
                            <div className={classes.headerTitle}>
                                <h1 className={classes.title}>{title}</h1>
                                {favorited ? <HeartFilled style={{color: '#1890FF', cursor: 'pointer'}} className={classes.heart} onClick={handleLike}/> : <HeartOutlined className={classes.heart} onClick={handleLike}/>}
                                <span>{favoritesCount}</span>
                            </div>
                            {tagList.map(el => <Tag key={uniqueId()}>{el}</Tag>)}
                            <div className={classes['mini-description']}>
                                {description}
                            </div>
                        </div>
                        <div className={classes.profileInfo}>
                            <div className={classes['change-profile']}>
                                <div className={classes.info}>
                                    <div className={classes.name}>{author.username}</div>
                                    <div className={classes.date}>{getDate(createdAt)}</div>
                                </div>
                                <img src={author.image} className={classes.avatar} alt="avatar"/>
                            </div>
                            {isToken ? <IsLogin /> : null}
                        </div>
                    </div>
                    <div className={classes.description}>
                        <ReactMarkdown children={body}>
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        )
    }
    if (articleOne.length === 0) return <Loader />

    return renderArticle(articleOne);
};

export default FullArticle;