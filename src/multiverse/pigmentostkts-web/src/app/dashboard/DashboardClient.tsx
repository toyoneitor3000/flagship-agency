"use client";

import { useState } from "react";
import { OrderHistory } from "@/components/dashboard/OrderHistory";
import Link from "next/link";
import { FolderOpen, Package, User, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type DashboardClientProps = {
    session: any;
    orders: any[];
    isAdmin: boolean;
};

export function DashboardClient({ session, orders, isAdmin }: DashboardClientProps) {
    const [activeTab, setActiveTab] = useState<"pedidos" | "ajustes" | "admin">("pedidos");

    return (
        <div className="min-h-screen bg-brand-gray pt-32 md:pt-40 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand-yellow/30 shadow-sm">
                            <Image
                                src={session.user?.image || "https://placehold.co/150x150/png?text=U"}
                                alt={session.user?.name || "User"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-brand-black tracking-tight font-space">
                                {isAdmin ? "Panel de Administración" : "Mi Cuenta"}
                            </h1>
                            <p className="text-gray-500 font-medium text-sm mt-1">
                                Hola, {session.user?.name || "Usuario"}! 👋
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="text-sm font-bold text-gray-500 hover:text-brand-black transition-colors"
                    >
                        ← Volver a la tienda
                    </Link>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-6 inline-flex flex-wrap gap-2 w-full sm:w-auto">
                    <button
                        onClick={() => setActiveTab("pedidos")}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex-1 sm:flex-none justify-center ${activeTab === "pedidos"
                            ? "bg-brand-black text-white shadow-md"
                            : "text-gray-500 hover:text-brand-black hover:bg-gray-50"
                            }`}
                    >
                        <Package className="w-4 h-4" />
                        Mis Pedidos
                    </button>

                    <button
                        onClick={() => setActiveTab("ajustes")}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex-1 sm:flex-none justify-center ${activeTab === "ajustes"
                            ? "bg-brand-black text-white shadow-md"
                            : "text-gray-500 hover:text-brand-black hover:bg-gray-50"
                            }`}
                    >
                        <Settings className="w-4 h-4" />
                        Configuración
                    </button>

                    {isAdmin && (
                        <button
                            onClick={() => setActiveTab("admin")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex-1 sm:flex-none justify-center ${activeTab === "admin"
                                ? "bg-brand-yellow text-brand-black shadow-md"
                                : "text-gray-500 hover:text-brand-yellow hover:bg-gray-50"
                                }`}
                        >
                            <FolderOpen className="w-4 h-4" />
                            Archivos Globales
                        </button>
                    )}
                </div>

                {/* Tab Content */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {activeTab === "pedidos" && (
                            <motion.div
                                key="pedidos"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-brand-yellow/20 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-brand-yellow" />
                                    </div>
                                    <h2 className="text-xl font-black text-brand-black font-space">Historial de Pedidos</h2>
                                </div>
                                <OrderHistory orders={orders} isAdmin={isAdmin} />
                            </motion.div>
                        )}

                        {activeTab === "ajustes" && (
                            <motion.div
                                key="ajustes"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {/* Profile Readonly Card */}
                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-brand-black mb-4 flex items-center gap-2">
                                        <User className="w-5 h-5 text-gray-400" />
                                        Datos de la Cuenta
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nombre</label>
                                            <p className="text-gray-900 font-medium">{session.user?.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Correo</label>
                                            <p className="text-gray-900 font-medium">{session.user?.email}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nivel de Acceso</label>
                                            <p className="text-gray-900 font-medium">{isAdmin ? 'Administrador' : 'Usuario Estándar'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Actions */}
                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-100">
                                    <h3 className="font-bold text-red-600 mb-4 flex items-center gap-2">
                                        <LogOut className="w-5 h-5" />
                                        Sesión
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Maneja tu sesión activa en este dispositivo.
                                    </p>
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-xl transition-colors border border-red-200"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "admin" && isAdmin && (
                            <motion.div
                                key="admin"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                            >
                                <Link
                                    href="/dashboard/archivos"
                                    className="bg-white p-8 rounded-3xl shadow-sm border border-brand-yellow hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-4 text-center group"
                                >
                                    <div className="bg-brand-gray p-5 rounded-2xl group-hover:bg-brand-yellow/20 transition-colors">
                                        <FolderOpen className="w-10 h-10 text-brand-black" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl text-gray-900 font-space">Gestor de Archivos</h3>
                                        <p className="text-sm text-gray-500 mt-2">Visor global de todos los diseños y referencias subidas por los clientes.</p>
                                    </div>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
