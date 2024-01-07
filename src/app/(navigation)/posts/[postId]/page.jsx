import styles from '@/app/page.module.css';
import { prisma } from '@/app/lib/prisma.js';
import ChildrenComments from '@/app/components/ChildrenComments.jsx';
import MakeComment from '@/app/components/MakeComment.jsx';
import DeletePost from '@/app/components/DeletePost.jsx';
import Post from '@/app/components/Post.jsx';
import Votes from '@/app/components/Votes.jsx';
import { fetchUser } from '@/app/lib/fetchUser.js';

export default async function postIdPage({ params }) {

  const { postId } = params;
  const post = await prisma.post.findFirst({
    where: { parentId: null, id: postId },
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      subreddit: true,
      children: { include: { user: true } },
    },
  });

  const user = await fetchUser();

  return (
    <div className={styles.mainContainer}>
      <p className={styles.mainPostTitle}>{post.title}</p>

      {post && (
        <div className={styles.postIdContainer} key={post.id}>
          <Votes post={post} user={user}/>

          <div className={styles.innerPostIdContainer}>
            <div className={styles.postIdUserContainer}>
              {post.user && (
                <div className={styles.postIdUsername}>
                  <span className={styles.postPostedBy}>Created By:</span>
                  {post.user.username}
                </div>
              )}
              <div className={styles.iconContainer}>
                <DeletePost post={post} user={user} />
              </div>
              
            </div>
            
            <Post post={post} user={user}/>
             
            <div className={styles.statPostIdContainer}>
              <MakeComment parentId={post.id} subredditId={post.subredditId} user={user} post={post}/>

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
