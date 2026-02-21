import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import HomeClient from "@/app/components/home/HomeClient";
import { getHomeFeed } from "@/app/actions/feed";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const { featured, items } = await getHomeFeed(session?.user?.id);

  return <HomeClient
    initialUser={session?.user || null}
    initialFeatured={featured}
    initialFeed={items}
  />;
}
