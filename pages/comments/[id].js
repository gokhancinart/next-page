import Link from "next/link";
import { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import styles from '../../styles/CommentsList.module.css';


export const getStaticPaths = async () =>{
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();

  const paths = posts.map( post => {
    return{
      params: { id: post.id.toString() },
    }
  })

  return{
    paths,
    fallback:false
  }
}

export const getStaticProps = async (context) => {

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${context.params.id}`);
  const posts = await res.json();

  const res2 = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data2 = await res2.json();

  return{
    props:{ post:posts, comments : data2}
  }

}

const Details = ( {post, comments} ) => {
  const[dataPost, setDataPost] = useState(comments);
  console.log(post)
  return ( 
    <>
      <div className={styles.flex}>
        <Sidebar comments={dataPost}/>
        <div className={styles.content}>
          <h1>All comments</h1>
          <div className={styles.contentWrapper}>
            {post.map(comment=>(
              <Link href={`/comments/detail/${comment.id}`} key={comment.id}>
                <a className={styles.item}>
                  <div className={styles.photo}></div>
                  <p>{comment.title}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Details;