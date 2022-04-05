import React from "react";
import styles from '../../styles/full-article.module.scss';

const FullArticle = (props) => {
    const {title, info, date, tag, num, profile, avatar} = props;
    return (
        <div className={styles['full-article']}>
            <div>
                Получаем текст статьи из slug => description.
            </div>
            <div>
                Инфа про пользователя (сделать position absolute)
            </div>
        </div>
    )
};

export default FullArticle;