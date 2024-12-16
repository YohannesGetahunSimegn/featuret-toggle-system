"use client";

import { useState, useEffect } from "react";

export default function AuditLogsPage() {
  interface Toggle {
    id: number;
    featureId: number;
    action: string;
    timestamp: string;
  }

  const [auditLogs, setAuditLogs] = useState<Toggle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuditLogs() {
      try {
        const response = await fetch("/api/auditLogs");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Toggle[] = await response.json();
        setAuditLogs(data);
      } catch (err) {
        console.error("Failed to fetch audit logs:", err);
        setError("Failed to load audit logs. Please try again later.");
      }
    }
    fetchAuditLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Audit Logs</h1>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : auditLogs.length === 0 ? (
          <p className="text-gray-500">No audit logs found.</p>
        ) : (
          <ul className="space-y-4">
            {auditLogs.map((log) => (
              <li
                key={log.id}
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div className="text-gray-700 font-medium">
                  <span className="text-blue-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                  <span>
                    {" "}
                    - {log.action} feature {log.featureId}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
