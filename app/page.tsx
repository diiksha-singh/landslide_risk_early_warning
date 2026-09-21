"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/risk-badge";
import {
  Mountain,
  CloudRain,
  Droplets,
  MoveDiagonal,
  Cpu,
  Activity,
  ShieldAlert,
  Bell,
  ArrowRight,
  TrendingUp,
  MapPin,
  Layers,
  History,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

// Hook for scroll-triggered animation
function useElementOnScreen(options = { threshold: 0.15 }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible] as const;
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [howItWorksRef, howItWorksVisible] = useElementOnScreen({ threshold: 0.1 });
  const [riskFactorsRef, riskFactorsVisible] = useElementOnScreen({ threshold: 0.1 });
  const [previewRef, previewVisible] = useElementOnScreen({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-[#0b1324] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Dynamic Glass Top Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-nav-scrolled py-3" : "glass-nav py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Landslide Early Warning Logo"
              className="h-10 w-10 rounded-full object-cover shadow-lg border border-white/20 group-hover:scale-105 transition-transform shrink-0"
            />
            <div>
              <span className="text-base font-bold tracking-tight text-white block leading-tight">
                Landslide Early Warning
              </span>
              <span className="text-[11px] text-blue-300/80 font-medium">
                Environmental Risk Platform
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-slate-200 hover:text-white hover:bg-white/10 text-sm font-medium"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-5 shadow-lg shadow-blue-600/30 rounded-lg">
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Landslide Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/images/landslide-bg.jpg')` }}
        />

        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 hero-overlay z-10" />

        {/* Radial accent lights */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl z-10 pointer-events-none" />

        {/* Left-Aligned Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
          <div className="max-w-2xl text-left space-y-8">
            {/* System Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md text-blue-300 text-xs font-semibold tracking-wide animate-fade-in-up">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Multi-Factor AI Disaster Analytics</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] animate-fade-in-up animation-delay-100">
              Multi-Factor <br />
              <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200 bg-clip-text text-transparent">
                Landslide Risk
              </span> <br />
              Prediction & Early Warning
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal animate-fade-in-up animation-delay-200 max-w-xl">
              Combining rainfall, soil moisture, slope, ground movement, and environmental data to provide location-specific landslide risk assessment and early warnings.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 animate-fade-in-up animation-delay-300">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base px-7 py-6 shadow-xl shadow-blue-600/30 rounded-xl flex items-center gap-2 group"
                >
                  View Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <a href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-card-light text-slate-100 hover:text-white border-white/20 hover:border-white/40 hover:bg-white/10 font-medium text-base px-7 py-6 rounded-xl"
                >
                  Explore System
                </Button>
              </a>
            </div>

            {/* Status Footer Tag */}
            <div className="pt-4 flex items-center gap-4 text-xs text-slate-400 animate-fade-in-up animation-delay-400 border-t border-white/10">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Telemetry System Active
              </span>
              <span>•</span>
              <span>Real-Time Sensor Ingestion</span>
              <span>•</span>
              <span>Multi-Sector Early Warning</span>
            </div>
          </div>
        </div>
      </section>

      {/* How the System Works Section */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="py-24 px-6 lg:px-12 bg-slate-950/70 relative border-t border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Architectural Overview
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              How the System Works
            </h3>
            <p className="text-slate-400 text-base">
              From field sensor data streams to automated risk level classification and targeted community notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                icon: CloudRain,
                title: "Environmental Data",
                desc: "Rainfall, soil moisture, slope, ground movement continuous telemetry.",
                color: "text-blue-400",
                bgColor: "bg-blue-500/10",
              },
              {
                step: "02",
                icon: Cpu,
                title: "Data Processing",
                desc: "Cleaning, normalization and real-time feature matrix preparation.",
                color: "text-indigo-400",
                bgColor: "bg-indigo-500/10",
              },
              {
                step: "03",
                icon: Activity,
                title: "Risk Prediction",
                desc: "Multi-factor risk analysis engine & predictive slope stability scoring.",
                color: "text-purple-400",
                bgColor: "bg-purple-500/10",
              },
              {
                step: "04",
                icon: ShieldAlert,
                title: "Risk Classification",
                desc: "Real-time indexing into LOW / MODERATE / HIGH / CRITICAL warning tiers.",
                color: "text-amber-400",
                bgColor: "bg-amber-500/10",
              },
              {
                step: "05",
                icon: Bell,
                title: "Early Warning",
                desc: "Instant warning alerts and sector-specific emergency response plans.",
                color: "text-rose-400",
                bgColor: "bg-rose-500/10",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl p-6 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-500 hover:-translate-y-1 ${
                  howItWorksVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-800/80 px-2.5 py-1 rounded-md">
                    {item.step}
                  </span>
                  <div className={`p-2.5 rounded-xl ${item.bgColor} ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Drives Landslide Risk Section */}
      <section
        ref={riskFactorsRef}
        className="py-24 px-6 lg:px-12 bg-[#0d162a] relative border-t border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Multi-Factor Analysis
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              What Drives Landslide Risk?
            </h3>
            <p className="text-slate-400 text-base">
              Slope instability is rarely caused by a single factor. Our platform models the complex interaction of six critical environmental parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: CloudRain,
                title: "Rainfall",
                desc: "High intensity short-duration bursts and sustained multi-day cumulative precipitation that trigger surface runoff and deep soil saturation.",
                accent: "from-blue-500/20 to-blue-600/5",
                iconColor: "text-blue-400",
              },
              {
                icon: Droplets,
                title: "Soil Moisture",
                desc: "Volumetric water content measuring pore water pressure buildup that severely weakens the shear strength of mountain slopes.",
                accent: "from-cyan-500/20 to-cyan-600/5",
                iconColor: "text-cyan-400",
              },
              {
                icon: Mountain,
                title: "Slope Angle",
                desc: "Topographical steepness and elevation gradient directly increasing gravitational shear stress along potential slip surfaces.",
                accent: "from-amber-500/20 to-amber-600/5",
                iconColor: "text-amber-400",
              },
              {
                icon: MoveDiagonal,
                title: "Ground Movement",
                desc: "Real-time creep displacement telemetry and sensor micro-fracture tracking that signal imminent slope structural failure.",
                accent: "from-rose-500/20 to-rose-600/5",
                iconColor: "text-rose-400",
              },
              {
                icon: Layers,
                title: "Soil Type",
                desc: "Geotechnical composition, clay grain ratios, bedrock depth, and permeability dynamics dictating liquid limit thresholds.",
                accent: "from-emerald-500/20 to-emerald-600/5",
                iconColor: "text-emerald-400",
              },
              {
                icon: History,
                title: "Historical Landslides",
                desc: "Geospatial records of prior slope instability, scar mapping, and historical debris flow patterns for baseline vulnerability.",
                accent: "from-purple-500/20 to-purple-600/5",
                iconColor: "text-purple-400",
              },
            ].map((factor, idx) => (
              <div
                key={idx}
                className={`group rounded-2xl p-7 bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 ${
                  riskFactorsVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br ${factor.accent} border border-white/10 ${factor.iconColor}`}>
                    <factor.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {factor.title}
                  </h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {factor.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section
        ref={previewRef}
        className="py-24 px-6 lg:px-12 bg-slate-950 relative border-t border-slate-800/80 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Live Interface Preview
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Real-Time Risk Monitoring
              </h3>
              <p className="text-slate-400 text-base max-w-xl">
                Integrated dashboard delivering telemetry feeds, automated alerts, and slope stability risk scores.
              </p>
            </div>

            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 group shrink-0"
              >
                Open Dashboard →
              </Button>
            </Link>
          </div>

          {/* Interactive Mockup Container */}
          <div
            className={`rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-8 relative ${
              previewVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    SIMULATED DEMO DATA
                  </span>
                  <span className="text-xs text-slate-400">Station ID: Demo Hillside A</span>
                </div>
                <h4 className="text-2xl font-bold text-white mt-1">
                  Sector 2 • Western Incline
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Predictive Risk Index</span>
                  <span className="text-2xl font-extrabold text-white">82 / 100</span>
                </div>
                <RiskBadge level="CRITICAL" />
              </div>
            </div>

            {/* Metrics preview grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: "24h Rainfall", val: "142 mm", status: "Critical Threshold Exceeded", icon: CloudRain, color: "text-blue-400" },
                { label: "Soil Moisture", val: "84 %", status: "Near Saturation Limit", icon: Droplets, color: "text-cyan-400" },
                { label: "Slope Gradient", val: "38°", status: "Steep Topography", icon: Mountain, color: "text-amber-400" },
                { label: "Displacement Rate", val: "4.2 mm/h", status: "Active Micro-Movement", icon: MoveDiagonal, color: "text-rose-400" },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>{m.label}</span>
                    <m.icon className={`h-4 w-4 ${m.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white">{m.val}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{m.status}</div>
                </div>
              ))}
            </div>

            {/* Alert banner mockup */}
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-rose-200">
                    Active Critical Warning Issued (ALT-8021)
                  </h5>
                  <p className="text-xs text-rose-300/80 mt-0.5">
                    Trigger: 24h rainfall (142mm) & displacement (4.2mm/h) exceeded alert safety limits.
                  </p>
                </div>
              </div>
              <Link href="/dashboard" className="shrink-0">
                <Button size="sm" className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4 rounded-lg">
                  View Full Advisory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Page Footer */}
      <footer className="py-12 px-6 lg:px-12 bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Landslide Early Warning Logo"
              className="h-9 w-9 rounded-full object-cover shadow-sm border border-white/20 shrink-0"
            />
            <div>
              <span className="font-bold text-white text-sm block">
                Landslide Risk Prediction & Early Warning System
              </span>
              <span className="text-xs text-slate-500">
                Prototype system — developed for environmental risk monitoring and early warning.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="/login" className="hover:text-slate-300 transition-colors">
              Login Access
            </Link>
            <Link href="/signup" className="hover:text-slate-300 transition-colors">
              Account Registration
            </Link>
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">
              Monitoring Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}