import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({comments}) => {
  const MAX_LENGTH = 20;
  return (
    <div className={styles.sidebar}>
      <Link href={`/comments`}>
        <a>Tümü</a>
      </Link>
      {comments.map(comment=>(
        <Link href={`/comments/${comment.id}`} key={comment.id}>
          <a>{comment.title.substring(0, MAX_LENGTH)}</a>
        </Link>
      ))}
    </div>
  );
}
 
export default Sidebar;