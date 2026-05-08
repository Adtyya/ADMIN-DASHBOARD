import { Link, useNavigate } from "react-router-dom"
import { ChevronLeft, UserPlus } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { UserForm } from "./components/user-form"

export default function UserCreatePage() {
  const navigate = useNavigate()

  function onSubmit(values) {
    console.log("User terdaftar:", values)
    navigate("/dashboard/users")
  }

  return (
    <div className="flex-1 space-y-6 pb-8 pt-6 px-6 md:px-8">
      {/* Header Section */}
      <div className="space-y-3">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="hover:bg-muted mb-2"
        >
          <Link to="/dashboard/users" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Kembali ke Users
          </Link>
        </Button>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30">
              <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Tambah User Baru
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Daftarkan user baru ke sistem Smart Farm Admin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl">
        <Card className="border shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-b">
            <CardTitle className="text-lg">Data User Baru</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Isi semua field yang diperlukan untuk membuat user baru
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <UserForm onSubmit={onSubmit} isEdit={false} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
