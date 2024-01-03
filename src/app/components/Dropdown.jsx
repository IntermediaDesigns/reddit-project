'use client'
import React, {useState} from 'react';
import styles from '@/app/page.module.css';


export default function Dropdown({ subreddits}) {
       const [subreddit, setSubreddit] = useState('');

       const handleSubredditChange = (event) => {
              setSubreddit(event.target.value);
            };

  return (
    <div className={styles.dropdownSub}>
      
        <select
          className={styles.subSelect}
          value={subreddit}
          onChange={handleSubredditChange}
        >
               <option value=''>or Select Subreddit</option>
          {subreddits.map((subreddit) => (
            <option key={subreddit.id} value={subreddit.name}>
              {subreddit.name}
            </option>
          ))}
        </select>
      
    </div>
  );
}


