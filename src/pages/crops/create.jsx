import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Sprout, ArrowLeft } from "lucide-react"
import { Button } from "../../components/ui/button"
import { CropForm } from "./components/crop-form"
import { Link } from "react-router-dom"
import { CropService } from "../../services/crop-service"

export default function CropCreatePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: CropService.createCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crops"] })
      navigate("/dashboard/crops")
    },
  })

  const handleSubmit = async (values) => {
    try {
      const submitData = {
        ...values,
        min_moisture: parseInt(values.min_moisture),
        max_moisture: parseInt(values.max_moisture)
      }
      await createMutation.mutateAsync(submitData)
    } catch (error) {
      console.error("Failed to create crop:", error)
    }
  }

  return (
    <div className="flex-1 space-y-6 pb-8 pt-6 px-6 md:px-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
        >
          <Link to="/dashboard/crops" className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
            <ArrowLeft className="w-3 h-3" /> Kembali ke Daftar
          </Link>
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Tambah Tanaman
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Lengkapi formulir di bawah untuk menambahkan tanaman baru ke sistem
            </p>
          </div>
          <div className="hidden md:flex w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/20 items-center justify-center border border-green-100 dark:border-green-800/30 rotate-3">
            <Sprout className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <CropForm onSubmit={handleSubmit} isEdit={false} />
        </div>
      </div>

      {/* Footer Info */}
      <p className="text-center text-xs text-muted-foreground">
        Pastikan ambang batas kelembapan sesuai dengan kebutuhan spesifik tanaman tersebut.
      </p>
    </div>
  )
}
