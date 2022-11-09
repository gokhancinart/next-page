import Sidebar from "../../../components/Sidebar";
import styles from "../../../styles/Comments.module.css";
import Player from "../../../components/plyr";

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { slug } = params;
  const menuResp = await fetch(
    `https://strapi-test.dopingtech.net/api/ach-cats`);
  const menuData = await menuResp.json();

  const contentResp = await fetch(
    `https://strapi-test.dopingtech.net/api/aches?filters[id][$eq]=${slug}&populate=%2a`);
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

  const detail = contents?.data[0]?.attributes;
  const posterPhoto = contents?.data[0]?.attributes?.videoPoster?.data?.attributes?.url;
  return (
    <>
      <div className={styles.flex}>
        <Sidebar path={path} detailItem={contents} comments={menu} />
        <div className={styles.content}>
          <div className={`${styles.videoItem} ${styles.item} itemShadow`}>
            <h2 className={styles.pageTitle}>{detail.title}</h2>
            <Player videoUrl={detail.typeUrl} posterUrl={`https://strapi-test.dopingtech.net${posterPhoto}`} />
            <div className={styles.text}>{detail.studentName} sınava aşağıdaki paketle hazırlandı 👇</div>
            <div className={styles.package}>PAKET ALANI</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
