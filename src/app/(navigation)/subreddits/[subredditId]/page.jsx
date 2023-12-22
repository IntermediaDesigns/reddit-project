// import styles from '@/app/page.module.css';
// import Link from 'next/link.js';
// import { prisma } from '@/app/lib/prisma.js';
// export default async function SubredditPosts({ params }) {
//   const subreddits = await prisma.subreddit.findMany();
//   console.log(params);

//   return (
//     <div className={styles.mainSubContainer}>
//       <div className={styles.subBtnContainer}>
//         <button className={styles.subBtn}>Create Subreddit</button>
//       </div>

//       <div className={styles.subredditContainer}>
//         {subreddits.map((subreddit) => (
//           <div className={styles.subredditTitle} key={subreddit.id}>
//             {subreddit.name}
//           </div>
//         ))}
//         <div className={styles.subredditSnippet}>
//           Post - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
//           consequatur repellat, praesentium reiciendis eum deleniti voluptate.
//           Autem quidem quis dolore!
//         </div>

//         <div className={styles.subStats}># of Users Subscribed</div>
//       </div>
//     </div>
//   );
// }

export default function SubredditId({ params }) {
       // i want to show the posts associated with this subreddit
     
       // how do i access that parameter?
       console.log(params);
       return <div>Subreddit</div>;
     }
     