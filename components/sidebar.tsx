"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Map, AlertTriangle, History, Mountain, Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoutButton } from "@/components/logout-button";

const NAV_ITEMS = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/locations", label: "Locations / Map", icon: Map },
    { href: "/dashboard/alerts", label: "Alerts", icon: AlertTriangle },
    { href: "/dashboard/alerts/history", label: "Alert History", icon: History },
];

export function Sidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 shrink-0 flex-col border-r border-border/80 bg-card/60 backdrop-blur-md md:flex">
                <div className="flex flex-col flex-1">
                    {/* Brand Header */}
                    <div className="p-5 border-b border-border/70 flex items-center gap-3">
                        <img
                            src="/images/logo.png"
                            alt="Landslide Early Warning Logo"
                            className="h-10 w-10 rounded-full object-cover shadow-md border border-white/20 shrink-0"
                        />
                        <div>
                            <span className="text-base font-bold tracking-tight block leading-tight text-foreground">
                                Landslide EWS
                            </span>
                            <span className="text-[11px] text-muted-foreground font-medium">
                                Disaster Monitoring
                            </span>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="px-3 py-5 flex-1">
                        <div className="px-3 pb-2.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Main Menu
                        </div>
                        <nav className="flex flex-col gap-1.5">
                            {NAV_ITEMS.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                                            isActive
                                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                    >
                                        <Icon size={18} className={isActive ? "text-white" : "text-muted-foreground"} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Telemetry Status Widget */}
                    <div className="p-4 mx-3 my-2 rounded-2xl bg-muted/50 border border-border/60">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-foreground">Live Telemetry</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                            12 Monitoring stations online. Real-time multi-factor feed active.
                        </p>
                    </div>
                </div>

                {/* Footer / Logout */}
                <div className="p-3 border-t border-border/60">
                    <LogoutButton />
                </div>
            </aside>

            {/* Mobile Header Bar */}
            <div className="md:hidden flex items-center justify-between border-b border-border/80 bg-card/90 backdrop-blur-md px-4 py-3 sticky top-0 z-40">
                <div className="flex items-center gap-2.5">
                    <img
                        src="/images/logo.png"
                        alt="Landslide Early Warning Logo"
                        className="h-8 w-8 rounded-full object-cover shadow-sm border border-white/20 shrink-0"
                    />
                    <div>
                        <span className="font-bold text-sm tracking-tight text-foreground block leading-none">
                            Landslide EWS
                        </span>
                        <span className="text-[10px] text-muted-foreground">Disaster Monitoring</span>
                    </div>
                </div>
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="p-2 rounded-lg bg-muted/60 hover:bg-muted text-foreground text-xs font-medium border border-border/80 flex items-center gap-1.5"
                    aria-label="Toggle navigation menu"
                >
                    {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                    <span>{mobileOpen ? "Close" : "Menu"}</span>
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileOpen && (
                <div className="md:hidden border-b border-border bg-card px-4 py-4 space-y-1.5 z-30 shadow-lg animate-fade-in-up">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-blue-600 text-white font-semibold"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="pt-3 border-t border-border/60 mt-3">
                        <LogoutButton />
                    </div>
                </div>
            )}
        </>
    );
}

