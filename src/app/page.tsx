import Image from "next/image";
import next from "next/types";

// 'use client'
async function getBlogs() {
  const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=product`, { cache: 'no-store', next:{revalidate:60} });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();
  console.log(blogs);
  
  return (
    <ul>
      {blogs.items.map((item: any) => (
        <ul key={item.sys.id}>
          <li>{item.fields.title}</li>
          <p>{item.fields.description}</p>
          <p>{item.fields.date}</p>
          {/* <Image src={item.fields.image} alt="" /> */}
        </ul>
      ))}
    </ul>
  )
}