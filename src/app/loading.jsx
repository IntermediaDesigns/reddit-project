import styles from '@/app/page.module.css';
export default function Loading() {
  return (
    <section className={styles.loadingContainer}>
       <span className={styles.loader}></span>
    </section>
  )
}
