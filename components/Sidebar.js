import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({comments}) => {

  const router = useRouter()
  return (
    <div className={styles.sidebar}>
      <Link href={`/`}>
        <a>Tümünü Göster</a>
      </Link>
      {comments.map(comment=>(
        <Link href={`/comments/${comment.id}`} key={comment.id}>
          <a className={router.asPath == `${`/comments/${comment.id}`}` ? styles.active : '' }>{comment.title}</a>
        </Link>
      ))}
    </div>
  );
}
 
export default Sidebar;