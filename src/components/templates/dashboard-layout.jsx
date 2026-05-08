import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import { LayoutDashboard, ChartNoAxesCombined, Users, LogOut } from "lucide-react"
import { ThemeToggle } from "../ui/theme-toggle"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card"

import { Button } from "../ui/button"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "../ui/sidebar"

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Lakukan pembersihan sesi di sini jika perlu
    navigate("/")
  }

  const items = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Logs", url: "/dashboard/logs", icon: ChartNoAxesCombined },
  ]

  const settings = [
    { title: "Users", url: "/dashboard/users", icon: Users },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col items-center gap-1.5">
          <img src="/images/LOGO.png" alt="dashboard_logo" className="w-full h-28 aspect-square object-contain" />
          <span className="text-sm font-bold">Smart Farm Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Setting</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settings.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <SidebarMenuButton className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </AlertDialogTrigger>
          <AlertDialogContent className="p-0 border-none bg-transparent shadow-none w-full max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Konfirmasi Logout</CardTitle>
              </CardHeader>
              <CardContent>
                Apakah Anda yakin ingin keluar dari halaman admin? Sesi Anda akan diakhiri.
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <AlertDialogCancel asChild>
                  <Button variant="outline">Batal</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                    Keluar
                  </Button>
                </AlertDialogAction>
              </CardFooter>
            </Card>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  )
}

export function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 flex flex-col relative w-full overflow-hidden">
        <header className="flex h-14 lg:h-[60px] items-center justify-between border-b bg-background px-6">
          <SidebarTrigger />
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </SidebarProvider>
  )
}
