import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Building, FileText, Heart, Home, Menu, Settings, X } from "lucide-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false); // Track the sidebar collapse state

  const navLinks =
    userType === "manager"
      ? [
          { icon: Building, label: "Properties", href: "/managers/properties" },
          {
            icon: FileText,
            label: "Applications",
            href: "/managers/applications",
          },
          { icon: Settings, label: "Settings", href: "/managers/settings" },
        ]
      : [
          { icon: Heart, label: "Favorites", href: "/tenants/favorites" },
          {
            icon: FileText,
            label: "Applications",
            href: "/tenants/applications",
          },
          { icon: Home, label: "Residences", href: "/tenants/residences" },
          { icon: Settings, label: "Settings", href: "/tenants/settings" },
        ];

  // Toggle collapse state on icon click
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 bg-white shadow-lg"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        marginRight: "50px", // Gap between sidebar and content
        width: isCollapsed ? "80px" : "250px", // Toggle width when collapsed
        transition: "width 0.3s ease", // Smooth transition for collapse
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex min-h-[56px] w-full items-center pt-3 mb-3",
                isCollapsed ? "justify-center" : "justify-between px-6"
              )}
            >
              {isCollapsed ? (
                <button
                  className="hover:bg-gray-100 p-2 rounded-md"
                  onClick={toggleSidebar}
                >
                  <Menu className="h-6 w-6 text-gray-600" />
                </button>
              ) : (
                <>
                  <h1 className="text-xl font-bold text-gray-800">ESTATE EDGE</h1>
                  <button
                    className="hover:bg-gray-100 p-2 rounded-md"
                    onClick={toggleSidebar}
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center px-7 py-7",
                    isActive ? "bg-gray-100" : "text-gray-600 hover:bg-gray-100",
                    isCollapsed ? "justify-center" : "ml-[5px]"
                  )}
                >
                  <Link href={link.href} className="w-full" scroll={false}>
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={`h-5 w-5 ${
                          isActive ? "text-blue-600" : "text-gray-600"
                        }`}
                      />
                      {!isCollapsed && (
                        <span
                          className={`font-medium ${
                            isActive ? "text-blue-600" : "text-gray-600"
                          }`}
                        >
                          {link.label}
                        </span>
                      )}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
