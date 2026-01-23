import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CVClient } from "@/components/cv/CVClient";

export default async function AdminCVPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    return <CVClient mode="admin" />;
}
