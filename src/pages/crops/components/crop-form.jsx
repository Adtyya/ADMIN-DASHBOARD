import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Link } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { CheckCircle2, AlertCircle } from "lucide-react"

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
import { Textarea } from "../../../components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama tanaman minimal 2 karakter.",
  }),
  min_moisture: z.string().min(1, {
    message: "Kelembapan minimum harus diisi.",
  }),
  max_moisture: z.string().min(1, {
    message: "Kelembapan maksimum harus diisi.",
  }),
  description: z.string().optional(),
})

export function CropForm({ defaultValues, onSubmit, isEdit }) {
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      min_moisture: "",
      max_moisture: "",
      description: "",
    },
  })

  const handleSubmit = (values) => {
    setFormData(values)
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
              <h3 className="text-sm font-semibold text-foreground">Informasi Tanaman</h3>
              <p className="text-xs text-muted-foreground mt-1">Masukkan data detail tanaman</p>
            </div>

            <div className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Nama Tanaman *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Contoh: Padi, Jagung, dll" 
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Min Moisture Field */}
                <FormField
                  control={form.control}
                  name="min_moisture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Kelembapan Min (%) *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type="number"
                            placeholder="0" 
                            {...field}
                            className="pl-4 pr-4 h-10 bg-background border-border hover:border-blue-300 focus:border-blue-500 dark:hover:border-blue-700 dark:focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Max Moisture Field */}
                <FormField
                  control={form.control}
                  name="max_moisture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Kelembapan Max (%) *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type="number"
                            placeholder="100" 
                            {...field}
                            className="pl-4 pr-4 h-10 bg-background border-border hover:border-blue-300 focus:border-blue-500 dark:hover:border-blue-700 dark:focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Masukkan deskripsi tanaman..." 
                        {...field}
                        className="min-h-[100px] bg-background border-border hover:border-blue-300 focus:border-blue-500 dark:hover:border-blue-700 dark:focus:border-blue-500 transition-colors"
                      />
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
              <Link to="/dashboard/crops">Batal</Link>
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
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
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                {isEdit ? "Konfirmasi Update" : "Konfirmasi Simpan"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-foreground">
                {isEdit 
                  ? "Apakah Anda yakin ingin menyimpan perubahan data tanaman ini?" 
                  : "Apakah Anda yakin ingin menyimpan data tanaman baru ini?"}
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
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
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
