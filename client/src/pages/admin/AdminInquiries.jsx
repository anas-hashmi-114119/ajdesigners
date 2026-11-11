import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Trash2,
  CheckCircle2,
  MessageSquare,
  Clock,
  User,
  Building2,
  Mail,
  Globe2,
  DollarSign,
  AlertCircle,
  X,
  Send,
} from 'lucide-react';
import { inquiryAPI } from '../../services/api';

export default function AdminInquiries() {
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get('id');

  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [noteLoading, setNoteLoading] = useState(false);
  const [message, setMessage] = useState('');

  const statuses = ['all', 'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Closed'];

  const fetchInquiries = () => {
    setLoading(true);
    inquiryAPI
      .getAll({ status: statusFilter, search: searchQuery })
      .then((res) => {
        if (res.data.success) {
          const list = res.data.inquiries || [];
          setInquiries(list);

          // If highlightedId provided, open that modal
          if (highlightedId && !selectedInquiry) {
            const found = list.find((i) => i._id === highlightedId);
            if (found) setSelectedInquiry(found);
          }
        }
      })
      .catch((err) => console.error('Error fetching inquiries:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, searchQuery]);

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      const res = await inquiryAPI.updateStatus(inquiryId, newStatus);
      if (res.data.success) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === inquiryId ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry && selectedInquiry._id === inquiryId) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }
        setMessage(`Status changed to ${newStatus}`);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedInquiry) return;

    setNoteLoading(true);
    try {
      const res = await inquiryAPI.addNote(selectedInquiry._id, newNote);
      if (res.data.success) {
        setSelectedInquiry((prev) => ({
          ...prev,
          internalNotes: res.data.notes,
        }));
        setNewNote('');
        fetchInquiries();
      }
    } catch (err) {
      console.error('Error adding note:', err);
    } finally {
      setNoteLoading(false);
    }
  };

  const handleDelete = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to permanently delete this inquiry record?')) {
      return;
    }

    try {
      const res = await inquiryAPI.delete(inquiryId);
      if (res.data.success) {
        setInquiries((prev) => prev.filter((item) => item._id !== inquiryId));
        if (selectedInquiry && selectedInquiry._id === inquiryId) {
          setSelectedInquiry(null);
        }
        setMessage('Inquiry deleted successfully.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  const handleExportCsv = () => {
    window.open(inquiryAPI.getExportCsvUrl(), '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
            Client Inquiries Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Review, qualify, add team notes, and manage the lead conversion lifecycle.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-navy-900 bg-white border border-charcoal-200 hover:bg-surface-light shadow-xs transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-electric-600" />
          <span>Export Inquiries to CSV</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-charcoal-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-navy-900 text-white'
                  : 'bg-surface-light text-charcoal-700 hover:bg-charcoal-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-charcoal-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-20 text-xs text-charcoal-500 animate-pulse">
            Loading inquiries...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-20 text-xs text-charcoal-500">
            No inquiries match the active filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-surface-light border-b border-charcoal-200/80 text-charcoal-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Business</th>
                  <th className="py-3.5 px-4">Country</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Budget</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {inquiries.map((inq) => (
                  <tr
                    key={inq._id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`hover:bg-surface-light/80 transition-colors cursor-pointer ${
                      selectedInquiry?._id === inq._id ? 'bg-electric-50/50' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-charcoal-500 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-navy-900 whitespace-nowrap">
                      {inq.fullName}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-700 whitespace-nowrap">
                      {inq.businessName}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-500 whitespace-nowrap">
                      {inq.country}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-electric-600 whitespace-nowrap">
                      {inq.serviceRequired}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-600 whitespace-nowrap">
                      {inq.estimatedBudget}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={inq.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          inq.status === 'New'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : inq.status === 'Converted'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : inq.status === 'Qualified'
                            ? 'bg-purple-soft text-purple-brand border-purple-200'
                            : inq.status === 'Proposal Sent'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-charcoal-100 text-charcoal-700 border-charcoal-200'
                        }`}
                      >
                        {statuses.filter((s) => s !== 'all').map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-2.5 py-1 rounded-md text-[11px] font-bold text-electric-600 hover:bg-electric-50 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(inq._id)}
                          className="p-1 rounded-md text-charcoal-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete inquiry"
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

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200 flex items-center justify-center text-sm font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-charcoal-400">ID: {selectedInquiry._id}</span>
                <span>•</span>
                <span className="text-xs text-charcoal-400">
                  {new Date(selectedInquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <h2 className="text-2xl font-display font-extrabold text-navy-900">
                {selectedInquiry.fullName}
              </h2>
              <div className="text-sm font-semibold text-charcoal-700">
                {selectedInquiry.businessName} ({selectedInquiry.businessType})
              </div>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-surface-light border border-charcoal-200 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal-400 block">Work Email</span>
                <a href={`mailto:${selectedInquiry.workEmail}`} className="font-semibold text-electric-600 hover:underline break-all">
                  {selectedInquiry.workEmail}
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal-400 block">Country</span>
                <span className="font-semibold text-navy-900">{selectedInquiry.country}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal-400 block">Contact Method</span>
                <span className="font-semibold text-navy-900">{selectedInquiry.preferredContactMethod}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal-400 block">Service Required</span>
                <span className="font-semibold text-electric-600">{selectedInquiry.serviceRequired}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal-400 block">Estimated Budget</span>
                <span className="font-semibold text-navy-900">{selectedInquiry.estimatedBudget}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal-400 block">Website</span>
                {selectedInquiry.websiteUrl ? (
                  <a href={selectedInquiry.websiteUrl} target="_blank" rel="noreferrer" className="text-electric-600 hover:underline truncate block">
                    {selectedInquiry.websiteUrl}
                  </a>
                ) : (
                  <span className="text-charcoal-400">Not provided</span>
                )}
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2">
                Project Description & Goals:
              </h3>
              <div className="p-4 rounded-2xl bg-surface-light border border-charcoal-200 text-xs sm:text-sm text-charcoal-800 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.projectDescription}
              </div>
            </div>

            {/* Status Selector */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-charcoal-50 border border-charcoal-200">
              <span className="text-xs font-bold text-navy-900">Current Lead Status:</span>
              <select
                value={selectedInquiry.status}
                onChange={(e) => handleStatusChange(selectedInquiry._id, e.target.value)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl border border-charcoal-200 bg-white focus:outline-none"
              >
                {statuses.filter((s) => s !== 'all').map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Internal Team Notes */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Internal Team Notes & Timeline</span>
              </h3>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedInquiry.internalNotes && selectedInquiry.internalNotes.length > 0 ? (
                  selectedInquiry.internalNotes.map((note) => (
                    <div key={note._id} className="p-3 rounded-xl bg-surface-light border border-charcoal-200 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-charcoal-400 mb-1">
                        <span className="font-bold text-navy-900">{note.author || 'Admin'}</span>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-charcoal-700 leading-relaxed">{note.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-charcoal-400 italic">No internal notes added yet.</p>
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add internal note or consultation update..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500"
                />
                <button
                  type="submit"
                  disabled={noteLoading || !newNote.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-electric-600 disabled:opacity-50 transition-colors flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Add Note</span>
                </button>
              </form>
            </div>

            {/* Delete button */}
            <div className="pt-4 border-t border-charcoal-200 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedInquiry._id)}
                className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Inquiry Record</span>
              </button>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-charcoal-700 bg-charcoal-100 hover:bg-charcoal-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

