import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../client';
import { PortableText } from '@portabletext/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin, Share2, AlertCircle } from 'lucide-react';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const ptComponents = {
        types: {
            image: ({ value }) => {
                if (!value?.asset?._ref) return null;
                return (
                    <div className="my-8 relative rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src={urlFor(value).width(800).fit('max').auto('format').url()}
                            alt={value.alt || 'Blog Image'}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                );
            }
        },
        block: {
            h1: ({ children }) => <h1 className="text-4xl font-black text-slate-900 mt-10 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-3xl font-bold text-slate-800 mt-8 mb-4 border-l-4 border-sky-500 pl-4">{children}</h2>,
            h3: ({ children }) => <h3 className="text-2xl font-bold text-slate-800 mt-6 mb-3">{children}</h3>,
            normal: ({ children }) => <p className="text-lg text-slate-600 leading-relaxed mb-6">{children}</p>,
            blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-sky-500 pl-6 py-2 my-6 bg-sky-50 rounded-r-xl italic text-slate-700 text-xl font-medium">
                    "{children}"
                </blockquote>
            ),
        },
        list: {
            bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-600 text-lg">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-600 text-lg">{children}</ol>,
        },
    };

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        // 👇 YAHAN THA ERROR, AB FIXED HAI
        const query = `*[slug.current == "${slug}"][0]{
      title,
      _id,
      publishedAt,
      mainImage,
      body,
      "name": author->name,
      "authorImage": author->image,
      "categories": categories[]->title 
    }`;

        client.fetch(query)
            .then((data) => {
                setPost(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Sanity Fetch Error:", err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [slug]);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 animate-pulse">Loading Article...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
            <AlertCircle size={64} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Connection Error</h2>
            <p className="text-slate-500 mb-6 max-w-md bg-red-50 p-4 rounded-xl border border-red-100 text-sm font-mono text-red-600">
                {error}
            </p>
            <button onClick={() => window.location.reload()} className="bg-sky-500 text-white px-6 py-3 rounded-full font-bold hover:bg-sky-600">
                Try Again
            </button>
        </div>
    );

    if (!post) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
            <h1 className="text-6xl font-black text-slate-200 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Article Not Found</h2>
            <p className="text-slate-500 mb-8">The story you are looking for might have been moved or deleted.</p>
            <Link to="/blog" className="bg-sky-500 text-white px-6 py-3 rounded-full font-bold hover:bg-sky-600 transition-colors">
                Back to Blog
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-white font-sans">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 to-blue-600 origin-left z-[100]"
                style={{ scaleX }}
            />

            <div className="relative h-[60vh] w-full overflow-hidden">
                {post.mainImage ? (
                    <img
                        src={urlFor(post.mainImage).width(1200).url()}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-4xl mx-auto">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={20} /> Back to Stories
                    </Link>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
                    >
                        {post.title}
                    </motion.h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            {post.authorImage && (
                                <img src={urlFor(post.authorImage).width(50).url()} alt={post.name} className="w-8 h-8 rounded-full border border-white/30" />
                            )}
                            <span className="text-white">{post.name || 'Local Bir'}</span>
                        </div>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {post.publishedAt ? new Date(post.publishedAt).toDateString() : 'Recently'}</span>

                        {/* Categories Show karna */}
                        {post.categories && post.categories.length > 0 && (
                            <div className="flex gap-2">
                                {post.categories.map((cat, index) => (
                                    <span key={index} className="bg-sky-500/20 text-sky-200 px-2 py-0.5 rounded text-xs border border-sky-500/30">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    <div className="hidden lg:flex lg:col-span-1 flex-col gap-6 sticky top-24 h-fit">
                        <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"><Facebook size={18} /></button>
                        <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-sky-100 hover:text-sky-500 transition-colors"><Twitter size={18} /></button>
                        <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-700 transition-colors"><Linkedin size={18} /></button>
                        <div className="h-px w-full bg-slate-200 my-2"></div>
                        <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-green-100 hover:text-green-600 transition-colors"><Share2 size={18} /></button>
                    </div>

                    <article className="lg:col-span-11 prose prose-lg prose-slate max-w-none">
                        {post.body ? (
                            <PortableText value={post.body} components={ptComponents} />
                        ) : (
                            <p className="text-slate-400 italic">No content in this blog yet.</p>
                        )}
                    </article>
                </div>

                <div className="mt-16 pt-10 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
                        {post.authorImage && (
                            <img
                                src={urlFor(post.authorImage).width(200).url()}
                                alt={post.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                            />
                        )}
                        <div className="text-center md:text-left">
                            <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">Written By</p>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{post.name || 'Team Local Bir'}</h3>
                            <p className="text-slate-500">
                                Local explorer and storyteller. Sharing the hidden secrets of Bir Billing.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BlogPost;