// import React from "react";
// import { Pagination } from "antd";
// import 'antd/dist/antd.css';
// import styles from '../../styles/pagination.module.scss';
// import {useDispatch, useSelector} from "react-redux";
// import {setCurrentPage} from "../../redux/actions/articles";
//
// const PaginationArticles = () => {
//     const dispatch = useDispatch()
//     const totalCount = useSelector(state => state.articles.totalCount);
//     const currentPage = useSelector(state => state.articles.currentPage)
//
//     const updatePage = async (curr) => {
//         dispatch(setCurrentPage(curr))
//         // const res = await api.getPagination(5, curr) // получаем пять статей
//     }
//
//     return (
//         <Pagination size="small"
//                     onChange={updatePage}
//                     className={styles['pagination-list']}
//                     current={currentPage}
//                     total={totalCount}/>
//     )
// }
//
// export default PaginationArticles;