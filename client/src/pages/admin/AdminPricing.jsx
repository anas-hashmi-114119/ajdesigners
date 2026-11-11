import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Edit2,
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  X,
  Layers,
} from 'lucide-react';
import { pricingAPI } from '../../services/api';

export default function AdminPricing() {
  const [packages, setPackages] = useState([]);
  const [standalone, setStandalone] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPkg, setEditingPkg] = useState(null);
  const [editingStandalone, setEditingStandalone] = useState(null);
  const [message, setMessage] = useState('');

  const [pkgFormData, setPkgFormData] = useState({
    name: '',
    planTitle: '',
    monthlyPrice: 0,
    subtitle: '',
    idealFor: '',
    isRecommended: false,
    badgeText: '',
    deliverables: '',
  });

  const [standaloneFormData, setStandaloneFormData] = useState({
    name: '',
    startingPrice: 0,
    description: '',
    deliverablesSummary: '',
  });

  const [isStandaloneCreate, setIsStandaloneCreate] = useState(false);

  const fetchPricing = () => {
    setLoading(true);
    pricingAPI
      .getPricing()
      .then((res) => {
        if (res.data.success) {
          setPackages(res.data.packages || []);
          setStandalone(res.data.standalone || []);
        }
      })
      .catch((err) => console.error('Error fetching pricing:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleOpenEditPkg = (pkg) => {
    setEditingPkg(pkg);
    setPkgFormData({
      name: pkg.name,
      planTitle: pkg.planTitle,
      monthlyPrice: pkg.monthlyPrice,
      subtitle: pkg.subtitle,
      idealFor: pkg.idealFor,
      isRecommended: Boolean(pkg.isRecommended),
      badgeText: pkg.badgeText || '',
      deliverables: Array.isArray(pkg.deliverables) ? pkg.deliverables.join('\n') : pkg.deliverables || '',
    });
  };

  const handleSavePkg = async (e) => {
    e.preventDefault();
    if (!editingPkg) return;

    const payload = {
      ...pkgFormData,
      monthlyPrice: Number(pkgFormData.monthlyPrice),
      deliverables: pkgFormData.deliverables
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean),
    };

    try {
      await pricingAPI.updatePackage(editingPkg._id, payload);
      setMessage(`Package '${editingPkg.name}' updated successfully.`);
      setEditingPkg(null);
      fetchPricing();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error updating package:', err);
      alert('Failed to update package: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleOpenEditStandalone = (item) => {
    setIsStandaloneCreate(false);
    setEditingStandalone(item);
    setStandaloneFormData({
      name: item.name,
      startingPrice: item.startingPrice,
      description: item.description,
      deliverablesSummary: item.deliverablesSummary || '',
    });
  };

  const handleOpenCreateStandalone = () => {
    setIsStandaloneCreate(true);
    setEditingStandalone({});
    setStandaloneFormData({
      name: '',
      startingPrice: 99,
      description: '',
      deliverablesSummary: '',
    });
  };

  const handleSaveStandalone = async (e) => {
    e.preventDefault();
    const payload = {
      ...standaloneFormData,
      startingPrice: Number(standaloneFormData.startingPrice),
    };

    try {
      if (isStandaloneCreate) {
        await pricingAPI.createStandalone(payload);
        setMessage('Standalone service added.');
      } else {
        await pricingAPI.updateStandalone(editingStandalone._id, payload);
        setMessage('Standalone service updated.');
      }
      setEditingStandalone(null);
      fetchPricing();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error saving standalone service:', err);
      alert('Failed to save service: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteStandalone = async (id) => {
    if (!window.confirm('Delete this standalone service?')) return;
    try {
      await pricingAPI.deleteStandalone(id);
      setStandalone((prev) => prev.filter((s) => s._id !== id));
      setMessage('Standalone service deleted.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting standalone service:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
          Pricing & Retainer Package Management
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Adjust monthly tier pricing, bullet deliverables, recommended badges, and standalone creative assets.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Monthly Packages Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-display font-bold text-navy-900">
          Monthly Retainer Packages
        </h2>

        {loading ? (
          <div className="text-center py-12 text-xs text-charcoal-500 animate-pulse">
            Loading packages...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-3xl p-6 border border-charcoal-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                      {pkg.planTitle}
                    </span>
                    {pkg.isRecommended && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-electric-100 text-electric-700 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Recommended
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-display font-extrabold text-navy-900">
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-3xl font-display font-black text-navy-900">
                      {pkg.currency || '$'}{pkg.monthlyPrice}
                    </span>
                    <span className="text-xs text-charcoal-500">/ month</span>
                  </div>

                  <p className="text-xs text-charcoal-600 mb-4">{pkg.subtitle}</p>

                  <div className="space-y-1.5 mb-6 text-xs text-charcoal-700">
                    <div className="font-bold text-navy-900 mb-2">Deliverables ({pkg.deliverables?.length || 0}):</div>
                    {pkg.deliverables?.slice(0, 4).map((d, i) => (
                      <div key={i} className="flex items-start gap-1.5 line-clamp-1">
                        <span className="text-electric-500">•</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-charcoal-100">
                  <button
                    onClick={() => handleOpenEditPkg(pkg)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-navy-900 bg-charcoal-100 hover:bg-electric-50 hover:text-electric-600 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Package Specs & Price</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Standalone Services Section */}
      <div className="space-y-4 pt-6 border-t border-charcoal-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-display font-bold text-navy-900">
              Standalone Services & Asset Bundles
            </h2>
            <p className="text-xs text-charcoal-500">
              Individual offerings available without monthly retainer commitments.
            </p>
          </div>

          <button
            onClick={handleOpenCreateStandalone}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-electric-600 shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Standalone Service</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-charcoal-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-surface-light border-b border-charcoal-200/80 text-charcoal-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Service Name</th>
                  <th className="py-3.5 px-4">Starting Price</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {standalone.map((item) => (
                  <tr key={item._id} className="hover:bg-surface-light/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-navy-900">{item.name}</td>
                    <td className="py-3.5 px-4 font-extrabold text-electric-600 text-sm whitespace-nowrap">
                      {item.currency || '$'}{item.startingPrice}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-600 max-w-xs truncate">{item.description}</td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditStandalone(item)}
                          className="p-1.5 rounded-lg text-charcoal-600 hover:text-navy-900 hover:bg-charcoal-100"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStandalone(item._id)}
                          className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50"
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
        </div>
      </div>

      {/* Package Edit Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setEditingPkg(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200 flex items-center justify-center text-sm font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-display font-extrabold text-navy-900 mb-6">
              Edit Package: {editingPkg.name}
            </h3>

            <form onSubmit={handleSavePkg} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-charcoal-700 mb-1">Package Name</label>
                  <input
                    type="text"
                    value={pkgFormData.name}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-charcoal-700 mb-1">Monthly Price ($)</label>
                  <input
                    type="number"
                    value={pkgFormData.monthlyPrice}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, monthlyPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Plan Subtitle</label>
                <input
                  type="text"
                  value={pkgFormData.subtitle}
                  onChange={(e) => setPkgFormData({ ...pkgFormData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Target Persona (Ideal For)</label>
                <input
                  type="text"
                  value={pkgFormData.idealFor}
                  onChange={(e) => setPkgFormData({ ...pkgFormData, idealFor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Deliverables List (One per line)</label>
                <textarea
                  rows={6}
                  value={pkgFormData.deliverables}
                  onChange={(e) => setPkgFormData({ ...pkgFormData, deliverables: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none font-mono text-xs leading-relaxed"
                  required
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pkgFormData.isRecommended}
                    onChange={(e) => setPkgFormData({ ...pkgFormData, isRecommended: e.target.checked })}
                    className="text-electric-500 focus:ring-electric-500"
                  />
                  <span className="font-semibold text-charcoal-700">Display "MOST RECOMMENDED" Ribbon</span>
                </label>
              </div>

              <div className="pt-4 border-t border-charcoal-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="px-4 py-2 rounded-xl text-charcoal-600 hover:bg-charcoal-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold text-white bg-electric-500 hover:bg-electric-600"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Standalone Service Modal */}
      {editingStandalone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setEditingStandalone(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200 flex items-center justify-center text-sm font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-display font-extrabold text-navy-900 mb-6">
              {isStandaloneCreate ? 'Add Standalone Service' : 'Edit Standalone Service'}
            </h3>

            <form onSubmit={handleSaveStandalone} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Service Title</label>
                <input
                  type="text"
                  value={standaloneFormData.name}
                  onChange={(e) => setStandaloneFormData({ ...standaloneFormData, name: e.target.value })}
                  placeholder="e.g. 10 social media graphic designs"
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Starting Price ($)</label>
                <input
                  type="number"
                  value={standaloneFormData.startingPrice}
                  onChange={(e) => setStandaloneFormData({ ...standaloneFormData, startingPrice: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={standaloneFormData.description}
                  onChange={(e) => setStandaloneFormData({ ...standaloneFormData, description: e.target.value })}
                  placeholder="What is delivered..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-4 border-t border-charcoal-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingStandalone(null)}
                  className="px-4 py-2 rounded-xl text-charcoal-600 hover:bg-charcoal-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold text-white bg-electric-500 hover:bg-electric-600"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

