import React from "react";
import styles from '../../styles/full-article.module.scss';
import {format} from "date-fns";
import Vector from "../../utilities/img/Vector.svg";
import {Tag} from "antd";
import {uniqueId} from "lodash/util";

const FullArticle = (props) => {

    // получаем
    const {title, info, date, tag, num, profile, avatar} = props;

    const getDate = (whenCreated) => {
        const res = format(new Date(whenCreated), 'MMMM dd, yyyy');
        return res;
    }

    const getTag = tag.map(el => <Tag key={uniqueId()}>{el}</Tag>);

    return (
        <div className={styles['full-article']}>
            <div>
                <div>Титульник с тэгом и лайками + фотокарточка.
                    <div> Title
                        <div className={styles.headerTitle}>
                            <h1 className={styles.title}>{title}</h1>
                            <img src={Vector} className={styles.heart} alt="like"/>
                            <span>{num}</span>
                        </div>
                        <div>
                            {getTag}
                        </div>
                    </div>
                    <div>
                        <div className={styles.info}>
                            <div className={styles.name}>{profile}</div>
                            <div className={styles.date}>{getDate(date)}</div>
                        </div>
                        <img src={avatar} className={styles.avatar} alt="avatar"/>
                    </div>
                </div>
                <div>{info}</div>
            </div>
        </div>
    )
};

export default FullArticle;