import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1 overflow-x-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</main>
        </div>
    );
}