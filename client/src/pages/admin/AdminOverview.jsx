import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Briefcase,
  FileText,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { inquiryAPI, portfolioAPI, blogAPI, serviceAPI } from '../../services/api';

export default function AdminOverview() {
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, qualified: 0, converted: 0 });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [counts, setCounts] = useState({ portfolio: 0, blog: 0, services: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      inquiryAPI.getStats(),
      inquiryAPI.getAll({ limit: 5 }),
      portfolioAPI.getAll({ all: 'true' }),
      blogAPI.getAll({ all: 'true' }),
      serviceAPI.getAll({ all: 'true' }),
    ])
      .then(([statsRes, inqRes, portRes, blogRes, srvRes]) => {
        if (statsRes.data.success) setStats(statsRes.data.stats);
        if (inqRes.data.success) setRecentInquiries(inqRes.data.inquiries || []);
        setCounts({
          portfolio: portRes.data.count || portRes.data.projects?.length || 0,
          blog: blogRes.data.pagination?.total || blogRes.data.posts?.length || 0,
          services: srvRes.data.count || srvRes.data.services?.length || 0,
        });
      })
      .catch((err) => console.error('Error fetching admin dashboard data:', err))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { title: 'Total Inquiries', value: stats.total, color: 'text-navy-900', bg: 'bg-white', icon: Inbox },
    { title: 'New (Unread)', value: stats.new, color: 'text-electric-600', bg: 'bg-electric-100/50', icon: Clock },
    { title: 'In Discussion', value: stats.contacted + stats.qualified, color: 'text-purple-brand', bg: 'bg-purple-soft/50', icon: TrendingUp },
    { title: 'Converted Clients', value: stats.converted, color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
            Agency Management Console
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Real-time pipeline monitoring, content management, and client inquiries.
          </p>
        </div>

        <Link
          to="/admin/inquiries"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-electric-500 hover:bg-electric-600 shadow-sm"
        >
          <Inbox className="w-4 h-4" />
          <span>Manage Inquiries</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className={`p-6 rounded-2xl border border-charcoal-200/80 shadow-sm flex items-center justify-between ${c.bg}`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 block mb-1">
                  {c.title}
                </span>
                <span className={`text-3xl font-display font-black tracking-tight ${c.color}`}>
                  {loading ? '—' : c.value}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white border border-charcoal-200/60 shadow-xs flex items-center justify-center text-charcoal-700">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Catalog Counts Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          to="/admin/portfolio"
          className="p-5 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm hover:border-electric-500/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-electric-100 text-electric-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900 group-hover:text-electric-600 transition-colors">
                Portfolio Projects
              </div>
              <div className="text-xs text-charcoal-500">{counts.portfolio} published concept items</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/admin/blog"
          className="p-5 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm hover:border-electric-500/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-soft text-purple-brand flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900 group-hover:text-purple-brand transition-colors">
                Blog Articles
              </div>
              <div className="text-xs text-charcoal-500">{counts.blog} educational guides</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/admin/pricing"
          className="p-5 rounded-2xl bg-white border border-charcoal-200/80 shadow-sm hover:border-electric-500/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900 group-hover:text-green-700 transition-colors">
                Services & Pricing
              </div>
              <div className="text-xs text-charcoal-500">{counts.services} disciplines configured</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-200/80">
          <div>
            <h2 className="text-lg font-display font-bold text-navy-900">
              Recent Client Inquiries
            </h2>
            <p className="text-xs text-charcoal-500">
              Latest incoming project requests from the website contact forms.
            </p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs font-bold text-electric-600 hover:underline inline-flex items-center gap-1"
          >
            <span>View All Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="text-center py-12 text-xs text-charcoal-500">
            No inquiries recorded yet. Form submissions will appear here automatically.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-charcoal-100 text-charcoal-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">Business</th>
                  <th className="py-3 px-3">Service</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {recentInquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-surface-light transition-colors">
                    <td className="py-3 px-3 text-charcoal-500 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 font-bold text-navy-900 whitespace-nowrap">
                      {inq.fullName}
                    </td>
                    <td className="py-3 px-3 text-charcoal-700 whitespace-nowrap">
                      {inq.businessName}
                    </td>
                    <td className="py-3 px-3 font-semibold text-electric-600 whitespace-nowrap">
                      {inq.serviceRequired}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          inq.status === 'New'
                            ? 'bg-blue-100 text-blue-700'
                            : inq.status === 'Converted'
                            ? 'bg-green-100 text-green-700'
                            : inq.status === 'Qualified'
                            ? 'bg-purple-soft text-purple-brand'
                            : 'bg-charcoal-100 text-charcoal-700'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <Link
                        to={`/admin/inquiries?id=${inq._id}`}
                        className="text-xs font-bold text-navy-900 hover:text-electric-600"
                      >
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

