// import React, { useEffect, useState } from 'react';
// import Navbar from './Navbar';
// import { useNavigate } from 'react-router-dom';
// import { BsTag } from "react-icons/bs";

// export default function AllBlogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [selectedTag, setSelectedTag] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 8;
//   const navigate = useNavigate();

//   const fetchBlogs = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/blogs');
//       const data = await response.json();
//       const sorted = data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setBlogs(sorted);
//       setFilteredBlogs(sorted);

//       const allTags = new Set(sorted.flatMap(blog => blog.tags || []));
//       setTags(['All', ...allTags]);
//     } catch (error) {
//       console.error('Error fetching blogs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // Combined filter: tag + search
//   useEffect(() => {
//     let filtered = blogs;

//     if (selectedTag !== 'All') {
//       filtered = filtered.filter(blog => blog.tags?.includes(selectedTag));
//     }

//     if (searchTerm.trim() !== '') {
//       filtered = filtered.filter(blog =>
//         blog.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredBlogs(filtered);
//   }, [searchTerm, selectedTag, blogs]);

//   const handleTagFilter = (tag) => {
//     setSelectedTag(tag);
//     setCurrentPage(1);
//   };

//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
//   const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

//   return (
//     <div>
//       <Navbar />
//       <div className="bg-color px-4 py-6 sm:px-6 lg:px-16 pt-16">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Blogs</h1>

//         {/* 🔍 Search Bar */}
//         <div className="flex justify-center mb-6">
//           <input
//             type="text"
//             placeholder="Search blogs by title..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
//           />
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap justify-center gap-2 mb-8">
//           {tags.map(tag => (
//             <button
//               key={tag}
//               onClick={() => handleTagFilter(tag)}
//               className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium border transition ${
//                 selectedTag === tag
//                   ? 'bg-purple-600 text-white'
//                   : 'bg-gray-100 text-gray-800 hover:bg-purple-100'
//               }`}
//             >
//               {tag}
//             </button>
//           ))}
//         </div>

//         {/* Blog Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {currentBlogs.length === 0 ? (
//             <p className="text-center text-gray-500 col-span-3 oxygen-bold">No blogs found.</p>
//           ) : (
//             currentBlogs.map(blog => (
//               <div
//                 key={blog._id}
//                 onClick={() => navigate(`/all-blogs/${blog._id}`)}
//                 className="cursor-pointer bg-orange-100 border rounded-sm shadow transition-transform hover:-translate-y-1 hover:bg-orange-50 hover:shadow-lg overflow-hidden flex flex-col"
//               >
//                 <img
//                   src={blog.imageUrl}
//                   alt={blog.title}
//                   className="w-full h-48 object-cover hover:cursor-pointer"
//                 />
//                 <div className="p-4 flex flex-col flex-grow">
//                   <h3 className="text-lg font-bold text-gray-800 hover:cursor-pointer oxygen-bold">
//                     {blog.title}
//                   </h3>

//                   {/* Render HTML description safely */}
//                   <div
//                     className="text-gray-600 mt-1 text-sm line-clamp-3 flex-grow oxygen-regular"
//                     dangerouslySetInnerHTML={{ __html: blog.description }}
//                   />

//                   <div className="text-xs text-gray-500 mt-5 oxygen-regular">
//                     {new Date(blog.createdAt).toDateString()}
//                   </div>

//                   {/* Tags */}
//                   {blog.tags?.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {blog.tags.map((tag, idx) => (
//                         <span
//                           key={idx}
//                           className="flex items-center gap-1 bg-orange-900/20 text-orange-900 text-xs font-medium px-2 py-1 rounded-full "
//                         >
//                           <BsTag className="w-3 h-3 text-orange-900" />
//                           {tag.trim()}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
//               disabled={currentPage === 1}
//             >
//               Prev
//             </button>

//             {[...Array(totalPages)].map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentPage(idx + 1)}
//                 className={`px-3 py-1 rounded text-sm ${
//                   currentPage === idx + 1
//                     ? 'bg-purple-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
//                 }`}
//               >
//                 {idx + 1}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { BsTag, BsSearch } from 'react-icons/bs';
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/blogs');
      const data = await response.json();
      const sorted = data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBlogs(sorted);
      setFilteredBlogs(sorted);
      const allTags = new Set(sorted.flatMap(blog => blog.tags || []));
      setTags(['All', ...allTags]);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs;
    if (selectedTag !== 'All') {
      filtered = filtered.filter(blog => blog.tags?.includes(selectedTag));
    }
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedTag, blogs]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchInput);
    }
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div>
      <Navbar />

      {/* Dark header section */}
      <div className="bg-gray-900 text-white py-12 px-4 sm:px-10 lg:px-20 pt-30">
        <h1 className="text-3xl sm:text-4xl text-center font-semibold mb-6 oxygen-bold">
          Search the Knowledge Base
        </h1>
        <div className="max-w-2xl w-full mx-auto relative">
          <input
            type="text"
            placeholder="Search blogs by title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full p-3 pl-5 pr-12 text-white bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-gray-300 oxygen-regular"
          />
          <BsSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-lg" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 pb-4 oxygen-regular ">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium transition oxygen-regular  ${
                selectedTag === tag
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-orange-100 hover:bg-orange-400/30'
              }`}
            >
              <BsTag className="w-3 h-3" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main content section */}
      <div className="bg-color px-4 py-6 sm:px-6 lg:px-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 oxygen-bold">
          {selectedTag !== 'All' ? `Results for - ${selectedTag}` : 'Recent Blogs'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBlogs.length === 0 ? (
            <p className="text-center text-gray-500 col-span-4 oxygen-bold">No blogs found.</p>
          ) : (
            currentBlogs.map(blog => (
              <div
                key={blog._id}
                onClick={() => navigate(`/all-blogs/${blog._id}`)}
                className="cursor-pointer bg-orange-100 border border-orange-200 rounded-sm shadow hover:-translate-y-1 hover:bg-orange-50 hover:shadow-lg overflow-hidden flex flex-col"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 oxygen-bold">{blog.title}</h3>
                  <div
                    className="text-gray-600 mt-1 text-sm line-clamp-3 flex-grow oxygen-regular"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                  <div className="text-xs text-gray-500 mt-5 oxygen-regular">
                    {new Date(blog.createdAt).toDateString()}
                  </div>

                  {/* Blog Tags */}
                  {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {blog.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 bg-orange-900/20 text-orange-900 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          <BsTag className="w-3 h-3 text-orange-900" />
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 pb-10 pt-8 flex-wrap">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={`flex items-center gap-2 px-5 py-2 rounded text-sm oxygen-regular transition 
                ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-gray-900 text-orange-100 hover:bg-gray-800'}`}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-1.5 rounded text-sm font-medium transition ${
                  currentPage === idx + 1
                    ? 'bg-gray-900 text-orange-100'
                    : 'bg-gray-100 text-gray-800 hover:bg-orange-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={`flex items-center gap-2 px-5 py-2 rounded text-sm oxygen-regular transition 
                ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-gray-900 text-orange-100 hover:bg-gray-800'}`}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
