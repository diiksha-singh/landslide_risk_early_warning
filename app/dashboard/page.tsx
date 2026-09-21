"use client";

import { useState, useEffect } from "react";
import { RiskBadge } from "@/components/risk-badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    AlertTriangle,
    ShieldAlert,
    Activity,
    CloudRain,
    Droplets,
    Mountain,
    MoveDiagonal,
    RefreshCw,
    Clock,
    CheckCircle2,
    SlidersHorizontal,
    ArrowUpRight,
    Info,
    TrendingUp,
    ShieldCheck,
    Layers,
    ChevronRight
} from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    Legend
} from "recharts";

// Demo trend telemetry dataset over 24 hours
const TELEMETRY_TREND = [
    { time: "00:00", riskScore: 22, rainfall: 8, soilMoisture: 42, movement: 0.2 },
    { time: "03:00", riskScore: 26, rainfall: 15, soilMoisture: 46, movement: 0.3 },
    { time: "06:00", riskScore: 38, rainfall: 32, soilMoisture: 54, movement: 0.6 },
    { time: "09:00", riskScore: 52, rainfall: 60, soilMoisture: 65, movement: 1.2 },
    { time: "12:00", riskScore: 68, rainfall: 92, soilMoisture: 74, movement: 2.1 },
    { time: "15:00", riskScore: 76, rainfall: 118, soilMoisture: 79, movement: 3.2 },
    { time: "18:00", riskScore: 82, rainfall: 142, soilMoisture: 84, movement: 4.2 },
    { time: "21:00", riskScore: 78, rainfall: 128, soilMoisture: 82, movement: 3.8 },
    { time: "24:00 (FC)", riskScore: 70, rainfall: 95, soilMoisture: 78, movement: 2.9 },
];

// Monitored location profiles for demo selection
const MONITORED_LOCATIONS = [
    {
        id: "demo-hillside-a",
        name: "Demo Hillside A",
        sector: "Sector 2 • Western Incline",
        coordinates: "31.1048° N, 77.1734° E",
        score: 82,
        level: "CRITICAL" as const,
        assessment: "Multi-factor ML model indicates high potential for slope instability due to sustained heavy rainfall and active ground movement.",
        indicators: {
            rainfall: { value: "142 mm", sub: "24h Cumulative", threshold: "100 mm", percent: 88, status: "Critical Level", isWarning: true },
            soilMoisture: { value: "84 %", sub: "Volumetric Content", threshold: "75 %", percent: 84, status: "Near Saturation", isWarning: true },
            slopeAngle: { value: "38°", sub: "Incline Gradient", threshold: "30°", percent: 76, status: "Steep Terrain", isWarning: false },
            groundMovement: { value: "4.2 mm/h", sub: "Displacement Rate", threshold: "2.0 mm/h", percent: 84, status: "Active Displacement", isWarning: true },
        }
    },
    {
        id: "sector-4-pass",
        name: "Sector 4 Mountain Pass",
        sector: "Sector 4 • Highway Incline",
        coordinates: "31.1215° N, 77.1980° E",
        score: 68,
        level: "HIGH" as const,
        assessment: "Elevated risk caused by steep slope geometry combined with soil moisture saturation above safety thresholds.",
        indicators: {
            rainfall: { value: "98 mm", sub: "24h Cumulative", threshold: "100 mm", percent: 72, status: "High Rainfall", isWarning: true },
            soilMoisture: { value: "78 %", sub: "Volumetric Content", threshold: "75 %", percent: 78, status: "Saturated", isWarning: true },
            slopeAngle: { value: "42°", sub: "Incline Gradient", threshold: "30°", percent: 84, status: "Very Steep", isWarning: true },
            groundMovement: { value: "1.8 mm/h", sub: "Displacement Rate", threshold: "2.0 mm/h", percent: 45, status: "Moderate", isWarning: false },
        }
    },
    {
        id: "valley-ridge-east",
        name: "Valley Ridge East",
        sector: "Sector 1 • Residential Perimeter",
        coordinates: "31.0892° N, 77.1512° E",
        score: 48,
        level: "MODERATE" as const,
        assessment: "Moderate advisory. Sensor telemetry shows steady moisture accumulation; routine watch protocols active.",
        indicators: {
            rainfall: { value: "54 mm", sub: "24h Cumulative", threshold: "100 mm", percent: 45, status: "Moderate", isWarning: false },
            soilMoisture: { value: "62 %", sub: "Volumetric Content", threshold: "75 %", percent: 58, status: "Normal Range", isWarning: false },
            slopeAngle: { value: "28°", sub: "Incline Gradient", threshold: "30°", percent: 50, status: "Moderate Incline", isWarning: false },
            groundMovement: { value: "0.6 mm/h", sub: "Displacement Rate", threshold: "2.0 mm/h", percent: 20, status: "Minimal", isWarning: false },
        }
    },
];

// Demo recent alerts list
const RECENT_ALERTS = [
    {
        id: "ALT-8021",
        location: "Demo Hillside A",
        sector: "Sector 2",
        level: "CRITICAL" as const,
        score: 82,
        trigger: "24h rainfall (142mm) & ground displacement (4.2mm/h) exceeded alert threshold",
        action: "Evacuate lower slope settlements & deploy emergency barrier response team.",
        time: "12 mins ago",
    },
    {
        id: "ALT-8019",
        location: "Sector 4 Mountain Pass",
        sector: "Sector 4",
        level: "HIGH" as const,
        score: 68,
        trigger: "Soil moisture saturation reached 78% on 42° slope angle",
        action: "Restrict heavy vehicle transit and send geotechnical inspection team.",
        time: "45 mins ago",
    },
    {
        id: "ALT-8014",
        location: "Valley Ridge East",
        sector: "Sector 1",
        level: "MODERATE" as const,
        score: 48,
        trigger: "Cumulative rainfall reached 54mm within 12-hour window",
        action: "Increase sensor telemetry polling frequency to 5-minute intervals.",
        time: "2 hours ago",
    },
    {
        id: "ALT-8008",
        location: "North Slope Station",
        sector: "Sector 3",
        level: "LOW" as const,
        score: 18,
        trigger: "Routine telemetry sync completed. All sensors nominal.",
        action: "Standard automated monitoring active. No intervention required.",
        time: "5 hours ago",
    },
];

export default function DashboardPage() {
    const [mounted, setMounted] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState("Just now");
    const [selectedLocationId, setSelectedLocationId] = useState("demo-hillside-a");
    const [chartMode, setChartMode] = useState<"risk" | "telemetry">("risk");

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentLocation =
        MONITORED_LOCATIONS.find((loc) => loc.id === selectedLocationId) ||
        MONITORED_LOCATIONS[0];

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 600);
    };

    return (
        <div className="space-y-8">
            {/* 1. Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/80 pb-6">
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                            Multi-Factor Landslide Risk Monitoring
                        </h1>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Telemetry Active
                        </span>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
                        Combining rainfall, soil moisture, slope, and ground movement for automated landslide risk classification.
                    </p>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto">
                    <div className="flex items-center gap-2 rounded-xl border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-2xs">
                        <Clock className="h-3.5 w-3.5 text-blue-500" />
                        <span>Last sync: {lastSyncTime}</span>
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="gap-2 shadow-2xs rounded-xl border-border/80 cursor-pointer"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-blue-500" : ""}`} />
                        <span>Refresh</span>
                    </Button>
                </div>
            </div>

            {/* 2. Top Summary KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* KPI Card 1: Monitored Locations */}
                <Card className="relative overflow-hidden transition-all hover:shadow-md border-border/80 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Monitored Sites
                        </CardTitle>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            <MapPin className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-foreground">12</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            Across 3 geographical sectors
                        </p>
                    </CardContent>
                </Card>

                {/* KPI Card 2: Active Alerts */}
                <Card className="relative overflow-hidden transition-all hover:shadow-md border-border/80 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Active Early Warnings
                        </CardTitle>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <AlertTriangle className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">3</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            1 Critical • 2 High Risk advisories
                        </p>
                    </CardContent>
                </Card>

                {/* KPI Card 3: Elevated Risk Sites */}
                <Card className="relative overflow-hidden transition-all hover:shadow-md border-border/80 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Priority Watch Sites
                        </CardTitle>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                            <ShieldAlert className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">4</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            33% of stations require inspection
                        </p>
                    </CardContent>
                </Card>

                {/* KPI Card 4: Latest Peak Risk Score */}
                <Card className="relative overflow-hidden transition-all hover:shadow-md border-border/80 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Peak Predictive Index
                        </CardTitle>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            <Activity className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-extrabold text-foreground">82</span>
                            <span className="text-xs font-semibold text-muted-foreground">/ 100</span>
                            <RiskBadge level="CRITICAL" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                            Station: Demo Hillside A
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Prominent Current Risk & Location Spotlight */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <Card className="lg:col-span-12 border-primary/20 shadow-md bg-card relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-600" />
                    <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                                        Monitored Station Spotlight
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 mt-1">
                                    <CardTitle className="text-xl sm:text-2xl font-extrabold">
                                        {currentLocation.name}
                                    </CardTitle>
                                    <RiskBadge level={currentLocation.level} />
                                </div>
                                <CardDescription className="text-xs sm:text-sm mt-0.5">
                                    {currentLocation.sector} • Coordinates: {currentLocation.coordinates}
                                </CardDescription>
                            </div>

                            {/* Location Selector Buttons */}
                            <div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-xl border border-border/80">
                                {MONITORED_LOCATIONS.map((loc) => (
                                    <button
                                        key={loc.id}
                                        onClick={() => setSelectedLocationId(loc.id)}
                                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                                            selectedLocationId === loc.id
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {loc.name.split(" ")[0]} {loc.name.split(" ")[1] || ""}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Risk Assessment Banner & Progress Meter */}
                        <div className="rounded-2xl bg-muted/40 p-5 border border-border/80">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-red-500" />
                                    <span className="text-sm font-bold text-foreground">
                                        Multi-Factor Predictive Risk Score
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-extrabold text-foreground">
                                        {currentLocation.score}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-semibold">/ 100 Index</span>
                                </div>
                            </div>

                            {/* Risk Meter Visual Bar */}
                            <div className="w-full bg-muted/80 rounded-full h-4 p-0.5 overflow-hidden border border-border/60">
                                <div
                                    className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-600 shadow-sm"
                                    style={{ width: `${currentLocation.score}%` }}
                                />
                            </div>

                            <p className="text-xs text-muted-foreground mt-3 leading-relaxed flex items-start gap-2">
                                <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                <span>{currentLocation.assessment}</span>
                            </p>
                        </div>

                        {/* Environmental Risk Indicators Grid */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                                Key Environmental Indicators
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Indicator 1: Rainfall */}
                                <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs hover:border-blue-500/40 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                <CloudRain className="h-4 w-4" />
                                            </div>
                                            <span className="text-xs font-bold text-muted-foreground">Rainfall</span>
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                            {currentLocation.indicators.rainfall.status}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-extrabold text-foreground">
                                        {currentLocation.indicators.rainfall.value}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        {currentLocation.indicators.rainfall.sub}
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                                            <span>Safety Threshold</span>
                                            <span>{currentLocation.indicators.rainfall.threshold}</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className="bg-blue-500 h-full rounded-full"
                                                style={{ width: `${currentLocation.indicators.rainfall.percent}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Indicator 2: Soil Moisture */}
                                <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs hover:border-cyan-500/40 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                                                <Droplets className="h-4 w-4" />
                                            </div>
                                            <span className="text-xs font-bold text-muted-foreground">Soil Moisture</span>
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                                            {currentLocation.indicators.soilMoisture.status}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-extrabold text-foreground">
                                        {currentLocation.indicators.soilMoisture.value}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        {currentLocation.indicators.soilMoisture.sub}
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                                            <span>Saturation Limit</span>
                                            <span>{currentLocation.indicators.soilMoisture.threshold}</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className="bg-cyan-500 h-full rounded-full"
                                                style={{ width: `${currentLocation.indicators.soilMoisture.percent}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Indicator 3: Slope Angle */}
                                <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs hover:border-amber-500/40 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                                <Mountain className="h-4 w-4" />
                                            </div>
                                            <span className="text-xs font-bold text-muted-foreground">Slope Angle</span>
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                            {currentLocation.indicators.slopeAngle.status}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-extrabold text-foreground">
                                        {currentLocation.indicators.slopeAngle.value}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        {currentLocation.indicators.slopeAngle.sub}
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                                            <span>Critical Gradient</span>
                                            <span>{currentLocation.indicators.slopeAngle.threshold}</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className="bg-amber-500 h-full rounded-full"
                                                style={{ width: `${currentLocation.indicators.slopeAngle.percent}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Indicator 4: Ground Movement */}
                                <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs hover:border-rose-500/40 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                                                <MoveDiagonal className="h-4 w-4" />
                                            </div>
                                            <span className="text-xs font-bold text-muted-foreground">Ground Displacement</span>
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                                            {currentLocation.indicators.groundMovement.status}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-extrabold text-foreground">
                                        {currentLocation.indicators.groundMovement.value}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5">
                                        {currentLocation.indicators.groundMovement.sub}
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                                            <span>Movement Threshold</span>
                                            <span>{currentLocation.indicators.groundMovement.threshold}</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className="bg-rose-500 h-full rounded-full"
                                                style={{ width: `${currentLocation.indicators.groundMovement.percent}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 4. Risk & Telemetry Visual Chart (Recharts) */}
            <Card className="border-border/80 shadow-xs">
                <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-lg font-bold">
                                24-Hour Environmental Risk & Telemetry Trend
                            </CardTitle>
                            <CardDescription className="text-xs sm:text-sm">
                                Predictive risk score curve alongside cumulative rainfall and soil moisture sensor telemetry.
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-xl border border-border/80">
                            <button
                                onClick={() => setChartMode("risk")}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                                    chartMode === "risk"
                                        ? "bg-blue-600 text-white shadow-xs font-semibold"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                Risk Index View
                            </button>
                            <button
                                onClick={() => setChartMode("telemetry")}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                                    chartMode === "telemetry"
                                        ? "bg-blue-600 text-white shadow-xs font-semibold"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                Multi-Factor Telemetry
                            </button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-4">
                    <div className="h-[340px] w-full">
                        {mounted ? (
                            <ResponsiveContainer width="100%" height="100%">
                                {chartMode === "risk" ? (
                                    <AreaChart
                                        data={TELEMETRY_TREND}
                                        margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#dc2626" stopOpacity={0.0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                                        <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                                        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "var(--color-card)",
                                                borderColor: "var(--color-border)",
                                                borderRadius: "0.75rem",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                fontSize: "12px"
                                            }}
                                            formatter={(value: any) => [`${value} / 100`, "Risk Score"]}
                                        />
                                        <ReferenceLine y={75} stroke="#dc2626" strokeDasharray="4 4" label={{ value: "Critical Risk Threshold (75)", fill: "#dc2626", fontSize: 11, position: "top" }} />
                                        <Area
                                            type="monotone"
                                            dataKey="riskScore"
                                            name="Predicted Risk Score"
                                            stroke="#dc2626"
                                            strokeWidth={2.5}
                                            fillOpacity={1}
                                            fill="url(#riskGradient)"
                                        />
                                    </AreaChart>
                                ) : (
                                    <LineChart
                                        data={TELEMETRY_TREND}
                                        margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                                        <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "var(--color-card)",
                                                borderColor: "var(--color-border)",
                                                borderRadius: "0.75rem",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                fontSize: "12px"
                                            }}
                                        />
                                        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                                        <Line type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke="#2563eb" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="soilMoisture" name="Soil Moisture (%)" stroke="#0891b2" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="riskScore" name="Risk Score (/100)" stroke="#dc2626" strokeWidth={2} dot={false} />
                                    </LineChart>
                                )}
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-xl">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                                    <span>Rendering risk telemetry chart...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* 5. Recent Early Warning Alerts Feed */}
            <Card className="border-border/80 shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                        <CardTitle className="text-lg font-bold">Recent Early Warning Advisories</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Automated triggers and recommended emergency mitigation response plans.
                        </CardDescription>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                        4 Active Entries
                    </span>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {RECENT_ALERTS.map((alert) => (
                            <div
                                key={alert.id}
                                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border/80 bg-card hover:bg-muted/30 transition-all gap-4"
                            >
                                <div className="space-y-1.5 flex-1">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <RiskBadge level={alert.level} />
                                        <span className="font-bold text-sm text-foreground">
                                            {alert.location}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-medium">
                                            ({alert.sector})
                                        </span>
                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded font-mono">
                                            Score: {alert.score}/100
                                        </span>
                                    </div>

                                    <p className="text-xs text-foreground font-medium flex items-center gap-1.5">
                                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                        <span>Trigger: {alert.trigger}</span>
                                    </p>

                                    <div className="text-xs text-muted-foreground bg-muted/50 p-2.5 rounded-lg border border-border/60">
                                        <span className="font-bold text-foreground">Recommended Action: </span>
                                        {alert.action}
                                    </div>
                                </div>

                                <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-2 md:pt-0 shrink-0 gap-1 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        {alert.time}
                                    </span>
                                    <button className="text-xs text-blue-500 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer">
                                        Advisory Details <ChevronRight className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}