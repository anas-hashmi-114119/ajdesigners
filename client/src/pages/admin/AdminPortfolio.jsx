import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Star,
  X,
  Upload,
} from 'lucide-react';
import { portfolioAPI, uploadAPI } from '../../services/api';

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const initialForm = {
    title: '',
    slug: '',
    category: 'Social Media Designs',
    clientOrConceptName: 'Concept Studio Project',
    isConcept: true,
    industry: 'Technology & SaaS',
    servicesProvided: 'Social Media Designs, Visual Identity',
    summary: '',
    fullDescription: '',
    coverImage: '',
    featured: false,
    published: true,
    order: 0,
  };

  const [formData, setFormData] = useState(initialForm);

  const categories = [
    'Social Media Designs',
    'Branding Projects',
    'AI-Generated Creative Content',
    'Short-Form Videos',
    'Promotional Campaigns',
    'Content Calendars',
    'Website and Landing Page Projects',
  ];

  const fetchProjects = () => {
    setLoading(true);
    portfolioAPI
      .getAll({ all: 'true' })
      .then((res) => {
        if (res.data.success) {
          setProjects(res.data.projects || []);
        }
      })
      .catch((err) => console.error('Error fetching portfolio:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      clientOrConceptName: project.clientOrConceptName || 'Concept Studio Project',
      isConcept: project.isConcept !== undefined ? project.isConcept : true,
      industry: project.industry,
      servicesProvided: Array.isArray(project.servicesProvided)
        ? project.servicesProvided.join(', ')
        : project.servicesProvided,
      summary: project.summary,
      fullDescription: project.fullDescription,
      coverImage: project.coverImage,
      featured: Boolean(project.featured),
      published: Boolean(project.published),
      order: project.order || 0,
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
      console.error('File upload failed:', err);
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.summary || !formData.coverImage) {
      alert('Please fill in title, summary, and provide a cover image URL.');
      return;
    }

    const payload = {
      ...formData,
      servicesProvided: formData.servicesProvided
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editingProject) {
        await portfolioAPI.update(editingProject._id, payload);
        setMessage('Project updated successfully.');
      } else {
        await portfolioAPI.create(payload);
        setMessage('Project created successfully.');
      }
      setIsModalOpen(false);
      fetchProjects();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Error saving project: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this portfolio project?')) return;
    try {
      await portfolioAPI.delete(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setMessage('Project deleted.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const handleTogglePublished = async (project) => {
    try {
      await portfolioAPI.update(project._id, { published: !project.published });
      setProjects((prev) =>
        prev.map((p) => (p._id === project._id ? { ...p, published: !p.published } : p))
      );
    } catch (err) {
      console.error('Error toggling published:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
            Portfolio Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Create, curate, edit, and organize concept projects and client showcases.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-electric-500 hover:bg-electric-600 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Projects Grid */}
      <div className="bg-white rounded-3xl p-6 border border-charcoal-200/80 shadow-sm">
        {loading ? (
          <div className="text-center py-20 text-xs text-charcoal-500 animate-pulse">
            Loading portfolio catalog...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-xs text-charcoal-500">
            No projects in the database. Click 'Add New Project' to publish work.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj._id}
                className="bg-surface-light rounded-2xl overflow-hidden border border-charcoal-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-navy-900">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {proj.isConcept && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-brand text-white">
                          Concept
                        </span>
                      )}
                      {proj.featured && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-white flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-electric-600 mb-1">
                      {proj.category}
                    </div>
                    <h3 className="text-sm font-display font-bold text-navy-900 line-clamp-1 mb-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-charcoal-600 line-clamp-2">
                      {proj.summary}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-charcoal-200/60 flex items-center justify-between">
                  <button
                    onClick={() => handleTogglePublished(proj)}
                    className={`flex items-center gap-1 text-[11px] font-semibold ${
                      proj.published ? 'text-green-600' : 'text-charcoal-400'
                    }`}
                  >
                    {proj.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{proj.published ? 'Published' : 'Hidden'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      className="p-1.5 rounded-lg text-charcoal-600 hover:text-navy-900 hover:bg-white"
                      title="Edit project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj._id)}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200 flex items-center justify-center text-sm font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-display font-extrabold text-navy-900 mb-6">
              {editingProject ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Project Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. LuxeAura Botanical Skincare"
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
                  <label className="block font-bold uppercase text-charcoal-700 mb-1">Industry</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Beauty & Skincare"
                    className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Services Provided (comma-separated)</label>
                <input
                  type="text"
                  value={formData.servicesProvided}
                  onChange={(e) => setFormData({ ...formData, servicesProvided: e.target.value })}
                  placeholder="AI Product Staging, Social Media Designs"
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Summary (Short)</label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Concise 1-2 sentence overview for cards..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Full Project Narrative</label>
                <textarea
                  rows={4}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed breakdown of the strategy, deliverables, and outcome..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                />
              </div>

              {/* Cover Image Input + File Upload */}
              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Cover Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://... or upload local file below"
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

              {/* Checkboxes */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isConcept}
                    onChange={(e) => setFormData({ ...formData, isConcept: e.target.checked })}
                    className="text-purple-brand focus:ring-purple-brand"
                  />
                  <span className="font-semibold text-charcoal-700">Clearly Label as Concept Exploration</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="text-electric-500 focus:ring-electric-500"
                  />
                  <span className="font-semibold text-charcoal-700">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="text-electric-500 focus:ring-electric-500"
                  />
                  <span className="font-semibold text-charcoal-700">Visible (Published)</span>
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
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

