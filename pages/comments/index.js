import Link from 'next/link';
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/Comments.module.css';

export const getStaticProps = async () => {

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  
  return{
    props: { comments : data }
  }

}

const comments = ({comments}) => {
  const[showModal, setShowModal] = useState(false);

  // console.log(comments)
  return (
    <>
    <div className={styles.flex}>
      <Sidebar comments={comments}/>

      <div className={styles.content}>
        <h1>All comments</h1>
        <div className={styles.contentWrapper}>
          {comments.map(comment=>(
            comment.userId == 1 ? ( // if video
              <Link href={`/comments/detail/${comment.id}`} key={comment.id}>
                <a className={styles.item}>
                  <div className={styles.photoBlue}></div>
                  <p>{comment.userId} - {comment.title}</p>
                </a>
              </Link>
              )
            : //  if modal
            <div key={comment.id}> 
              <div className={styles.item} onClick={()=> setShowModal(true)}>
                <div className={styles.photo}></div>
                <p>{comment.userId} - {comment.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal ? (
        <div className={styles.modal}>
          <h3>Selamslar</h3>
          <button onClick={()=> setShowModal(false)}>Close Button</button>
        </div>
      ) : null }
    </div>
    </>
  );
}
 
export default comments;