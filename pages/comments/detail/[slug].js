import Sidebar from "../../../components/Sidebar";
import styles from "../../../styles/Comments.module.css";
import Player from "../../../components/plyr";

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { slug } = params;

  const menuResp = await fetch(`https://strapi-test.dopingtech.net/api/aches`);
  const menuData = await menuResp.json();

  const contentResp = await fetch(
    `https://strapi-test.dopingtech.net/api/aches?filters[achievement][id][$eq]=${slug}&populate=%2a`
  );
  const contentData = await contentResp.json();

  return {
    props: {
      menu: menuData,
      contents: contentData,
      path: slug,
    },
  };
};

const Details = ({ contents, menu, path }) => {
  return (
    <>
      <div className={styles.flex}>
        <Sidebar path={path} detailItem={contents} comments={menu} />
        <div className={styles.content}>
          {contents.data.map((content, i) => {
            return (
              <div className={styles.contentWrapperVideo} key={i}>
                {content.attributes.achievement.map((ach, i) => {
                  if (ach?.mediaType == "video" && ach?.id == path) {
                    return (
                      <div className={`${styles.videoItem} ${styles.item} itemShadow`} key={i}>
                        <h2 className={styles.pageTitle}>{ach.studentName}</h2>
                        <Player videoUrl={ach.mediaUrl} />
                        <div className={styles.text}>{ach.studentName} sınava aşağıdaki paketle hazırlandı 👇</div>
                        <div className={styles.package}>PAKET ALANI</div>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Details;
