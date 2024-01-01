import styles from '@/app/page.module.css';
import { prisma } from '@/app/lib/prisma.js';
import { HiXCircle } from 'react-icons/hi';
import { HiPencilAlt } from 'react-icons/hi';
import ChildrenComments from '@/app/components/ChildrenComments.jsx';
import ChildrenOfChildrenComments from '@/app/components/ChildrenOfChildrenComments.jsx';

export default async function postIdPage({ params }) {
  const { postId } = params;
  const post = await prisma.post.findFirst({
    where: { parentId: null, id: postId },
    include: { user: true, subreddit: true, children: true },
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
                <div className={styles.editBtn}>
                  <HiPencilAlt />
                </div>
                <div className={styles.deleteBtn}>
                  <HiXCircle />
                </div>
              </div>
            </div>

            <div className={styles.post}>{post.message}</div>

            <div className={styles.statPostIdContainer}>
              <button className={styles.commentBtn}>
                <span className={styles.spanComment}>Comment</span>
              </button>

              <div className={styles.postIdDateContainer}>
                <p className={styles.datePostIdStat}>
                  Created: {post.createdAt.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {post && post.children && post.children.length > 0 && (
        <ChildrenComments postId={post.id} />
      )}

      {post &&
        post.children &&
        post.children.map((childPost) => (
          <ChildrenOfChildrenComments
            key={childPost.id}
            postId={childPost.id}
          />
        ))}
    </div>
  );
}
