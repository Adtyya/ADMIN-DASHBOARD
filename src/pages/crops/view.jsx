import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Sprout, ArrowLeft, Edit, Calendar, Info, Droplets, Loader2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { CropService } from "../../services/crop-service"

export default function CropViewPage() {
  const { id } = useParams()

  const { data: cropResponse, isLoading } = useQuery({
    queryKey: ["crop", id],
    queryFn: () => CropService.getCropById(id),
  })

  const crop = cropResponse?.data

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
        <p className="text-muted-foreground">Memuat detail tanaman...</p>
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

  return (
    <div className="flex-1 space-y-6 pb-8 pt-6 px-6 md:px-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
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

          <Button 
            asChild
            variant="outline"
            size="sm"
            className="border-blue-200 dark:border-blue-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
          >
            <Link to={`/dashboard/crops/edit/${id}`}>
              <Edit className="w-4 h-4 mr-2" /> Edit Tanaman
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  {crop.name}
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground border">
                  ID: #{crop.id}
                </span>
              </div>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" /> 
                Ambang batas kelembapan: {crop.min_moisture}% - {crop.max_moisture}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Detail Information */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-background rounded-xl border border-border shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 font-semibold text-foreground border-b pb-2">
              <Info className="w-4 h-4 text-green-500" />
              Deskripsi Tanaman
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "{crop.description || "Tidak ada deskripsi."}"
            </p>
          </div>
        </div>

        {/* Metadata Sidebar */}
        <div className="space-y-6">
          <div className="bg-background rounded-xl border border-border shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 font-semibold text-foreground border-b pb-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              Sistem Informasi
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Update Terakhir</p>
                <p className="text-sm font-medium">
                  {crop.update_at ? new Date(crop.update_at).toLocaleString('id-ID') : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
