import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TbListDetails } from "react-icons/tb";
import Navbar from './Navbar';
import { BsTag } from "react-icons/bs";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import {ChevronRight } from 'lucide-react' ; 
import { Link } from "react-router-dom";

export default function SpecificBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL ; 
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${backendURL}/api/all-blogs/${id}`);
        const data = await response.json();
        setBlog(data.blog);

        const relatedResponse = await fetch(`${backendURL}/api/all-blogs/related`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tags: data.blog.tags, exclude: data.blog._id }),
        });

        const relatedData = await relatedResponse.json();
        setRelatedBlogs(relatedData.blogs || []);
      } catch (error) {
        console.error('Error fetching blog or related blogs:', error);
        setRelatedBlogs([]);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="bg-color min-h-screen">
      <Navbar />
      {/* Overlaid Back Button
            <button
              className="absolute top-3 left-4 z-0 flex items-center gap-2 px-3 py-1 text-purple-700 font-semibold text-sm rounded-full hover:bg-gray-200 transition"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
              Back
            </button> */}

      <div className="px-4 sm:px-6 lg:px-16 pt-[80px] pb-10"> {/* top padding added */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Blog Content */}
          <div className="lg:w-2/3 bg-color p-6 relative border-t-4 border-orange-900">

            {/* Responsive Blog Image */}
            <div className="w-full h-[300px] md:h-[400px] bg-orange-200 rounded overflow-hidden flex items-center justify-center  ">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full 
                  object-cover md:object-contain"
              />
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mt-6 oxygen-bold">{blog.title}</h1>

            <div className="text-sm text-gray-600 mt-3 flex items-center gap-2 oxygen-regular">
              <FaCalendarAlt className="text-orange-900" />
              {new Date(blog.createdAt).toDateString()}
            </div>

            {/* <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-purple-100 text-purple-800 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div> */}

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 bg-orange-900/20 text-orange-900 text-xs font-medium px-2 py-1 rounded-full "
              >
              <BsTag className="w-3 h-3 text-orange-900" />
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <div
              className="mt-6 text-gray-800 text-lg leading-relaxed oxygen-regular"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />

            {/* Social Icons */}
            <div className="mt-10 flex gap-5 text-orange-900 text-2xl">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin className="hover:text-orange-950" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter className="hover:text-orange-950" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook className="hover:text-orange-950" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="hover:text-orange-950" />
              </a>
            </div>
          </div>

          {/* Related Blogs Section */}
          <div className="lg:w-1/3 pb-6 border-t-4 border-orange-900">
            <div className='bg-orange-100 h-auto pb-6'>
              <h2 className="text-2xl font-semibold text-orange-900 mb-4 pl-5 pt-2 pb-1 ">Related Posts</h2>
              <div className="space-y-5">
                {relatedBlogs.length > 0 ? (
                  relatedBlogs.map((rel) => (
                    <div
                      key={rel._id}
                      className="flex gap-4 cursor-pointer hover:bg-orange-200 p-3 rounded-lg"
                      onClick={() => navigate(`/all-blogs/${rel._id}`)}
                    >
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        className="w-40 h-20 object-cover rounded-sm"
                      />
                      <div>
                        <h3 className="text-base font-semibold text-gray-800 line-clamp-2 oxygen-bold">
                          {rel.title}
                        </h3>
                        <div className="text-xs text-gray-600 flex items-center gap-1 mt-2 oxygen-regular">
                          <FaCalendarAlt className="text-orange-900" />
                          {new Date(rel.createdAt).toDateString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center h-full mt-15'>
                      <div>
                        <TbListDetails className='w-20 h-20 text-gray-400 mb-2 text-center' />
                        <p className="text-sm text-gray-500 text-center">No related blogs found.</p>
                      </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center pt-5">
              <Link to="/all-blogs">
                <button className="flex items-center gap-8 bg-transparent border rounded-sm p-2 pl-4 pr-4 hover:bg-gray-900/90 hover:text-white oxygen-regular border-gray-900 text-gray-900 cursor-pointer">
                  Read all blogs <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
