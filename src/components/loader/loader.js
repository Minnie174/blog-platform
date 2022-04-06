import React from "react";
import {TailSpin} from "react-loader-spinner";
import styles from './loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <TailSpin color="#00BFFF" height={100} width={100} />
        </div>
    )
}

export default Loader;