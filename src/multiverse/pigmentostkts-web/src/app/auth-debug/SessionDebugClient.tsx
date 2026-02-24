"use client";

import { useSession } from "next-auth/react";

export default function SessionDebugClient() {
    const { data: session, status } = useSession();

    return (
        <div style={{ padding: 20, background: "#222", color: "#fff", borderRadius: 8, marginTop: 16 }}>
            <h2 style={{ color: "#FFD700" }}>🔍 Client-side (useSession)</h2>
            <p><strong>Status:</strong> <span style={{ color: status === "authenticated" ? "lime" : "red" }}>{status}</span></p>
            <pre style={{ background: "#111", padding: 12, borderRadius: 4, overflow: "auto", fontSize: 12 }}>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    );
}
