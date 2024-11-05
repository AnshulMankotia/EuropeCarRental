import Navbar from "@/Components/Navbar";

export default function AuthenticatedLayout({ user, children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />
      <main>{children}</main>
    </div>
  );
}
