import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { FiMail, FiCornerUpRight } from "react-icons/fi";

const AdminContactPage = () => {
  const { getToken } = useAuth();
  const [activeId, setActiveId] = useState(null);

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });

  return (
    <div className="min-h-screen px-6 py-10 md:px-10">
      <h1 className="mb-8 text-3xl font-extrabold text-gray-900">
        📬 Contact Inbox
      </h1>

      {/* LOADING */}
      {isLoading && (
        <div className="flex h-40 items-center justify-center text-gray-500">
          Loading messages…
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <div className="flex h-40 items-center justify-center text-red-500">
          Failed to load messages
        </div>
      )}

      {/* EMPTY */}
      {!isLoading && !isError && messages.length === 0 && (
        <div className="flex h-40 items-center justify-center text-gray-500">
          No contact messages yet
        </div>
      )}

      {/* LIST */}
      <div className="space-y-5">
        {messages.map((m) => {
          const isOpen = activeId === m._id;

          return (
            <div
              key={m._id}
              className={`
                rounded-2xl border p-5 shadow-sm transition
                ${
                  m.replied
                    ? "border-gray-200 bg-white"
                    : "border-[#540000]/30 bg-[#540000]/5"
                }
              `}
            >
              {/* HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <p className="flex items-center gap-1 text-sm text-gray-500">
                    <FiMail size={14} />
                    {m.email}
                  </p>
                </div>

                <span
                  className={`
                    rounded-full px-3 py-1 text-xs font-medium
                    ${
                      m.replied
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {m.replied ? "Replied" : "New"}
                </span>
              </div>

              {/* MESSAGE */}
              <p className="mt-4 text-sm text-gray-700 whitespace-pre-line">
                {m.message}
              </p>

              {/* ACTIONS */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  {new Date(m.createdAt).toLocaleString()}
                </p>

                {!m.replied && (
                  <button
                    onClick={() => setActiveId(isOpen ? null : m._id)}
                    className="
                      inline-flex items-center gap-1
                      text-sm font-medium text-[#540000]
                      hover:underline
                    "
                  >
                    <FiCornerUpRight />
                    Reply
                  </button>
                )}
              </div>

              {/* REPLY PLACEHOLDER */}
              {isOpen && (
                <div className="mt-4 rounded-xl bg-white p-4 shadow-inner text-sm text-gray-500">
                  Reply UI coming next 👀
                  <br />
                  (Backend already ready)
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminContactPage;
