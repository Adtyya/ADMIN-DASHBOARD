/* eslint-disable react-refresh/only-export-components */
import { Download, FileText, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import { DataTable } from "../../components/ui/data-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DUMMY_LOGS = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  tanggal: `2026-04-${(i + 1).toString().padStart(2, "0")}`,
  deviceName: `Device A`,
  startTime: `08:00`,
  endTime: `10:00`,
  duration: 120,
  totalKwh: (Math.random() * 10).toFixed(2),
  totalWater: (Math.random() * 100).toFixed(2),
}));

const handleDownload = (id) => {
  const log = DUMMY_LOGS.find((l) => l.id === id);
  if (!log) return;

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Log Report", 14, 22);

  doc.setFontSize(11);
  doc.text(`Log ID: ${log.id}`, 14, 30);
  doc.text(`Device Name: ${log.deviceName}`, 14, 36);
  doc.text(`Date: ${log.tanggal}`, 14, 42);

  autoTable(doc, {
    startY: 50,
    head: [["Attribute", "Value"]],
    body: [
      ["Start Time", log.startTime],
      ["End Time", log.endTime],
      ["Duration (Menit)", log.duration.toString()],
      ["Total kWh", log.totalKwh.toString()],
      ["Total Water (Liter)", log.totalWater.toString()],
    ],
  });

  doc.save(`log-report-${log.id}.pdf`);
};

export const columns = [
  {
    accessorKey: "tanggal",
    header: "Tanggal",
  },
  {
    accessorKey: "deviceName",
    header: "Device Name",
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "endTime",
    header: "End Time",
  },
  {
    accessorKey: "duration",
    header: "Duration (Menit)",
  },
  {
    accessorKey: "totalKwh",
    header: "Total kWh",
  },
  {
    accessorKey: "totalWater",
    header: "Total Water (Liter)",
  },
  {
    id: "actions",
    header: "Aksi",
    meta: {
      className: "text-center w-[100px]",
    },
    cell: ({ row }) => {
      const log = row.original;

      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDownload(log.id)}
            title="Download Report PDF"
            className="hover:bg-blue-100 dark:hover:bg-blue-900/30"
          >
            <Download className="w-4 h-4 text-blue-500" />
          </Button>
        </div>
      );
    },
  },
];

export default function LogsPage() {
  return (
    <div className="flex-1 space-y-6 pb-8 pt-6 px-6 md:px-8">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Activity Logs
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Riwayat aktivitas sistem Smart Farm
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Recording</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Logs</p>
              <p className="text-2xl font-bold mt-1">{DUMMY_LOGS.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Water</p>
              <p className="text-2xl font-bold mt-1">
                {(DUMMY_LOGS.reduce((sum, log) => sum + parseFloat(log.totalWater), 0) / 1000).toFixed(1)}K L
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Energy</p>
              <p className="text-2xl font-bold mt-1">
                {(DUMMY_LOGS.reduce((sum, log) => sum + parseFloat(log.totalKwh), 0)).toFixed(1)} kWh
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="space-y-3">
        <div className="px-1">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Log Records
          </h2>
        </div>
        <div className="rounded-lg border border-border bg-background shadow-sm">
          <DataTable
            columns={columns}
            data={DUMMY_LOGS}
            searchPlaceholder="Cari berdasarkan tanggal, device, atau waktu..."
          />
        </div>
      </div>
    </div>
  );
}
