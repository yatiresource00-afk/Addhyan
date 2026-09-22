import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/auth/session";
import { isDirector, roleLabel } from "@/lib/auth/roles";
import { CreateUserForm, RoleSelectForm } from "@/components/admin/UserForms";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Users · Administration",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const staff = await requireStaff();
  if (!staff) redirect("/admin/login");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Users</h1>
        <p className="text-muted-foreground mt-2">
          Create students and (Directors only) promote Moderators or Directors.
        </p>
      </div>
      <CreateUserForm canAssignStaff={isDirector(staff.role)} />
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-muted/60 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Role</th>
              {isDirector(staff.role) ? (
                <th className="px-4 py-3 font-medium">Change role</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-navy">{user.name}</td>
                <td className="px-4 py-3">
                  <div>{user.email}</div>
                  <div className="text-muted-foreground text-xs">{user.phone || "No WhatsApp"}</div>
                </td>
                <td className="px-4 py-3">{roleLabel(user.role)}</td>
                {isDirector(staff.role) ? (
                  <td className="px-4 py-3">
                    <RoleSelectForm userId={user.id} role={user.role} />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
