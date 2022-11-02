import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ comments}) => {
  const router = useRouter()
  return (
    <div className={styles.sidebar}>
      <Link href={`/comments`}>
        <a>Tümünü Göster</a>
      </Link>
      {comments.data.map((comment, i) => (
        <div key={i}>
          <Link href={`/comments/${comment.id}`} >
            <a className={
              (
                router.asPath == `${`/comments/${comment.id}`}` ||
                router.asPath == `${`/comments/detail/${comment.id}`}`
              ) ? styles.active : 'active'}>{comment.attributes.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;