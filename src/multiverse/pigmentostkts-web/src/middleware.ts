export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/((?!api|uploads|view-design|brand|materials|cut-types|project-types|_next/static|_next/image|favicon.ico).*)"],
};
