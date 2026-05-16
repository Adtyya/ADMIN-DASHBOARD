import { Link, useParams } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"

export default function UserViewPage() {
  const { id } = useParams()

  const user = {
    id: id,
    username: `user_${id}`,
    email: `user${id}@example.com`,
    role: id === "1" ? "Admin" : "User"
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/users">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Detail User</h2>
      </div>

      <div className="max-w-2xl">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Informasi User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">ID User</label>
              <Input value={user.id} readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Username</label>
              <Input value={user.username} readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email</label>
              <Input value={user.email} readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Role</label>
              <Input value={user.role} readOnly />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-4">
              <Button asChild>
                <Link to="/dashboard/users">Kembali</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
