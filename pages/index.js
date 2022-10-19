import Link from 'next/link';
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import styles from '../styles/Comments.module.css';
import modal from '../styles/Modal.module.css';
import Player from '../components/plyr';
import { IoCloseCircleOutline } from 'react-icons/io5';

let newvideoUrl = 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8';

export const getServerSideProps = async () => {

  const menuResp = await fetch(`http://localhost:1337/achievements-categories`);
  const menuData = await menuResp.json();

  const contentResp = await fetch(`http://localhost:1337/achievements`);
  const content = await contentResp.json();
  
  return{
    props: { 
      menu : menuData,
      contents : content 
    }
  }

}

const Comments = ({contents, menu}) => {

  const[showModal, setShowModal] = useState(false);
  const[modalContent, setModalContent] = useState('');
  console.log(contents);

  const changedModalContent = (contents) => {
    setModalContent(contents.file_type.formats.medium.url);
    setShowModal(true);
  }

  return (
    <>
    <div className={styles.flex}>
      <Sidebar comments={menu}/>

      <div className={styles.content}>
        <h1>YORUMLAR & BAŞARILARIMIZ</h1>

        <div className={styles.contentWrapper}>
          {contents.map(content=>(
            content.type == 'image' ? (
            <div key={content.id} onClick={()=> changedModalContent(content)}> 
              <div className={styles.item} onClick={()=> setShowModal(true)}>
                <img src={`http://localhost:1337${content.file_type.formats.small.url}`} alt={content.title}/>
                <p className="box-title">{content.title}</p>
              </div>
            </div>
            ) : null
          ))}
        </div>
      
        <div className={styles.contentWrapperVideo}>
          {contents.map(content=>(
            content.type == 'video' ? (  
            <div key={content.id}>
              <a className={`${styles.item} itemShadow`}>
                <Player videoUrl={newvideoUrl}/>
                <Link href={`/comments/detail/${content.id}`}>
                <p className="box-title">{content.title}</p>
                </Link>
              </a>
            </div>
            ) : null
          ))}
        </div>


        {/* <div className={styles.contentWrapper}>
          {contents.map(content=>(
              content.type == 'video' ? ( // if video
                <div key={content.id}>
                  <a className={`${styles.item} itemShadow`}>
                    <Player videoUrl={newvideoUrl}/>
                    <Link href={`/comments/detail/${content.id}`}>
                    <p className="box-title">{content.title}</p>
                    </Link>
                  </a>
                </div>
                )
              : //  if modal
              <div key={content.id} onClick={()=> changedModalContent(content)}> 
                <div className={styles.item} onClick={()=> setShowModal(true)}>
                  <img src={`http://localhost:1337${content.file_type.formats.small.url}`} alt={content.title}/>
                  <p className="box-title">{content.title}</p>
                </div>
              </div>
            ))}
        </div> */}
      </div>

      {showModal ? (
        <div className={modal.overlay} onClick={()=> setShowModal(false)}>
          <div className={modal.modal}>
            <div className={modal.body}>
              <img src={`http://localhost:1337${modalContent}`}/>
            </div>
            <IoCloseCircleOutline className={modal.close} onClick={()=> setShowModal(false)}/>
          </div>
        </div>
      ) : null }

    </div>
    </>
  );
}
 
export default Comments;