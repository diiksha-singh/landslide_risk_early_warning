type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

const RISK_STYLES: Record<RiskLevel, { bg: string; label: string }> = {
    LOW: { bg: "var(--risk-low)", label: "LOW" },
    MODERATE: { bg: "var(--risk-moderate)", label: "MODERATE" },
    HIGH: { bg: "var(--risk-high)", label: "HIGH" },
    CRITICAL: { bg: "var(--risk-critical)", label: "CRITICAL" },
};

export function RiskBadge({ level }: { level: RiskLevel }) {
    const style = RISK_STYLES[level];

    return (
        <span
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-white"
            style={{ backgroundColor: style.bg }}
        >
            {style.label}
        </span>
    );
}