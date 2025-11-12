import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ ok: false, error: "unauthorized" });

  const tenantId = (session as any).tenantId as string;
  const role = (session as any).role as string;

  // eenvoudig voorbeeld: alleen admins/architects mogen tenantdata lezen
  if (!["admin", "architect"].includes(role)) {
    return res.status(403).json({ ok: false, error: "forbidden" });
  }

  // hier zou je tenant-specifieke data ophalen
  return res.status(200).json({
    ok: true,
    tenantId,
    by: session.user?.email,
    data: [{ id: 1, name: "Demo item" }],
  });
}
