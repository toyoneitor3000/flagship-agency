import { auth } from "@/auth";
import SessionDebugClient from "./SessionDebugClient";
import { cookies } from "next/headers";

export default async function AuthDebugPage() {
    const session = await auth();
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const authCookies = allCookies.filter(c => c.name.includes("auth") || c.name.includes("next-auth"));

    return (
        <div style={{ padding: 40, fontFamily: "monospace", background: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>
            <h1 style={{ color: "#FFD700", marginBottom: 24 }}>🔐 Auth Debug Page</h1>

            {/* Server-side auth() result */}
            <div style={{ padding: 20, background: "#222", borderRadius: 8 }}>
                <h2 style={{ color: "#FFD700" }}>🖥️ Server-side (auth())</h2>
                <p>
                    <strong>Session exists:</strong>{" "}
                    <span style={{ color: session ? "lime" : "red" }}>{session ? "YES ✅" : "NO ❌"}</span>
                </p>
                <pre style={{ background: "#111", padding: 12, borderRadius: 4, overflow: "auto", fontSize: 12 }}>
                    {JSON.stringify(session, null, 2)}
                </pre>
            </div>

            {/* Client-side useSession() result */}
            <SessionDebugClient />

            {/* Cookies */}
            <div style={{ padding: 20, background: "#222", borderRadius: 8, marginTop: 16 }}>
                <h2 style={{ color: "#FFD700" }}>🍪 Auth Cookies ({authCookies.length} found)</h2>
                {authCookies.length === 0 ? (
                    <p style={{ color: "red" }}>No auth cookies found! Session token cookie is missing.</p>
                ) : (
                    <ul style={{ fontSize: 12 }}>
                        {authCookies.map((c) => (
                            <li key={c.name} style={{ marginBottom: 8 }}>
                                <strong>{c.name}:</strong> {c.value.substring(0, 50)}...
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
