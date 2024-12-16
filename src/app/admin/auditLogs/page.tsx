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
    <div>
      <h1>Audit Logs</h1>
      {error ? (
        <p>{error}</p>
      ) : auditLogs.length === 0 ? (
        <p>No audit logs found.</p>
      ) : (
        <ul>
          {auditLogs.map((log) => (
            <li key={log.id}>
              <strong>{new Date(log.timestamp).toLocaleString()}</strong>:{" "}
              {log.action} feature {log.featureId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
