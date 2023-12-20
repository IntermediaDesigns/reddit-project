import styles from '@/app/page.module.css';


export default function Subreddits() {
       return (
       <div className={styles.mainSubContainer}>

        <div className={styles.subBtnContainer}>
        <button className={styles.subBtn}>Create Subreddit</button>
        </div>

        <div className={styles.subredditContainer}>
          <h2 className={styles.subredditTitle}> r/Subreddit: Group Title </h2>
          <div className={styles.subredditSnippet}>
            Subreddit Snippet - Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio provident tenetur repellat nostrum eaque saepe vitae, minima voluptates facilis rem adipisci autem culpa aliquid ipsa eius commodi recusandae fugiat qui voluptatibus. Nam numquam alias porro, repellat quis, aspernatur, quidem qui impedit assumenda iusto placeat quas laboriosam quibusdam? Quisquam, eum odit!
          </div>
          <div className={styles.subStats}>
            # of Users Subscribed
          </div>
        </div>

        <div className={styles.subredditContainer}>
          <h2 className={styles.subredditTitle}> r/Subreddit: Group Title - Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum consequatur aperiam repellendus totam quam?</h2>
          <div className={styles.subredditSnippet}>
            Subreddit Snippet - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed consequatur repellat, praesentium reiciendis eum deleniti voluptate. Autem quidem quis dolore!
          </div>
          <div className={styles.subStats}>
            # of Users Subscribed
          </div>
        </div>

        <div className={styles.subredditContainer}>
          <button className={styles.subredditTitle}> r/Subreddit: Group Title Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati. </button>
          <div className={styles.subredditSnippet}>
            Subreddit Snippet 
          </div>
          <div className={styles.subStats}>
            # of Users Subscribed
          </div>
        </div>
        
       </div>);
     }
     