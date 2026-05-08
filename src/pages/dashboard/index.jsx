import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  Cloud,
  Thermometer,
  Sun,
  Droplets,
  Power,
  Zap,
  Info,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useThemeContext } from "../../context/ThemeContext";

// Stat Card Component dengan UI Profesional
function StatCard({ title, value, unit, icon: Icon, color, status, trend, description }) {
  const { isDark } = useThemeContext();
  
  const colorMap = {
    blue: isDark ? "from-blue-600/20 to-blue-700/10 border-blue-500/30" : "from-blue-50 to-blue-100/50 border-blue-200",
    orange: isDark ? "from-orange-600/20 to-orange-700/10 border-orange-500/30" : "from-orange-50 to-orange-100/50 border-orange-200",
    green: isDark ? "from-green-600/20 to-green-700/10 border-green-500/30" : "from-green-50 to-green-100/50 border-green-200",
    red: isDark ? "from-red-600/20 to-red-700/10 border-red-500/30" : "from-red-50 to-red-100/50 border-red-200",
    purple: isDark ? "from-purple-600/20 to-purple-700/10 border-purple-500/30" : "from-purple-50 to-purple-100/50 border-purple-200",
  };

  const iconColorMap = {
    blue: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
    orange: "text-orange-500 bg-orange-100 dark:bg-orange-900/30",
    green: "text-green-500 bg-green-100 dark:bg-green-900/30",
    red: "text-red-500 bg-red-100 dark:bg-red-900/30",
    purple: "text-purple-500 bg-purple-100 dark:bg-purple-900/30",
  };

  return (
    <Card className={`border bg-gradient-to-br ${colorMap[color]} hover:shadow-lg transition-all duration-300`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">
              {title}
            </CardTitle>
          </div>
          <div className={`p-2.5 rounded-lg ${iconColorMap[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold tracking-tight">{value}</div>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            {description ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : status ? (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                status === "normal" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : 
                status === "warning" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}>
                {status === "normal" ? "✓ Normal" : status === "warning" ? "⚠ Warning" : "✕ Alert"}
              </span>
            ) : null}
            {trend && (
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>{trend}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Alert/Info Card Component
function AlertCard({ message }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-blue-200 dark:border-blue-700/50 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
      <div className="relative flex gap-3">
        <div className="flex-shrink-0">
          <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-300 mb-1">
            Automation Status
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isDark } = useThemeContext();

  const dummyData = {
    weather: "Cerah Berawan",
    temperature: "28°C",
    lightIntensity: "850 lux",
    soilMoisture: "45%",
    pumpStatus: "ON",
    electricityUsage: "1.2 kWh",
    pumpDurationMinutes: 45,
    automationReason:
      "Pompa menyala karena ramalan cuaca kemarau dan sensor tanah mendeteksi kekeringan kritis.",
  };

  const waterUsage = dummyData.pumpDurationMinutes * 100;
  const grafanaTheme = isDark ? "dark" : "light"; //grafik grafana mengikuti tema 

  return (
    <div className="flex-1 space-y-6 pb-8 pt-6 px-6 md:px-8">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Dashboard Monitoring
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Smart Farm Automation System
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Live Data</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Real-time Sensors */}
      <div className="space-y-3">
        <div className="px-1">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Real-time Sensors
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Cuaca"
            value={dummyData.weather}
            unit=""
            icon={Cloud}
            color="blue"
            description="Update terakhir: 10 menit lalu"
          />
          <StatCard
            title="Temperatur"
            value={dummyData.temperature}
            unit="°C"
            icon={Thermometer}
            color="orange"
            description="Suhu normal"
            trend="↑ 2°"
          />
          <StatCard
            title="Intensitas Cahaya"
            value={dummyData.lightIntensity}
            unit=""
            icon={Sun}
            color="purple"
            description="Sinar matahari cukup"
          />
          <StatCard
            title="Kelembaban Tanah"
            value={dummyData.soilMoisture}
            unit=""
            icon={Droplets}
            color="green"
            description="Kondisi tanah ideal"
          />
        </div>
      </div>

      {/* SECTION 2: System Status */}
      <div className="space-y-3">
        <div className="px-1">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            System Status
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Status Pompa"
            value={dummyData.pumpStatus}
            unit={`${dummyData.pumpDurationMinutes}m`}
            icon={Power}
            color="green"
            description="Aktif selama 45 menit"
          />
          <StatCard
            title="Penggunaan Listrik"
            value={dummyData.electricityUsage}
            unit=""
            icon={Zap}
            color="orange"
            description="Total pemakaian"
          />
          <StatCard
            title="Penggunaan Air"
            value={waterUsage.toLocaleString()}
            unit="L"
            icon={Droplets}
            color="blue"
            description={`${dummyData.pumpDurationMinutes} mnt x 100L/mnt`}
            trend="↑ 5%"
          />
        </div>
      </div>

      {/* SECTION 3: Automation Info */}
      <div>
        <AlertCard message={dummyData.automationReason} />
      </div>

      {/* SECTION 4: Grafana Charts */}
      <div className="space-y-3">
        <div className="px-1">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Grafana Monitoring
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time visualization dari Grafana
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {/* Suhu Udara */}
          <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-full overflow-hidden">
              <iframe
                key={`grafana-1-${grafanaTheme}`}
                src={`http://103.93.160.128:3000/d-solo/adnw6vb/smart-agriculture-capstone?orgId=1&from=1777437017465&to=1777438817465&timezone=browser&refresh=10s&panelId=panel-1&theme=${grafanaTheme}`}
                width="100%"
                height="450"
                frameBorder="0"
                title="Grafana - Suhu Udara"
                sandbox="allow-scripts allow-same-origin"
                style={{ minHeight: "200px" }}
              />
            </div>
          </div>

          {/* Kelembapan Udara */}
          <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
           
            <div className="flex items-center justify-center w-full overflow-hidden">
              <iframe
                key={`grafana-2-${grafanaTheme}`}
                src={`http://103.93.160.128:3000/d-solo/adnw6vb/smart-agriculture-capstone?orgId=1&from=1777437542980&to=1777439342980&timezone=browser&refresh=10s&panelId=panel-2&theme=${grafanaTheme}`}
                width="100%"
                height="450"
                frameBorder="0"
                title="Grafana - Kelembapan Udara"
                sandbox="allow-scripts allow-same-origin"
                style={{ minHeight: "200px" }}
              />
            </div>
          </div>

          {/* Intensitas Cahaya */}
          <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
           
            <div className="flex items-center justify-center w-full overflow-hidden">
              <iframe
                key={`grafana-3-${grafanaTheme}`}
                src={`http://103.93.160.128:3000/d-solo/adnw6vb/smart-agriculture-capstone?orgId=1&from=1777437565014&to=1777439365014&timezone=browser&refresh=10s&panelId=panel-3&theme=${grafanaTheme}`}
                width="100%"
                height="450"
                frameBorder="0"
                title="Grafana - Intensitas Cahaya"
                sandbox="allow-scripts allow-same-origin"
                style={{ minHeight: "200px" }}
              />
            </div>
          </div>

          {/* Kelembapan Tanah */}
          <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-full overflow-hidden">
              <iframe
                key={`grafana-4-${grafanaTheme}`}
                src={`http://103.93.160.128:3000/d-solo/adnw6vb/smart-agriculture-capstone?orgId=1&from=1777437586353&to=1777439386353&timezone=browser&refresh=10s&panelId=panel-4&theme=${grafanaTheme}`}
                width="100%"
                height="450"
                frameBorder="0"
                title="Grafana - Kelembapan Tanah"
                sandbox="allow-scripts allow-same-origin"
                style={{ minHeight: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
