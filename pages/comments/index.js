import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/Comments.module.css";
import modal from "../../styles/Modal.module.css";
import Player from "../../components/plyr";
import { IoCloseCircleOutline } from "react-icons/io5";

export const getServerSideProps = async () => {
  const menuResp = await fetch(`https://strapi-test.dopingtech.net/api/aches`);
  const menuData = await menuResp.json();

  const contentResp = await fetch(
    `https://strapi-test.dopingtech.net/api/aches?populate=%2A`);
  const content = await contentResp.json();

  return {
    props: {
      menu: menuData,
      contents: content,
    },
  };
};

const Comments = ({ contents, menu }) => {
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
          {contents.data.map((content, i) => {
            return (
              <div key={i}>
                <h2 className={styles.pageTitle}>{content.attributes.title}</h2>
                <div className={styles.contentWrapper}>
                  {content.attributes.achievement.map((ach, i) => {
                    if (ach?.mediaType == "image") {
                      return (
                        <div
                          className={styles.imgItem}
                          key={i}
                          onClick={() => changedModalContent(ach.mediaUrl)}
                        >
                          <div
                            className={styles.item}
                            onClick={() => setShowModal(true)}
                          >
                            <img
                              src={`${ach?.mediaUrl}`}
                              alt={ach?.studentName}
                            />
                            <p className={styles.boxTitle}>
                              {ach?.studentName}
                            </p>
                          </div>
                        </div>
                      );
                    } else if (ach?.mediaType == "video") {
                      return (
                        <div className={styles.videoItem} key={i}>
                          <a className={`${styles.item} itemShadow`}>
                            <Player videoUrl={ach.mediaUrl} />
                            <Link href={`/comments/detail/${ach.id}`}>
                              <p className={styles.boxTitle}>
                                {ach.studentName}
                              </p>
                            </Link>
                          </a>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {showModal ? (
          <div className={modal.overlay} onClick={() => setShowModal(false)}>
            <div className={modal.modal}>
              <div className={modal.body}>
                <img src={`${modalContent}`} />
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

export default Comments;
