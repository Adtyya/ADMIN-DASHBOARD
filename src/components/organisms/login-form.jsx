import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card"

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username harus diisi." }),
  password: z.string().min(1, { message: "Password harus diisi." }),
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values) {
    setIsLoading(true)
    setTimeout(() => {
      if (values.username === "Admin" && values.password === "Admin88") {
        localStorage.setItem("isAuthenticated", "true")
        navigate("/dashboard")
      } else {
        form.setError("root", { type: "manual", message: "Username atau Password salah." })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="shadow-lg border-blue-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-blue-900 text-center">Login</CardTitle>
        <CardDescription className="text-center text-blue-600/80">
          Masukkan username dan password untuk masuk ke dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {form.formState.errors.root && (
              <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
                {form.formState.errors.root.message}
              </div>
            )}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-medium">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Admin"
                      className="border-blue-200 focus-visible:ring-blue-500 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900 font-medium">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      className="border-blue-200 focus-visible:ring-blue-500 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-600/20"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center flex-col gap-2 text-sm text-blue-600/70 pb-6">
        {/* <div className="text-sm text-blue-900">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
            Daftar di sini
          </Link>
        </div> */}
        <span>&copy; 2026 Kelompok B - 15</span>
      </CardFooter>
    </Card>
  )
}
