import React from 'react';
import styles from './Loading.module.css'

class Loading extends React.Component {
  render = () => {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.cssloadCssloadWrap2}>
          <div className={styles.cssloadWrap}>
            <div className={styles.cssloadOverlay}></div>

            <div className={`${styles.cssloadCogWheel} ${styles.cssloadOne}`}>
              <div className={`${styles.cssloadCog} ${styles.cssloadOne}`}></div>
              <div className={`${styles.cssloadCog} ${styles.cssloadTwo}`}></div>
              <div className={`${styles.cssloadCog} ${styles.cssloadThree}`}></div>
              <div className={`${styles.cssloadCog} ${styles.cssloadFour}`}></div>
              <div className={`${styles.cssloadCog} ${styles.cssloadFive}`}></div>
              <div className={styles.cssloadCenter}></div>
            </div>

            <div className={`${styles.cssloadCogWheel} ${styles.cssloadTwo}`}>
              <div className={`${styles.cssloadCog} ${styles.cssloadOne}`}></div>
              <div className={`${styles.cssloadCog} ${styles.cssloadTwo}`}></div>
              <div className={`${styles.cssloadCog} ${styles.cssloadThree}`}></div>
              <div className={`${styles.cssloadCog} ${styles.cssloadFour}`}></div>
              <div className={`${styles.cssloadCog} ${styles.cssloadFive}`}></div>
              <div className={styles.cssloadCenter}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Loading;
