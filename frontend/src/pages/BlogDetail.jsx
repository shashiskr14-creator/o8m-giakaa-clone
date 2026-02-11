import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getBlogBySlug } from "../services/api";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  const siteUrl = useMemo(() => {
    return import.meta.env.VITE_SITE_URL || window.location.origin;
  }, []);

  useEffect(() => {
    getBlogBySlug(slug).then((res) => setBlog(res.data)).catch(console.error);
  }, [slug]);

  if (!blog) return <p style={{ padding: 20 }}>Loading...</p>;

  const url = `${siteUrl}/blog/${blog.slug}`;

  return (
    <>
      <Helmet>
        <title>{blog.metaTitle}</title>
        <meta name="description" content={blog.metaDescription} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.metaTitle} />
        <meta property="og:description" content={blog.metaDescription} />
        {!!blog.featuredImage && <meta property="og:image" content={blog.featuredImage} />}
        <meta property="og:url" content={url} />

        <link rel="canonical" href={url} />
      </Helmet>

      <div style={{ padding: 20, maxWidth: 1000, margin: "0 auto" }}>
        <h1>{blog.title}</h1>
        {!!blog.featuredImage && (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            loading="lazy"
            width="800"
            style={{ borderRadius: 14, display: "block", margin: "12px 0" }}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </>
  );
}
