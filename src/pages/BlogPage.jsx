import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ChevronRight, Tag, Loader } from 'lucide-react';
import { client, urlFor } from '../client';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All");

    // Fetch posts from Sanity
    useEffect(() => {
        const query = `*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            mainImage,
            publishedAt,
            "authorName": author->name,
            "authorImage": author->image,
            "categories": categories[]->title,
            body
        }`;

        client.fetch(query)
            .then((data) => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch(console.error);
    }, []);

    // Extract all unique categories dynamically
    const allCategories = ["All", ...new Set(posts.flatMap(post => post.categories || []))];

    // Filter Logic
    const filteredPosts = activeFilter === "All"
        ? posts
        : posts.filter(post => post.categories && post.categories.includes(activeFilter));

    // Separate featured post (First one is featured)
    const featuredPost = filteredPosts[0];
    const otherPosts = filteredPosts.slice(1);

    // Helpers
    // Estimate read time (simple logic: 200 words per minute)
    const getReadTime = (blocks) => {
        if (!blocks) return "3 min read";
        // Handle array of blocks or raw string (though sanity usually returns blocks)
        if (Array.isArray(blocks)) {
            const text = blocks.map(block =>
                block.children ? block.children.map(child => child.text).join(" ") : ""
            ).join(" ");
            const words = text.split(" ").length;
            return `${Math.ceil(words / 200)} min read`;
        }
        return "3 min read";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Recently";
        return new Date(dateString).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader className="animate-spin text-sky-500" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-24 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-sky-500 font-bold tracking-widest uppercase text-sm">The Local Journal</span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-2 mb-6">
                        Stories & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Secrets.</span>
                    </h1>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {allCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${activeFilter === cat
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                                    : "bg-white text-slate-500 border-slate-200 hover:border-sky-300 hover:text-sky-600"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* FEATURED POST (Takes 2 Columns) */}
                    {featuredPost && (
                        <Link to={`/blog/${featuredPost.slug.current}`} className="lg:col-span-2 block">
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer"
                            >
                                {featuredPost.mainImage && (
                                    <img
                                        src={urlFor(featuredPost.mainImage).width(800).url()}
                                        alt={featuredPost.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                                    {featuredPost.categories && (
                                        <span className="bg-sky-500 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase mb-4 inline-block">
                                            {featuredPost.categories[0]}
                                        </span>
                                    )}
                                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight group-hover:text-sky-300 transition-colors">
                                        {featuredPost.title}
                                    </h2>

                                    <div className="flex items-center gap-6 text-slate-400 text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            {/* Author Avatar Placeholder if no image */}
                                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold overflow-hidden">
                                                {featuredPost.authorImage ? (
                                                    <img src={urlFor(featuredPost.authorImage).width(64).url()} alt="Author" className="w-full h-full object-cover" />
                                                ) : (
                                                    featuredPost.authorName?.[0] || "A"
                                                )}
                                            </div>
                                            {featuredPost.authorName || "Anonymous"}
                                        </div>
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(featuredPost.publishedAt)}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {getReadTime(featuredPost.body)}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    )}

                    {/* SIDEBAR / OTHER POSTS LIST */}
                    <div className="flex flex-col gap-6">
                        <AnimatePresence>
                            {otherPosts.length > 0 ? (
                                otherPosts.map((post) => (
                                    <Link to={`/blog/${post.slug.current}`} key={post._id} className="block">
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-sky-100 transition-all cursor-pointer group flex gap-4 items-center"
                                        >
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-200">
                                                {post.mainImage && (
                                                    <img
                                                        src={urlFor(post.mainImage).width(200).url()}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                    />
                                                )}
                                            </div>

                                            <div>
                                                {post.categories && (
                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-sky-500 mb-1">
                                                        <Tag size={10} /> {post.categories[0]}
                                                    </div>
                                                )}
                                                <h3 className="font-bold text-slate-900 leading-tight mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-slate-400 text-xs">
                                                    <span className="flex items-center gap-1"><Clock size={12} /> {getReadTime(post.body)}</span>
                                                    <span className="group-hover:translate-x-1 transition-transform"><ChevronRight size={14} /></span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))
                            ) : (
                                !isLoading && posts.length > 1 && (
                                    <div className='p-4 text-center text-slate-400'>No other posts found.</div>
                                )
                            )}
                        </AnimatePresence>

                        {/* Newsletter Box */}
                        <div className="bg-slate-900 rounded-3xl p-8 text-center text-white relative overflow-hidden mt-auto">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500 rounded-full blur-[60px] opacity-20" />
                            <h3 className="text-xl font-bold mb-2">Never Miss a Deal?</h3>
                            <p className="text-slate-400 text-sm mb-6">Get secret offers and travel guides directly in your inbox.</p>
                            <div className="flex gap-2">
                                <input type="email" placeholder="Your email" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500" />
                                <button className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-xl font-bold transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default BlogPage;