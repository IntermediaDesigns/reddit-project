export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const subreddits = await prisma.subreddit.findMany();
  return { props: { initialSubreddits: subreddits } };
}