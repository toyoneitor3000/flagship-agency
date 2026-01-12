'use client';

import { useState, useEffect } from 'react';
import {
    Users,
    Shield,
    Monitor,
    Loader2,
    Search,
    RefreshCw
} from 'lucide-react';

interface User {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    createdAt: string;
    _count: {
        projects: number;
        domains: number;
    };
}

export function UserManager() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-semibold">Usuarios Registrados</h2>
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-zinc-400">
                        {users.length}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Buscar usuario..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-zinc-950 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500 w-48 transition-all"
                        />
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50 border-b border-white/5">
                        <tr>
                            <th className="px-4 py-3">Usuario</th>
                            <th className="px-4 py-3">Rol</th>
                            <th className="px-4 py-3">Proyectos</th>
                            <th className="px-4 py-3">Registro</th>
                            <th className="px-4 py-3 text-right">ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-zinc-500">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                    Cargando datos...
                                </td>
                            </tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-zinc-500">
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center">
                                                {user.image ? (
                                                    <img src={user.image} alt={user.name || ''} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Users className="w-4 h-4 text-zinc-500" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{user.name || 'Sin Nombre'}</div>
                                                <div className="text-xs text-zinc-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {user.role === 'admin' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                <Shield className="w-3 h-3" />
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-white/5">
                                                Usuario
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-4">
                                            <div title="Proyectos" className="flex items-center gap-1 text-zinc-400">
                                                <Monitor className="w-3.5 h-3.5" />
                                                {user._count.projects}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-500">
                                        {new Date(user.createdAt).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <span className="font-mono text-xs text-zinc-600 truncate max-w-[80px] inline-block" title={user.id}>
                                            {user.id}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
