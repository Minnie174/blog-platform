import React, {useEffect, useState} from "react";
import classes from '../../styles/full-article.module.scss';
import {format} from "date-fns";
import Vector from "../../utilities/img/Vector.svg";
import Avatar from '../../utilities/img/Rectangle 1.svg';
import {Tag} from "antd";
import ReactMarkdown from 'react-markdown';
import {useParams} from "react-router-dom";
import {uniqueId} from "lodash/util";
import ApiService from "../../utilities/api-service/api-service";
import {useSelector} from "react-redux";

const FullArticle = (props) => {
    const {id} = useParams();
    const [article, setArticle] = useState(null)

    useEffect(() => {
        const api = new ApiService();
        const getFull = async (key) => {
            const res = await api.getFullArticle(key)
            setArticle(await res)
            // return await res // return null (?)
        }
        getFull(id).then(r => r)
       // здесь надо получать слаг и передавать его - можем запихнуть его в стейт
    }, [id])
    // теперь надо ретернуть OneArticle(article). Как нам получить конкретную статью?..

    // const getTag = tag.map(el => <Tag key={uniqueId()}>{el}</Tag>);
    console.log(article)

    const getDate = (whenCreated) => {
        const res = format(new Date(whenCreated), 'MMMM dd, yyyy');
        return res;
    }

    const markdown = 'Налог — обязательный, индивидуально безвозмездный платёж, принудительно взимаемый органами государственной власти различных уровней с организаций и физических лиц в целях финансового обеспечения деятельности государства и (или) муниципальных образований.\n\nЛенин Жив!\n\nНалоги следует отличать от сборов (пошлин), взимание которых носит не безвозмездный характер, а является условием совершения в отношении их плательщиков определённых действий.\n\nВзимание налогов регулируется налоговым законодательством.\n\nСовокупность установленных налогов, а также принципов, форм и методов их установления, изменения, отмены, взимания и контроля образуют налоговую систему государства.\n\nВ РФ различаются налоги трех видов: федеральные, региональные и местные.\n\nПеречень налогов каждого из видов установлен Налоговым кодексом РФ.\\n\\nОрганы государственной власти не вправе вводить дополнительные налоги обязательные отчисления, не предусмотренные законодательством РФ, равно как и повышать ставки установленных налогов и налоговых платежей.'

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
                    <div className={classes['change-profile']}>
                        <div className={classes.info}>
                            <div className={classes.name}>{article.author.username}</div>
                            <div className={classes.date}>{getDate(article.createdAt)}</div>
                        </div>
                        <img src={article.author.image} className={classes.avatar} alt="avatar"/>
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