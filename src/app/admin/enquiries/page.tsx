/**
 * Admin Enquiries Page
 * ─────────────────────────────────────────────────────────────
 * PC Creations — Admin dashboard for viewing and managing contact enquiries.
 */

"use client";

import React, { useState, useEffect } from "react";
import { ObjectId } from "mongodb";

interface WhatsAppNotification {
  status: 'pending' | 'sent' | 'failed';
  sentAt?: string;
  error?: string;
}

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "converted" | "closed";
  whatsappNotification: WhatsAppNotification;
  createdAt: string;
  updatedAt: string;
}

export default function AdminEnquiriesPage() {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [counts, setCounts] = useState({
    new: 0,
    contacted: 0,
    in_progress: 0,
    converted: 0,
    closed: 0,
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Login form state
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      fetchEnquiries(storedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        fetchEnquiries(data.token);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchEnquiries = async (authToken: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (serviceFilter !== "all") params.append("service", serviceFilter);
      if (searchQuery) params.append("search", searchQuery);
      if (sortBy) params.append("sortBy", sortBy);

      const response = await fetch(`/api/admin/enquiries?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setEnquiries(data.submissions);
        setCounts(data.counts);
        setTotal(data.total);
      } else {
        setError("Failed to fetch enquiries");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        fetchEnquiries(token);
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus as any });
        }
      } else {
        setError("Failed to update status");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken("");
    setIsAuthenticated(false);
    setEnquiries([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8">
            <h1 className="text-3xl font-black text-white mb-2">Admin Login</h1>
            <p className="text-[rgba(255,255,255,0.5)] mb-8">PC Creations Enquiries Dashboard</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[rgba(255,255,255,0.7)] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full bg-[#000] border border-[rgba(255,255,255,0.2)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF9D00]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[rgba(255,255,255,0.7)] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full bg-[#000] border border-[rgba(255,255,255,0.2)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF9D00]"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF9D00] text-black font-bold py-3 rounded-lg hover:bg-[#F7F8FA] transition-colors disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    in_progress: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    converted: "bg-green-500/20 text-green-400 border-green-500/30",
    closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  const whatsappStatusColors: Record<string, string> = {
    sent: "bg-green-500/20 text-green-400 border-green-500/30",
    failed: "bg-red-500/20 text-red-400 border-red-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Enquiries Dashboard</h1>
            <p className="text-[rgba(255,255,255,0.5)]">PC Creations Contact Form Submissions</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#FF9D00] text-black font-bold rounded-lg hover:bg-[#F7F8FA] transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl p-4">
            <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Total</p>
            <p className="text-3xl font-black">{total}</p>
          </div>
          <div className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl p-4">
            <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">New</p>
            <p className="text-3xl font-black text-blue-400">{counts.new}</p>
          </div>
          <div className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl p-4">
            <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">In Progress</p>
            <p className="text-3xl font-black text-purple-400">{counts.in_progress}</p>
          </div>
          <div className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl p-4">
            <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Converted</p>
            <p className="text-3xl font-black text-green-400">{counts.converted}</p>
          </div>
          <div className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl p-4">
            <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Closed</p>
            <p className="text-3xl font-black text-gray-400">{counts.closed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-bold text-[rgba(255,255,255,0.7)] mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  fetchEnquiries(token);
                }}
                className="w-full bg-[#000] border border-[rgba(255,255,255,0.2)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF9D00]"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[rgba(255,255,255,0.7)] mb-2">
                Service
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => {
                  setServiceFilter(e.target.value);
                  fetchEnquiries(token);
                }}
                className="w-full bg-[#000] border border-[rgba(255,255,255,0.2)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF9D00]"
              >
                <option value="all">All Services</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Performance Marketing">Performance Marketing</option>
                <option value="Branding">Branding</option>
                <option value="Website Development">Website Development</option>
                <option value="Content Creation">Content Creation</option>
                <option value="Video Production">Video Production</option>
                <option value="SEO">SEO</option>
                <option value="Influencer Marketing">Influencer Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[rgba(255,255,255,0.7)] mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, email, phone, company..."
                className="w-full bg-[#000] border border-[rgba(255,255,255,0.2)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF9D00]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[rgba(255,255,255,0.7)] mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  fetchEnquiries(token);
                }}
                className="w-full bg-[#000] border border-[rgba(255,255,255,0.2)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF9D00]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                setStatusFilter("all");
                setServiceFilter("all");
                setSearchQuery("");
                setSortBy("newest");
                fetchEnquiries(token);
              }}
              className="px-4 py-2 bg-[#FF9D00] text-black font-bold rounded-lg hover:bg-[#F7F8FA] transition-colors text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <p className="text-center text-[rgba(255,255,255,0.5)]">Loading...</p>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                onClick={() => setSelectedEnquiry(enquiry)}
                className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl p-6 hover:border-[#FF9D00]/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{enquiry.name}</h3>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm">{enquiry.email}</p>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm">{enquiry.phone}</p>
                    {enquiry.company && (
                      <p className="text-[rgba(255,255,255,0.5)] text-sm">{enquiry.company}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[enquiry.status]}`}
                    >
                      {enquiry.status.replace("_", " ").toUpperCase()}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${whatsappStatusColors[enquiry.whatsappNotification.status]}`}
                    >
                      WhatsApp: {enquiry.whatsappNotification.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-xs mb-1">Service</p>
                    <p className="text-white text-sm">{enquiry.service}</p>
                  </div>
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-xs mb-1">Budget</p>
                    <p className="text-white text-sm">{enquiry.budget || "Not specified"}</p>
                  </div>
                </div>
                <p className="text-[rgba(255,255,255,0.7)] text-sm mb-4 line-clamp-2">
                  {enquiry.message}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[rgba(255,255,255,0.5)] text-xs">
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${enquiry.phone}`}
                      className="px-3 py-1 bg-[#FF9D00] text-black text-xs font-bold rounded hover:bg-[#F7F8FA] transition-colors"
                    >
                      Call
                    </a>
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="px-3 py-1 bg-[#FF9D00] text-black text-xs font-bold rounded hover:bg-[#F7F8FA] transition-colors"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedEnquiry && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEnquiry(null)}
          >
            <div
              className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">{selectedEnquiry.name}</h2>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-[rgba(255,255,255,0.5)] hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Email</p>
                    <p className="text-white">{selectedEnquiry.email}</p>
                  </div>
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Phone</p>
                    <p className="text-white">{selectedEnquiry.phone}</p>
                  </div>
                </div>

                {selectedEnquiry.company && (
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Company</p>
                    <p className="text-white">{selectedEnquiry.company}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Service</p>
                    <p className="text-white">{selectedEnquiry.service}</p>
                  </div>
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Budget</p>
                    <p className="text-white">{selectedEnquiry.budget || "Not specified"}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Message</p>
                  <p className="text-white">{selectedEnquiry.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Status</p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[selectedEnquiry.status]}`}
                    >
                      {selectedEnquiry.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">Received</p>
                    <p className="text-white">{new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">WhatsApp Notification</p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${whatsappStatusColors[selectedEnquiry.whatsappNotification.status]}`}
                    >
                      {selectedEnquiry.whatsappNotification.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">WhatsApp Sent At</p>
                    <p className="text-white">
                      {selectedEnquiry.whatsappNotification.sentAt
                        ? new Date(selectedEnquiry.whatsappNotification.sentAt).toLocaleString()
                        : "Not sent"}
                    </p>
                  </div>
                </div>

                {selectedEnquiry.whatsappNotification.error && (
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm mb-1">WhatsApp Error</p>
                    <p className="text-red-400 text-sm">{selectedEnquiry.whatsappNotification.error}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-[rgba(255,255,255,0.1)]">
                  <p className="text-[rgba(255,255,255,0.5)] text-sm mb-3">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(["new", "contacted", "in_progress", "converted", "closed"] as const).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(selectedEnquiry._id, status)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${
                            selectedEnquiry.status === status
                              ? "bg-[#FF9D00] text-black border-[#FF9D00]"
                              : "bg-transparent text-white border-[rgba(255,255,255,0.2)] hover:border-[#FF9D00]"
                          }`}
                        >
                          {status.replace("_", " ").toUpperCase()}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgba(255,255,255,0.1)] flex gap-2">
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="flex-1 px-4 py-2 bg-[#FF9D00] text-black font-bold rounded-lg hover:bg-[#F7F8FA] transition-colors text-center"
                  >
                    Call
                  </a>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="flex-1 px-4 py-2 bg-[#FF9D00] text-black font-bold rounded-lg hover:bg-[#F7F8FA] transition-colors text-center"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
