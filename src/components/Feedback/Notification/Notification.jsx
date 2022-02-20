import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './notification.module.css'

const Notification = ({message}) => {
    return (
        <p className={styles.text}>{message}</p>
    );
}

export default memo(Notification);

Notification.propTypes = {
    message: PropTypes.string.isRequired,
}