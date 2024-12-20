import { Post as PostType } from '../types';

export const Post = ({ post }: { post: PostType }) => (
  <div className='post'>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
  </div>
);

export const Posts = ({ posts }: { posts: PostType[] }) => (
  <div className='posts'>
    {posts.map((post) => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);
