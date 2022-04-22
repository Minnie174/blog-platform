import React, {useEffect, useState} from "react";
import {notification, Tag} from 'antd';
import 'antd/dist/antd.css';
import styles from '../../styles/article.module.scss';
import Vector from '../../utilities/img/Vector.svg';
import {format} from "date-fns";
import {uniqueId} from "lodash/util";
import {Link} from "react-router-dom";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import classes from "../../styles/full-article.module.scss";
import {deleteLike, fetchDispatch, isLiked, likeArticle} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

const Article = (props) => {
    const {title, info, date, tag, num, profile, avatar, id, fav, likeArticle} = props;
    const isToken = JSON.parse(localStorage.getItem('token')) !== null;
    const dispatch = useDispatch();
    const likeStatus = useSelector(state => state.articles.isLike) // изначально null ?
    const currentPage = useSelector(state => state.articles.currentPage)
    const isErrorLike = useSelector(state => state.articles.isError);

    // const handleLike = () => {
    //     console.log('like');
    //     if (isToken) {
    //         if (!fav) {
    //             dispatch(likeArticle(id))
    //         }
    //             dispatch(deleteLike(id))
    //     }
    //     dispatch(isLiked(false)) // вывести сообщение об ошибке
    // }

    const getDate = (whenCreated) => {
        const res = format(new Date(whenCreated), 'MMMM dd, yyyy');
        return res;
    }

    const getTag = tag.map(el => <Tag key={uniqueId()}>{el}</Tag>);
    const path = `articles/${id}`

    return (
        <div className={styles.article}>
            <div className={styles.main}>
                <div className={styles.headerTitle}>
                    <Link to={path}><h1 className={styles.title}>{title}</h1></Link>
                    {fav ? <HeartFilled style={{color: '#1890FF', cursor: 'pointer'}} className={classes.heart} onClick={likeArticle}/> : <HeartOutlined className={classes.heart} onClick={likeArticle}/>}
                    <span>{num}</span>
                </div>
                <div>
                    {getTag}
                </div>
                <p className={styles.paragraph}>{info}</p>
            </div>
            <div className={styles.nameInfo}>
                <div className={styles.info}>
                    <div className={styles.name}>{profile}</div>
                    <div className={styles.date}>{getDate(date)}</div>
                </div>
                <img src={avatar} className={styles.avatar}/>
            </div>
        </div>
    )
};

export default Article;