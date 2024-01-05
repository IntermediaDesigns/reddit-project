export function getNumberOfVotes(postId, votes) {
       const postVotes = votes.filter(vote => vote.postId === postId);

       let numberOfVotes = 0;

       for (let i = 0; i < postVotes.length; i++) {
              if (postVotes[i].isUpvote === true) {
                     numberOfVotes+= 1;
              } else if (postVotes[i].isUpvote === false) {
                     numberOfVotes -= 1;
              }
       }
       return numberOfVotes;
}