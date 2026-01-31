import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

/* -----------------------------------
   SMALL UI COMPONENTS
----------------------------------- */

const StatCard = ({ label, value }) => (
  <div className="rounded-2xl bg-white/80 backdrop-blur p-5 shadow-sm ring-1 ring-black/5">
    <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
    <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
    <div className="h-4 w-1/3 rounded bg-gray-200" />
    <div className="mt-2 h-3 w-1/4 rounded bg-gray-200" />
    <div className="mt-4 h-4 w-full rounded bg-gray-200" />
    <div className="mt-2 h-4 w-5/6 rounded bg-gray-200" />
  </div>
);

const StatusBadge = ({ replied }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      replied ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
    }`}
  >
    {replied ? "Replied" : "Unread"}
  </span>
);

/* -----------------------------------
   MAIN PAGE
----------------------------------- */

const AdminContactPage = () => {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const queryClient = useQueryClient();

  const isAdmin = user?.publicMetadata?.role === "admin";

  /* UI STATE */
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [expandedId, setExpandedId] = useState(null);

  /* -----------------------------------
     FETCH CONTACTS
  ----------------------------------- */
  const { data = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    enabled: isLoaded && isAdmin,
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
  });

  /* -----------------------------------
     STATS
  ----------------------------------- */
  const stats = useMemo(() => {
    const unread = data.filter((m) => !m.replied).length;
    const replied = data.filter((m) => m.replied).length;
    return {
      total: data.length,
      unread,
      replied,
    };
  }, [data]);

  /* -----------------------------------
     FILTER / SEARCH / SORT
  ----------------------------------- */
  const filteredData = useMemo(() => {
    let list = [...data];

    if (filter === "unread") list = list.filter((m) => !m.replied);
    if (filter === "replied") list = list.filter((m) => m.replied);

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) =>
      sort === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    return list;
  }, [data, filter, search, sort]);

  /* -----------------------------------
     MUTATIONS
  ----------------------------------- */

  const replyMutation = useMutation({
    mutationFn: async ({ id, reply }) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact/${id}/reply`,
        { reply },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success("Reply sent");
      setSelected(null);
      setReply("");
      queryClient.invalidateQueries(["contacts"]);
    },
    onError: () => toast.error("Failed to send reply"),
  });

  const archiveMutation = useMutation({
    mutationFn: async (id) => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/api/contact/${id}/archive`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success("Archived");
      queryClient.invalidateQueries(["contacts"]);
    },
    onError: () => toast.error("Archive failed"),
  });

  /* -----------------------------------
     GUARD
  ----------------------------------- */
  if (isLoaded && !isAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600">
          🚫 Admin access only
        </h2>
      </div>
    );
  }

  /* -----------------------------------
     RENDER
  ----------------------------------- */
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Contact Inbox</h1>

      {/* STATS */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total messages" value={stats.total} />
        <StatCard label="Unread" value={stats.unread} />
        <StatCard label="Replied" value={stats.replied} />
      </div>

      {/* CONTROLS */}
      <div className="sticky top-20 z-10 mb-6 flex flex-wrap items-center gap-3 rounded-2xl bg-white/80 p-4 backdrop-blur ring-1 ring-black/5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages…"
          className="flex-1 rounded-full border px-4 py-2 text-sm outline-none focus:border-[#540000]"
        />
        <div className="flex rounded-full border bg-white p-1 shadow-sm">
          {["all", "unread", "replied"].map((f) => {
            const active = filter === f;

            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
          relative rounded-full px-4 py-1.5 text-sm font-medium capitalize
          transition-all duration-200
          ${
            active
              ? "bg-[#540000] text-white shadow"
              : "text-gray-600 hover:text-gray-900"
          }
        `}
              >
                {f}
              </button>
            );
          })}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border px-3 py-2 text-sm"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}

        {!isLoading &&
          filteredData.map((m) => (
            <motion.div
              key={m._id}
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.email}</p>
                </div>
                <StatusBadge replied={m.replied} />
              </div>

              <p className="mt-4 text-gray-800 leading-relaxed">
                {expandedId === m._id ? m.message : m.message.slice(0, 160)}
                {m.message.length > 160 && (
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === m._id ? null : m._id)
                    }
                    className="ml-2 text-sm font-medium text-[#540000]"
                  >
                    {expandedId === m._id ? "Show less" : "Read more"}
                  </button>
                )}
              </p>

              <div className="mt-5 flex gap-3">
                {!m.replied && (
                  <button
                    onClick={() => setSelected(m)}
                    className="rounded-full bg-[#540000]/10 px-4 py-2 text-sm font-medium text-[#540000] hover:bg-[#540000] hover:text-white transition"
                  >
                    Reply
                  </button>
                )}

                <button
                  disabled={archiveMutation.isLoading}
                  onClick={() => archiveMutation.mutate(m._id)}
                  className="rounded-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  Archive
                </button>
              </div>
            </motion.div>
          ))}
      </div>

      {/* REPLY MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900">
                Reply to {selected.name}
              </h2>

              <textarea
                rows={5}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="mt-4 w-full rounded-xl border p-3 outline-none focus:border-[#540000]"
                placeholder="Write your reply…"
              />

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  disabled={!reply || replyMutation.isLoading}
                  onClick={() =>
                    replyMutation.mutate({
                      id: selected._id,
                      reply,
                    })
                  }
                  className="rounded-full bg-[#540000] px-6 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {replyMutation.isLoading ? "Sending…" : "Send reply"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminContactPage;
