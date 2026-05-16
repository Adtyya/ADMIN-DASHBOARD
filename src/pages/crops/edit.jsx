import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Sprout, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { CropForm } from "./components/crop-form"
import { Link } from "react-router-dom"
import { CropService } from "../../services/crop-service"

export default function CropEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: cropResponse, isLoading } = useQuery({
    queryKey: ["crop", id],
    queryFn: () => CropService.getCropById(id),
  })

  const updateMutation = useMutation({
    mutationFn: (data) => CropService.updateCrop(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crops"] })
      queryClient.invalidateQueries({ queryKey: ["crop", id] })
      navigate("/dashboard/crops")
    },
  })

  const crop = cropResponse?.data

  const handleSubmit = async (values) => {
    try {
      const submitData = {
        ...values,
        min_moisture: parseInt(values.min_moisture),
        max_moisture: parseInt(values.max_moisture)
      }
      await updateMutation.mutateAsync(submitData)
    } catch (error) {
      console.error("Failed to update crop:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
        <p className="text-muted-foreground">Memuat data tanaman...</p>
      </div>
    )
  }

  if (!crop) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-muted-foreground">Tanaman tidak ditemukan.</p>
        <Button asChild variant="outline">
          <Link to="/dashboard/crops">Kembali ke Daftar</Link>
        </Button>
      </div>
    )
  }

  const defaultValues = {
    ...crop,
    min_moisture: crop.min_moisture.toString(),
    max_moisture: crop.max_moisture.toString(),
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Edit Tanaman
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Perbarui informasi tanaman ID: <span className="font-mono font-bold text-foreground">#{id}</span>
            </p>
          </div>
          <div className="hidden md:flex w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 items-center justify-center border border-blue-100 dark:border-blue-800/30 -rotate-3">
            <Sprout className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <CropForm defaultValues={defaultValues} onSubmit={handleSubmit} isEdit={true} />
        </div>
      </div>
    </div>
  )
}
