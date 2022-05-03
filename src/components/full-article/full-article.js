import React, {useEffect} from "react";
import classes from '../../styles/full-article.module.scss';
import {format} from "date-fns";
import {Button, Tag, Popconfirm, message, notification} from "antd";
import ReactMarkdown from 'react-markdown';
import {useNavigate, useParams} from "react-router-dom";
import {uniqueId} from "lodash/util";
import {useDispatch, useSelector} from "react-redux";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import Loader from "../loader";
import {getArticle} from "../../redux/actions/single-article";
import {deleteLike, likeArticle} from "../../redux/actions/likes";
import {deleteNews} from "../../redux/actions/article-edit";

const FullArticle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {slug} = useParams();

    const loading = useSelector(state => state.singleArticle.isLoading)
    const isToken = JSON.parse(localStorage.getItem('token')) !== null; // true - значит, залогинен
    const isAuth = JSON.parse(localStorage.getItem('auth'))
    const articleOne = useSelector(state => state.singleArticle.fullArticle)

    const statusLike = useSelector(state => state.likes.isLike);
    const statusUnLike = useSelector(state => state.likes.isUnlike);

    const info = useSelector(state => state.singleArticle.fullArticle); // запихнули инфу о статье в стор
    const user = JSON.parse(localStorage.getItem('user')) || ''

    useEffect(() => {
        dispatch(getArticle(slug))
    }, [slug, statusLike, statusUnLike, getArticle]) // может и прокатит, но тогда надо оперативно менять статус лайка.

    const renderArticle = (fillArticle) => {
        const {title, favoritesCount, favorited, description, tagList, author, body, slug, createdAt} = fillArticle;

        const handleLike = () => {
            if (isToken) {
                if (!favorited) {
                    dispatch(likeArticle(slug))
                } if (favorited) {
                    dispatch(deleteLike(slug))
                }
            } if (!isToken) {
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
            navigate(`/`)
        }

        const cancel = () => {
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
                            {tagList ? tagList.map(el => <Tag key={uniqueId()}>{el}</Tag>) : null}
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
                            {isAuth ? <IsLogin /> : null}
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