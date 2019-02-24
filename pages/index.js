import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';

const Index = props => {
  return (
    <Layout>
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows.map(({ show }) => (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          h1,
          a {
            font-family: 'Arial';
          }

          ul {
            padding: 0;
          }

          li {
            list-style: none;
            margin: 5px 0;
          }

          a {
            text-decoration: none;
            color: blue;
          }

          a:hover {
            opacity: 0.6;
          }
        `}
      </style>
    </Layout>
  );
};

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data
  };
};

// const PostLink = ({ id, title }) => {
//   return (
//     <li>
//       <Link as={`p/${id}`} href={`post?title=${title}`}>
//         <a>{title}</a>
//       </Link>
//     </li>
//   );
// };

// const Index = () => (
//   <Layout>
//     <h1>My Posts</h1>
//     <ul>
//       <PostLink id="hello-nextjs" title="Hello Next.js" />
//       <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
//       <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
//     </ul>
//   </Layout>
// );
export default Index;
