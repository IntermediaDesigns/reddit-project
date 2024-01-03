import styles from '@/app/page.module.css';
import { prisma } from '@/app/lib/prisma.js';
import ChildrenComments from '@/app/components/ChildrenComments.jsx';
import MakeComment from '@/app/components/MakeComment.jsx';
import DeletePost from '@/app/components/DeletePost.jsx';
import EditPost from '@/app/components/EditPost.jsx';


export default async function postIdPage({ params }) {
  const { postId } = params;
  const post = await prisma.post.findFirst({
    where: { parentId: null, id: postId },
    include: {
      user: true,
      subreddit: true,
      children: { include: { user: true } },
    },
  });

  return (
    <div className={styles.mainContainer}>
      <p className={styles.mainPostTitle}>{post.title}</p>

      {post && (
        <div className={styles.postIdContainer} key={post.id}>
          <div className={styles.postIdVoteContainer}>
            <button className={styles.clickVote}>⬆️</button>
            {post.votes || 0}
            <button className={styles.clickVote}>⬇️</button>
          </div>

          <div className={styles.innerPostIdContainer}>
            <div className={styles.postIdUserContainer}>
              {post.user && (
                <div className={styles.postIdUsername}>
                  <span className={styles.postPostedBy}>Created By:</span>
                  {post.user.username}
                </div>
              )}
              <div className={styles.iconContainer}>
                <EditPost />
                
                <DeletePost />
              </div>
            </div>

            <div className={styles.postId}>{post.message}</div>

            <div className={styles.statPostIdContainer}>
              
              <MakeComment />

              <div className={styles.postIdDateContainer}>
                <p className={styles.datePostIdStat}>
                  Created: {post.createdAt.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {post &&
        post.children &&
        post.children.map((childPost) => (
          <div key={childPost.id}>
            <ChildrenComments postId={childPost.id} />
          </div>
        ))}
    </div>
  );
}
