import styles from '@/app/page.module.css';
import { prisma } from '@/app/lib/prisma.js';
export default async function postIdPage() {
       
       const posts = await prisma.post.findFirst();
       console.log(posts);
     
       
     
       return (
         <div className={styles.mainContainer}>
           <p className={styles.mainRedditTitle}>Reddit</p>
           <div className={styles.createPostContainer}>
             <div className={styles.profileContainer}>
               <img src='/profile.png' alt='profile' width={50} />
             </div>
             <div className={styles.CreatePostInputContainer}>
               <input
                 className={styles.createPostInput}
                 type='text'
                 placeholder='Create Post'
               />
             </div>
           </div>
     
           {posts.map((post) => (
             <div className={styles.postsContainer} key={post.id}>
               <div className={styles.postsVoteContainer}>
               <div className={styles.postsVoteContainer} key={post.id}>
               <button
                 className={styles.clickVote}
               >
                 ⬆️
               </button>
               {post.votes || 0}
               <button
                 className={styles.clickVote}
               >
                 ⬇️
               </button>
             </div>
               </div>
     
               <div className={styles.innerPostContainer}>
                 <div className={styles.postTitle}>
                   {post.title}
                 </div>
     
                 {post.user && (
                   <div className={styles.postUsername}>{post.user.username}</div>
                 )}
     
                 <div className={styles.post}>{post.message}</div>
     
                 <div className={styles.statContainer}>
              
              <div>
                <p className={styles.commentsStat}>💬 # Comments</p>
              </div>

              <div>
                <p className={styles.dateStat}>
                  Created: {post.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>

               </div>
             </div>
           ))}
         </div>
       );
     }