// 'use client';
// import { useState, useEffect } from 'react';

// export default function Posts() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`/api/posts`, {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: "",
//           message: "",
//           subredditId: "",
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setPosts(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {posts.map((post, index) => (
//         <div key={index}>
//           <h2>{post.title}</h2>
//           <p>{post.message}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
