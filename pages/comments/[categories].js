import Link from "next/link";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/Comments.module.css";
import modal from "../../styles/Modal.module.css";
import Player from "../../components/plyr";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { categories } = params;
  const menuResp = await fetch(`https://strapi-test.dopingtech.net/api/ach-cats`);
  const menuData = await menuResp.json();

  const contentResp = await fetch(
    `https://strapi-test.dopingtech.net/api/aches?filters[achievement_cat][id][$eq]=${categories}&populate=%2a`
  );
  const contentData = await contentResp.json();

  return {
    props: {
      menu: menuData,
      contents: contentData,
      categories: categories,
    },
  };
};

const Details = ({ contents, menu ,categories }) => {

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const changedModalContent = (modalImg) => {
    setModalContent(modalImg);
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.flex}>
        <Sidebar comments={menu} />
        <div className={styles.content}>
          {menu.data.map((heading, i) => (
            <div key={i}>
              {router.query.categories == heading.id ? ( <h1>{heading?.attributes?.title}</h1> ) : null}
            </div>
          ))}
          <div className={styles.contentWrapper}>
            {contents.data.map((content, i) => {
              if (content?.attributes.type == "image" && content?.attributes?.isHighlighted) {
                return (
                  <div 
                    className={styles.imgItem} 
                    key={i} 
                    onClick={() => changedModalContent(content?.attributes?.typeUrl)}
                    >
                    <div 
                      className={styles.item} 
                      onClick={() => setShowModal(true)}
                      >
                      <Image 
                        width={200}
                        height={200}
                        src={`${content?.attributes?.typeUrl}`} 
                        alt={content?.attributes?.title}
                      />
                      <p 
                        className={styles.boxTitle}>
                        {content?.attributes?.title}
                      </p>
                    </div>
                  </div>
                )
              }
            })}
          </div>
          <div className={styles.contentWrapperVideo}>
            {contents.data.map((content, i) => {
              if ( content?.attributes.type == "video" && content?.attributes?.isHighlighted ) {
                return (
                  <div className={styles.videoItem} key={i}>
                    <a className={`${styles.item} itemShadow`}>
                      <Player videoUrl={content?.attributes?.typeUrl} posterUrl={`https://strapi-test.dopingtech.net${content?.attributes?.videoPoster?.data?.attributes?.url}`} />
                      <Link href={`/comments/detail/${content?.id}`}>
                        <p className={styles.boxTitle}>
                          {content?.attributes?.title}
                        </p>
                      </Link>
                    </a>
                  </div>
                )
              }
            })}
          </div>
        </div>

        {showModal ? (
          <div className={modal.overlay} onClick={() => setShowModal(false)}>
            <div className={modal.modal}>
              <div className={modal.body}>
                <Image 
                width={500}
                height={500}
                src={`${modalContent}`}
                alt="" 
                />
              </div>
              <IoCloseCircleOutline
                className={modal.close}
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Details;
