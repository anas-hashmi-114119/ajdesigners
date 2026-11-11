import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  Star,
  X,
  Upload,
} from 'lucide-react';
import { blogAPI, uploadAPI } from '../../services/api';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const initialForm = {
    title: '',
    slug: '',
    category: 'Social Media Strategy',
    excerpt: '',
    content: '',
    coverImage: '',
    readTime: '5 min read',
    tags: 'Digital Marketing, Growth',
    featured: false,
    published: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const categories = [
    'Social Media Strategy',
    'AI & Innovation',
    'B2B Marketing',
    'Video Production',
    'Branding & Design',
    'Lead Generation',
  ];

  const fetchPosts = () => {
    setLoading(true);
    blogAPI
      .getAll({ all: 'true' })
      .then((res) => {
        if (res.data.success) {
          setPosts(res.data.posts || []);
        }
      })
      .catch((err) => console.error('Error fetching blog posts:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      readTime: post.readTime || '5 min read',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      featured: Boolean(post.featured),
      published: Boolean(post.published),
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadAPI.uploadFile(file);
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, coverImage: res.data.url }));
        setMessage('Image uploaded successfully.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error('File upload error:', err);
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content || !formData.coverImage) {
      alert('Please fill in title, excerpt, content, and cover image.');
      return;
    }

    const payload = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingPost) {
        await blogAPI.update(editingPost._id, payload);
        setMessage('Article updated.');
      } else {
        await blogAPI.create(payload);
        setMessage('Article published.');
      }
      setIsModalOpen(false);
      fetchPosts();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error saving article:', err);
      alert('Error saving article: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await blogAPI.delete(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
      setMessage('Article deleted.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleTogglePublished = async (post) => {
    try {
      await blogAPI.update(post._id, { published: !post.published });
      setPosts((prev) =>
        prev.map((p) => (p._id === post._id ? { ...p, published: !p.published } : p))
      );
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
            Insights & Article Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Author, edit, categorize, and publish strategic agency thought leadership.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-electric-500 hover:bg-electric-600 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-white rounded-3xl border border-charcoal-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-20 text-xs text-charcoal-500 animate-pulse">
            Loading articles...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-xs text-charcoal-500">
            No articles found. Click 'Write New Article' to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-surface-light border-b border-charcoal-200/80 text-charcoal-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Read Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-surface-light/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-900 line-clamp-1">{post.title}</div>
                      <div className="text-[11px] text-charcoal-400 font-mono">/blog/{post.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-purple-brand whitespace-nowrap">
                      {post.category}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-500 whitespace-nowrap">
                      {post.readTime}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublished(post)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          post.published ? 'bg-green-100 text-green-700' : 'bg-charcoal-100 text-charcoal-500'
                        }`}
                      >
                        {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{post.published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 rounded-lg text-charcoal-600 hover:text-navy-900 hover:bg-white"
                          title="Edit article"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50"
                          title="Delete article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200 flex items-center justify-center text-sm font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-display font-extrabold text-navy-900 mb-6">
              {editingPost ? 'Edit Article' : 'Write New Article'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Article Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. How AI Is Changing Content Creation"
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-charcoal-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-charcoal-700 mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Short Excerpt (Meta Description)</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Summary for preview cards and search engines..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                  required
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Cover Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://... or upload local file"
                    className="flex-1 px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                    required
                  />
                  <label className="px-3 py-2 rounded-xl bg-navy-900 text-white cursor-pointer hover:bg-electric-600 transition-colors flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Full Article Body (Markdown supported)</label>
                <textarea
                  rows={10}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write complete article content with headings, paragraphs, and lists..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none font-mono text-xs leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="AI, Content Strategy, Social Media"
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="text-electric-500 focus:ring-electric-500"
                  />
                  <span className="font-semibold text-charcoal-700">Feature as Top Banner on Blog Page</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="text-green-600 focus:ring-green-600"
                  />
                  <span className="font-semibold text-charcoal-700">Publish Immediately</span>
                </label>
              </div>

              <div className="pt-4 border-t border-charcoal-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-charcoal-600 hover:bg-charcoal-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold text-white bg-electric-500 hover:bg-electric-600"
                >
                  {editingPost ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

