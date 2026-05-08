import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Link } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
} from "../../../components/ui/alert-dialog"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok.",
  path: ["confirmPassword"],
})

export function UserForm({ defaultValues, onSubmit, isEdit }) {
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = (values) => {
    if (!isEdit && !values.password) {
      form.setError("password", { type: "manual", message: "Password minimal 6 karakter." })
      return
    }
    const { confirmPassword, ...submitData } = values
    setFormData(submitData)
    setOpenDialog(true)
  }

  const handleConfirm = () => {
    setOpenDialog(false)
    if (formData) {
      onSubmit(formData)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Information Section */}
          <div className="space-y-4">
            <div className="px-1">
              <h3 className="text-sm font-semibold text-foreground">Informasi Pengguna</h3>
              <p className="text-xs text-muted-foreground mt-1">Masukkan data dasar pengguna</p>
            </div>

            <div className="space-y-4">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Username *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="johndoe" 
                          {...field}
                          className="pl-4 pr-4 h-10 bg-background border-border hover:border-blue-300 focus:border-blue-500 dark:hover:border-blue-700 dark:focus:border-blue-500 transition-colors"
                        />
                        {field.value && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type="email" 
                          placeholder="john@example.com" 
                          {...field}
                          className="pl-4 pr-4 h-10 bg-background border-border hover:border-blue-300 focus:border-blue-500 dark:hover:border-blue-700 dark:focus:border-blue-500 transition-colors"
                        />
                        {field.value && !form.formState.errors.email && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          </div>
                        )}
                        {form.formState.errors.email && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4 pt-2">
            <div className="px-1">
              <h3 className="text-sm font-semibold text-foreground">Keamanan</h3>
              <p className="text-xs text-muted-foreground mt-1">Atur password untuk pengguna</p>
            </div>

            <div className="space-y-4">
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {isEdit ? "Password Baru (Opsional)" : "Password *"}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder={isEdit ? "Biarkan kosong jika tidak ingin ubah" : "Masukkan password"} 
                          {...field}
                          className="pl-4 pr-12 h-10 bg-background border-border hover:border-blue-300 focus:border-blue-500 dark:hover:border-blue-700 dark:focus:border-blue-500 transition-colors"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-muted"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Konfirmasi Password {!isEdit && "*"}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder={isEdit ? "Ulangi password baru" : "Ulangi password"} 
                          {...field}
                          className="pl-4 pr-12 h-10 bg-background border-border hover:border-blue-300 focus:border-blue-500 dark:hover:border-blue-700 dark:focus:border-blue-500 transition-colors"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-muted"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t">
            <Button 
              type="button"
              variant="outline" 
              asChild
              className="border-border hover:bg-muted"
            >
              <Link to="/dashboard/users">Batal</Link>
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
            >
              {isEdit ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Confirmation Dialog */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="p-0 border-none bg-transparent shadow-none w-full max-w-md">
          <Card className="border shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                {isEdit ? "Konfirmasi Update" : "Konfirmasi Simpan"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-foreground">
                {isEdit 
                  ? "Apakah Anda yakin ingin menyimpan perubahan data user ini?" 
                  : "Apakah Anda yakin ingin menyimpan data user baru ini?"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <AlertDialogCancel asChild>
                <Button variant="outline" className="border-border hover:bg-muted">
                  Batal
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button 
                  onClick={handleConfirm} 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
                >
                  {isEdit ? "Update" : "Simpan"}
                </Button>
              </AlertDialogAction>
            </CardFooter>
          </Card>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
