import { Link } from "react-router-dom"
import { Plus, Edit, Search as ViewIcon, Trash2, Users as UsersIcon, UserCheck } from "lucide-react"
import { Button } from "../../components/ui/button"
import { DataTable } from "../../components/ui/data-table"

const DUMMY_USERS = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  username: `user_${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i === 0 ? "Admin" : "User",
}))

const adminCount = DUMMY_USERS.filter(u => u.role === "Admin").length;
const userCount = DUMMY_USERS.filter(u => u.role === "User").length;

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          role === "Admin" 
            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
        }`}>
          {role}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    meta: {
      className: "text-center w-[150px]"
    },
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex items-center justify-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            asChild
            className="hover:bg-blue-100 dark:hover:bg-blue-900/30"
          >
            <Link to={`/dashboard/users/edit/${user.id}`} title="Edit User">
              <Edit className="h-4 w-4 text-blue-500" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            asChild
            className="hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            <Link to={`/dashboard/users/view/${user.id}`} title="View User">
              <ViewIcon className="h-4 w-4 text-green-500" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => console.log('Delete', user.id)}
            className="hover:bg-red-100 dark:hover:bg-red-900/30"
            title="Delete User"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      )
    },
  },
]

export default function UsersPage() {
  return (
    <div className="flex-1 space-y-6 pb-8 pt-6 px-6 md:px-8">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Kelola pengguna sistem Smart Farm Admin
            </p>
          </div>
          <Button 
            asChild 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
          >
            <Link to="/dashboard/users/create">
              <Plus className="mr-2 h-4 w-4" /> Tambah User
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Users</p>
              <p className="text-2xl font-bold mt-1">{DUMMY_USERS.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Admins / Users</p>
              <p className="text-2xl font-bold mt-1">{adminCount} / {userCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="space-y-3">
        <div className="px-1">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            User List
          </h2>
        </div>
        <div className="rounded-lg border border-border bg-background shadow-sm">
          <DataTable 
            columns={columns} 
            data={DUMMY_USERS} 
            searchPlaceholder="Cari berdasarkan username, email, atau role..." 
          />
        </div>
      </div>
    </div>
  )
}
