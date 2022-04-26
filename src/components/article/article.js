import React, {useEffect, useState} from "react";
import {notification, Tag} from 'antd';
import 'antd/dist/antd.css';
import styles from '../../styles/article.module.scss';
import {format} from "date-fns";
import {uniqueId} from "lodash/util";
import {Link} from "react-router-dom";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import classes from "../../styles/full-article.module.scss";
import {deleteLike, likeArticle} from "../../redux/actions/likes";
import {useDispatch, useSelector} from "react-redux";

const Article = (props) => {
    const {title, info, date, tag, num, profile, avatar, id, fav} = props;
    const dispatch = useDispatch();
    const isAuth = JSON.parse(localStorage.getItem('auth')) // true

    const getDate = (whenCreated) => {
        const res = format(new Date(whenCreated), 'MMMM dd, yyyy');
        return res;
    }

    const handleLike = () => {
        if (isAuth) {
            if (!fav) {
                dispatch(likeArticle(id))
            } if(fav) {
                dispatch(deleteLike(id))
            }
        } if (!isAuth) {
            return notification['warning']({
                message: 'Error',
                description: 'You should sign in'
            })
        }
    }

    const getTag = tag.map(el => <Tag key={uniqueId()}>{el}</Tag>);
    const path = `articles/${id}`

    return (
        <div className={styles.article}>
            <div className={styles.main}>
                <div className={styles.headerTitle}>
                    <Link to={path}><h1 className={styles.title}>{title}</h1></Link>
                    {fav ? <HeartFilled style={{color: '#1890FF', cursor: 'pointer'}} className={classes.heart} onClick={handleLike}/> : <HeartOutlined className={classes.heart} onClick={handleLike}/>}
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