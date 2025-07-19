import React, { useState, useEffect } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BsTag } from "react-icons/bs";
import { FiArrowRight, FiInfo } from 'react-icons/fi';
import Button from "../Components/Button";

export default function BlogSection() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const backendURL = import.meta.env.VITE_BACKEND_URL;


  // Fetch blogs
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${backendURL}/api/blogs`);
        const data = await res.json();
        if (res.ok && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (e) {
        console.error('Error fetching blogs:', e);
        setError('Unable to load blog posts.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Responsive card count
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCards(1);
      else if (width < 768) setVisibleCards(2);
      else if (width < 1024) setVisibleCards(3);
      else setVisibleCards(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showPrevious = () => startIndex > 0 && setStartIndex(startIndex - 1);
  const showNext = () => startIndex + visibleCards < blogs.length && setStartIndex(startIndex + 1);

  if (loading) return <div className="text-center py-10">Loading blogs...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="relative bg-color py-10 px-4 sm:px-6 lg:px-16 pb-30">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2 oxygen-bold">Blogs</h2>
      <p className="text-center text-gray-500 mb-10 max-w-3xl mx-auto oxygen-regular">
        Dive into our latest articles about technology, programming trends, and industry insights.
      </p>

      <div className="relative group">
        {/* Arrows */}
        {startIndex > 0 && (
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
            <button onClick={showPrevious} className="bg-white p-2 rounded-full shadow hover:bg-gray-50 hover:scale-110 transition">
              <ChevronLeft size={24} />
            </button>
          </div>
        )}
        {startIndex + visibleCards < blogs.length && (
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
            <button onClick={showNext} className="bg-white p-2 rounded-full shadow hover:bg-gray-50 hover:scale-110 transition">
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Blog Cards */}
        <div className="overflow-hidden pt-2 rounded-md">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(100 / visibleCards) * startIndex}%)` }}
          >
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 cursor-pointer"
                onClick={() => navigate(`/all-blogs/${blog._id}`)}
              >
                <div className="bg-orange-100 border border-orange-200 rounded-md hover:bg-orange-50 shadow hover:shadow-xl transition-all overflow-hidden">
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-52 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-700 oxygen-bold">{blog.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1 oxygen-regular">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      <span>{new Date(blog.createdAt).toLocaleString()}</span>
                    </div>

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

                    <div className="relative mt-3 max-h-[4.5em] overflow-hidden mb-3 oxygen-light">
                      <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: blog.description }}></p>
                      <div className="absolute bottom-0 right-0 bg-gradient-to-l from-orange-100  pl-5">
                        <ArrowRight
                          className="w-4 h-4 text-orange-900"
                          title="Read more"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex justify-center">
          {/* <button
            onClick={() => navigate('/all-blogs')}
            className="flex items-center justify-between bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition text-xs font-semibold shadow-md gap-3 oxygen-bold"
          >
            <span className="ml-1">Read All Blogs</span>
            <div className="bg-white text-black p-1.5 rounded-full">
            <FiArrowRight className="text-base" />
            </div>
          </button> */}
          <Button title="Read All Blogs" to="/all-blogs" />
        </div>
      </div>
    </div>
  );
}
