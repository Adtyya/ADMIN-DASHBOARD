import { Link } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Edit, Search as ViewIcon, Trash2, Sprout, Loader2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { DataTable } from "../../components/ui/data-table"
import { CropService } from "../../services/crop-service"

export default function CropsPage() {
  const queryClient = useQueryClient()

  const { data: cropsResponse, isLoading } = useQuery({
    queryKey: ["crops"],
    queryFn: CropService.getAllCrops,
  })

  const deleteMutation = useMutation({
    mutationFn: CropService.deleteCrop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crops"] })
    },
  })

  const crops = cropsResponse?.data || []

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tanaman ini?")) {
      try {
        await deleteMutation.mutateAsync(id)
      } catch (error) {
        console.error("Failed to delete crop:", error)
      }
    }
  }

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nama Tanaman",
    },
    {
      accessorKey: "min_moisture",
      header: "Min Kelembapan (%)",
    },
    {
      accessorKey: "max_moisture",
      header: "Max Kelembapan (%)",
    },
    {
      id: "actions",
      header: "Aksi",
      meta: {
        className: "text-center w-[150px]"
      },
      cell: ({ row }) => {
        const crop = row.original

        return (
          <div className="flex items-center justify-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className="hover:bg-blue-100 dark:hover:bg-blue-900/30"
            >
              <Link to={`/dashboard/crops/edit/${crop.id}`} title="Edit Tanaman">
                <Edit className="h-4 w-4 text-blue-500" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className="hover:bg-green-100 dark:hover:bg-green-900/30"
            >
              <Link to={`/dashboard/crops/view/${crop.id}`} title="View Tanaman">
                <ViewIcon className="h-4 w-4 text-green-500" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleDelete(crop.id)}
              disabled={deleteMutation.isPending}
              className="hover:bg-red-100 dark:hover:bg-red-900/30"
              title="Delete Tanaman"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex-1 space-y-6 pb-8 pt-6 px-6 md:px-8">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Crop Management
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Kelola data tanaman dan ambang batas kelembapan
            </p>
          </div>
          <Button 
            asChild 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
          >
            <Link to="/dashboard/crops/create">
              <Plus className="mr-2 h-4 w-4" /> Tambah Tanaman
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-3 md:grid-cols-1">
        <div className="rounded-lg border border-border bg-gradient-to-br from-green-50 to-emerald-100/50 dark:from-green-950/20 dark:to-emerald-900/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Tanaman</p>
              <p className="text-2xl font-bold mt-1">{isLoading ? "..." : crops.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Sprout className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="space-y-3">
        <div className="px-1">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Crop List
          </h2>
        </div>
        <div className="rounded-lg border border-border bg-background shadow-sm">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              <p className="text-sm text-muted-foreground">Memuat data tanaman...</p>
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={crops} 
              searchPlaceholder="Cari berdasarkan nama tanaman..." 
            />
          )}
        </div>
      </div>
    </div>
  )
}
