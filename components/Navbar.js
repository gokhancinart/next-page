import Link from 'next/link'
import { useRouter } from 'next/router'
import { navLinks } from '../utils/data';

const Navbar = () => {

  const router = useRouter()

  return (
    <nav>
      <div className="logo">
        <Link href='/'> 
          <a>
            TEST
          </a>
        </Link>
      </div>
      {navLinks.map((link, index)=>{
        return(
          <Link href={link.path} key={index}>
            <a className={router.asPath == `${link.path}` ? '' : '' }>{link.name}</a>
          </Link>
        )
      })}
    </nav>
  );

}
 
export default Navbar;