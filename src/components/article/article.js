import React from "react";
import {Tag} from 'antd';
import 'antd/dist/antd.css';
import styles from '../../styles/article.module.scss';
import Vector from '../../utilities/img/Vector.svg';
import Avatar from '../../utilities/img/Rectangle 1.svg';
import {format} from "date-fns";
import {uniqueId} from "lodash/util";

const Article = (props) => {
    const {title, info, date, tag, num, profile, avatar} = props;

    const getDate = (whenCreated) => {
        const res = format(new Date(whenCreated), 'MMMM dd, yyyy');
        return res;
    }

    const getTag = tag.map(el => <Tag key={uniqueId()}>{el}</Tag>);

    return (
        <div className={styles.article}>
            <div className={styles.main}>
                <div className={styles.headerTitle}>
                    <h1 className={styles.title}>{title}</h1>
                    <img src={Vector} className={styles.heart} alt="like"/>
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