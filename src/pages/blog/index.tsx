import React from "react";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogPost from "@/components/blog/BlogPost";

const blogPosts = [
  {
    id: "year-end-update-2024",
    title: "Visualize Livepeer AI Inference Metrics Using Grafana",
    date: "Dec 16, 2024",
    author: "Livepeer Team",
    description:
      "As 2024 comes to a close, we're excited to share the latest updates...",
    image: "/images/year-end-2024.jpg",
    content: (
      <>
        <p>
          As 2024 comes to a close, we&apos;re excited to share the latest
          updates...
        </p>
        {/* Add more content */}
      </>
    ),
  },

  {
    id: "year-end-update-2024",
    title: "2024 Year-End Update: Real-time AI Launch",
    date: "Dec 16, 2024",
    author: "Livepeer Team",
    description:
      "As 2024 comes to a close, we're excited to share the latest updates...",
    image: "/images/year-end-2024.jpg",
    content: (
      <>
        <p>
          As 2024 comes to a close, we&apos;re excited to share the latest
          updates...
        </p>
        {/* Add more content */}
      </>
    ),
  },
  {
    id: "year-end-update-2024",
    title: "2024 Year-End Update: Real-time AI Launch",
    date: "Dec 16, 2024",
    author: "Livepeer Team",
    description:
      "As 2024 comes to a close, we're excited to share the latest updates...",
    image: "/images/year-end-2024.jpg",
    content: (
      <>
        <p>
          As 2024 comes to a close, we&apos;re excited to share the latest
          updates...
        </p>
        {/* Add more content */}
      </>
    ),
  },
  // Add more blog posts
];

export default function BlogPage() {
  return (
    <BlogLayout>
      {blogPosts.map((post) => (
        <BlogPost key={post.id} {...post} />
      ))}
    </BlogLayout>
  );
}
