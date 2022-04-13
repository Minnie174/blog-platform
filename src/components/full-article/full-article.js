import React, {useEffect, useState} from "react";
import classes from '../../styles/full-article.module.scss';
import {format} from "date-fns";
import Vector from "../../utilities/img/Vector.svg";
import {Button, Tag, Popconfirm, message} from "antd";
import ReactMarkdown from 'react-markdown';
import {useParams} from "react-router-dom";
import {uniqueId} from "lodash/util";
import ApiService from "../../utilities/api-service/api-service";
import {useSelector} from "react-redux";

const FullArticle = () => {
    const {id} = useParams();
    const [article, setArticle] = useState(null)
    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        const api = new ApiService();
        const getFull = async (key) => {
            const res = await api.getFullArticle(key)
            setArticle(await res)
        }
        getFull(id).then(r => r)
    }, [id])

    const getDate = (whenCreated) => {
        const res = format(new Date(whenCreated), 'MMMM dd, yyyy');
        return res;
    }

    const confirm = () => {
        console.log('confirm') // прописать логику удаления статьи (?)
    }

    const cancel = () => {
        console.log('cancel')
    }

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
                <Button className={classes.edit}>Edit</Button>
            </div>
        )
    }

    return (
        <div className={classes['full-article']}>
            {article && (
                <div>
                    <div className={classes.change}>
                    <div>
                        <div className={classes.headerTitle}>
                            <h1 className={classes.title}>{article.title}</h1>
                            <img src={Vector} className={classes.heart} alt="like"/>
                            <span>{article.favoritesCount}</span>
                        </div>
                            {article.tagList.map(el => <Tag key={uniqueId()}>{el}</Tag>)}
                        <div className={classes['mini-description']}>
                            {article.description}
                        </div>
                    </div>
                        <div className={classes.profileInfo}>
                            <div className={classes['change-profile']}>
                                <div className={classes.info}>
                                    <div className={classes.name}>{article.author.username}</div>
                                    <div className={classes.date}>{getDate(article.createdAt)}</div>
                                </div>
                                <img src={article.author.image} className={classes.avatar} alt="avatar"/>
                            </div>
                            {isAuth ? <IsLogin /> : null}
                        </div>
                </div>
                <div className={classes.description}>
                    <ReactMarkdown children={article.body}>
                    </ReactMarkdown>
                </div>
            </div>)}
        </div>
    )
};

export default FullArticle;