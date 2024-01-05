export default function totalVotes(post) {

       let totalVotes = 0

    if (post && post.votes) {
      for (let i = 0; i < post.votes.length; i++) {
        if (post.votes[i].isUpvote === true) {
          totalVotes += 1
        } else if (post.votes[i].isUpvote === false) {
          totalVotes -= 1
        }
      }
    }
       return totalVotes
}