export const getStaticPaths = async () =>{
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();

  const paths = posts.map( post => {
    return{
      params: { slug: post.id.toString() },
    }
  })

  return{
    paths,
    fallback:false
  }
}

export const getStaticProps = async (context) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${context.params.slug}`);
  const posts = await res.json();

  return{
    props:{ post:posts}
  }

}

const Details = ({post}) => {
  console.log(post)
  return ( 
    <>
       <p>{post[0].title}</p>
    </>
   );
}
 
export default Details;