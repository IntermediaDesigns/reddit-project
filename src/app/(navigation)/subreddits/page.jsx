import styles from '@/app/page.module.css';
import { prisma } from '@/app/lib/prisma.js';
import Link from "next/link.js";

export default async function Subreddits() {
  const subreddits = await prisma.subreddit.findMany();
  console.log(subreddits);

       return (
       <div className={styles.mainSubContainer}>

        <p className={styles.subredditTitle}>Subreddits</p>

        <div className={styles.subBtnContainer}>
        <button className={styles.subBtn}>Create Subreddit</button>
        </div>

        <div className={styles.subredditContainer}>
        <img className={styles.redditLogo} src='/reddit.png' alt='Home' width='40' />
          {subreddits.map((subreddit) => (
          <div className={styles.subredditPostTitle} key={subreddit.id}>
            <Link href={`/subreddits/${subreddit.id}`}>{subreddit.name}</Link>
          </div>
          ))}
          
        </div>
        
       </div>);
     }
     