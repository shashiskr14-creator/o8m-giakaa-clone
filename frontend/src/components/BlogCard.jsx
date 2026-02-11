const BlogCard = ({ blog }) => {
  return (
    <div>
      <img src={blog.coverImage} alt={blog.title} />
      <h3>{blog.title}</h3>
      <p>{blog.excerpt}</p>
      <a href={`/blogs/${blog.slug}`}>Read More</a>
    </div>
  );
};

export default BlogCard;
