import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the post
    const post = blogPosts.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // If post not found, go back
    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
                <button
                    onClick={() => navigate('/blog')}
                    className="text-sky-500 font-bold hover:underline"
                >
                    Back to Blog
                </button>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-white pt-24 pb-20 font-sans">

            {/* Progress Bar (Optional nice touch) */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-sky-500 origin-left z-50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
            />

            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                {/* Back Link */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-500 font-bold mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Stories
                </Link>

                {/* Header */}
                <header className="mb-10 text-center">
                    <div className="inline-block px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        {post.category}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-slate-500 text-sm font-medium border-y border-slate-100 py-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                                {post.author[0]}
                            </div>
                            {post.author}
                        </div>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                    </div>
                </header>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-3xl overflow-hidden shadow-2xl mb-12 aspect-video"
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="prose prose-lg prose-slate mx-auto prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-sky-500 prose-img:rounded-2xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Share Section */}
                <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-900">Share this article:</span>
                    <div className="flex gap-3">
                        <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"><Facebook size={20} /></button>
                        <button className="p-2 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-100 transition-colors"><Twitter size={20} /></button>
                        <button className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"><Share2 size={20} /></button>
                    </div>
                </div>

            </div>
        </article>
    );
};

export default BlogPost;
