import styles from '@/app/page.module.css';
import './globals.css';
import Posts from './components/Posts.jsx';

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.createPostContainer}>
        <div className={styles.profileContainer}>👤</div>
        <div className={styles.CreatePostInputContainer}>
          <input
            className={styles.createPostInput}
            type='text'
            placeholder='Create Post'
          />
        </div>
      </div>

      <div className={styles.postsContainer}>
        <div className={styles.postsVoteContainer}>
          <button className={styles.clickVote}>⬆️</button> #{' '}
          <button className={styles.clickVote}>⬇️</button>
          
        </div>

        <div className={styles.commentsBtnContainer}>
          <button className={styles.commentsBtn}>💬 # Comments</button>
        </div>
      </div>
    </div>
  );
}
