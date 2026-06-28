import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { news } from '../data/websiteData';

export default function NewsDetail() {
  const { id } = useParams();

  // Find post by ID
  const post = news.find((p) => p.id === id);

  // Latest posts excluding the current one
  const latestPosts = news.filter((p) => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <div className="bg-background pt-32 pb-24 text-center min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl space-y-4">
          <HelpCircle className="w-16 h-16 text-slate-400 mx-auto" />
          <h2 className="text-xl font-bold text-primary">Article Not Found</h2>
          <p className="text-darkslate text-sm">The news post you are looking for does not exist or has been archived.</p>
          <Link to="/news" className="inline-block bg-secondary text-pure-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-accent transition-colors">
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-primary pt-24 min-h-screen relative overflow-hidden text-left">
      
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(0,174,239,0.03)_0%,_transparent_75%)]" />
        <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(0,174,239,0.02)_0%,_transparent_75%)]" />
      </div>

      {/* Breadcrumbs Header */}
      <section className="bg-lightbg border-b border-primary/5 py-12 relative overflow-hidden z-10">
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-3">
          <Link to="/news" className="inline-flex items-center space-x-1.5 text-xs font-bold text-secondary hover:text-primary uppercase tracking-wider">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to News</span>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-primary leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-xs font-semibold text-darkslate">
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-secondary" />
              <span>{post.date}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center space-x-1">
              <User className="w-4 h-4 text-secondary" />
              <span>TDS Solar Energy</span>
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8 glass-panel p-6 sm:p-8 rounded-3xl shadow-sm"
          >
            {/* Main Featured Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-lightbg border border-primary/5 shadow-sm">
              <img
                src={`/images/${post.image}`}
                alt={post.title}
                className="w-full h-full object-cover opacity-95"
                loading="lazy"
              />
            </div>

            {/* Verbatim Render of Article Body */}
            <div
              className="max-w-none text-darkslate text-sm sm:text-base leading-relaxed space-y-5"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>

          {/* Right Sidebar: Latest Posts & Share */}
          <div className="lg:col-span-1 space-y-6">
            {/* Share Post */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-panel p-6 rounded-3xl space-y-4 shadow-sm"
            >
              <h4 className="font-heading text-xs font-bold text-primary uppercase tracking-widest flex items-center space-x-1.5">
                <Share2 className="w-4 h-4 text-secondary" />
                <span>Share Article</span>
              </h4>
              <p className="text-xs text-darkslate leading-relaxed">
                Recommend this clean energy article to your colleagues or friends.
              </p>
              <div className="flex space-x-3 pt-2">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/5 border border-primary/10 hover:bg-secondary hover:text-pure-white px-3 py-2 rounded-xl text-primary transition-all text-xs font-bold shadow-sm"
                >
                  Facebook
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/5 border border-primary/10 hover:bg-secondary hover:text-pure-white px-3 py-2 rounded-xl text-primary transition-all text-xs font-bold shadow-sm"
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>

            {/* Latest Posts List */}
            {latestPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-panel p-6 rounded-3xl space-y-4 shadow-sm"
              >
                <h4 className="font-heading text-xs font-bold text-primary uppercase tracking-widest">
                  Latest Updates
                </h4>
                <div className="space-y-4">
                  {latestPosts.map((latest) => (
                    <Link
                      key={latest.id}
                      to={`/news/${latest.id}`}
                      className="group block space-y-1.5 pb-3 border-b border-primary/5 last:border-0 last:pb-0"
                    >
                      <span className="text-[10px] font-bold text-darkslate block uppercase">
                        {latest.date}
                      </span>
                      <span className="text-sm font-bold text-primary group-hover:text-secondary transition-colors block line-clamp-2 leading-snug">
                        {latest.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
