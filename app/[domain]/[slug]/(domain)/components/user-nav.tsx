"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
  Globe,
  Layout,
  LayoutDashboard,
  // Megaphone,
  Menu,
  Newspaper,
  Settings,
  Home,
  XIcon,
  MoveLeft,
  HomeIcon,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
  useRouter,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { getSiteFromMenuId } from "@/lib/actions";
import Image from "next/image";


const externalLinks = [
  // {
  //   name: "Read announcement",
  //   href: "https://vercel.com/blog/platforms-starter-kit",
  //   icon: <Megaphone width={18} />,
  // },
  // {
  //   name: "Star on GitHub",
  //   href: "https://github.com/vercel/platforms",
  //   icon: <Github width={18} />,
  // },
  {
    name: "Home page",
    href: "https://kpaly.com",
    icon: <Home width={18} />,
  },
  {
    name: "View demo site",
    href: "https://ueats.kpaly.com",
    icon: <Layout width={18} />,
  },
  // {
  //   name: "Deploy your own",
  //   href: "https://vercel.com/templates/next.js/platforms-starter-kit",
  //   icon: (
  //     <svg
  //       width={18}
  //       viewBox="0 0 76 76"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="py-1 text-black dark:text-white"
  //     >
  //       <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
  //     </svg>
  //   ),
  // },
];

export default function UserNav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };
  const url = usePathname();

  const [userId, setUserId] = useState<string | null>();
  const [siteId, setSiteId] = useState<string | null>();
  const [logo, setLogo] = useState<string | null>();

  const router = useRouter();
  
  useEffect(() => {
    if (segments[0] === id) {
      getSiteFromMenuId(id).then((id) => {
        setSiteId(id);
      });
    }
    }, [segments, id]);

  // useEffect(() => {
  //   getSiteFromUrl(url).then((res) => {
  //   console.log('Hit this ', {res});
  //       if(res) {
  //           setUserId(res.siteUser.id);
  //           setLogo(res.logo)
  //       }
  //   })
  // }, [url]);

  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      return [
        {
          name: "Back to All Menus",
          href: "/",
          icon: <ArrowLeft width={18} />,
        },
        // {
        //   name: "Menus",
        //   href: `/`,
        //   isActive: segments.length === 2,
        //   icon: <HomeIcon width={18} />,
        // },
        {
          name: "Reservation",
          href: `/site/${id}/reservation`,
          isActive: segments.includes("reservation"),
          icon: <Newspaper width={18} />,
        },
        // {
        //   name: "Settings",
        //   href: `/site/${id}/settings`,
        //   isActive: segments.includes("settings"),
        //   icon: <Settings width={18} />,
        // },
      ];
    } 
    // else if(segments[0] === "menuitem" && id) {
    //   return [
    //     {
    //       name: "Back to menu items",
    //       href: "",
    //       icon: <ArrowLeft width={18} />,
    //     },
    //   ]
    // }
    // else if (segments[0] === "menu" && id) {
    //   return [
    //     {
    //       name: "Back to All Menus",
    //       href: siteId ? `/site/${siteId}` : "/sites",
    //       icon: <ArrowLeft width={18} />,
    //     },
    //     {
    //       name: "Edit Menu",
    //       href: `/menu/${id}`,
    //       isActive: segments.length === 2,
    //       icon: <Edit3 width={18} />,
    //     },
    //     {
    //       name: "Add Menu Items",
    //       href: `/menu/${id}/items`,
    //       isActive: segments.includes("items"),
    //       icon: <Menu width={18} />,
    //     },
    //     // {
    //     //   name: "Settings",
    //     //   href: `/menu/${id}/settings`,
    //     //   isActive: segments.includes("settings"),
    //     //   icon: <Settings width={18} />,
    //     // },
    //   ];
    // }
    return [
    //   {
    //     name: "Overview",
    //     href: "/",
    //     isActive: segments.length === 0,
    //     icon: <LayoutDashboard width={18} />,
    //   },
      {
        name: "Menus",
        href: "/",
        isActive: segments[0] === "sites",
        icon: <Globe width={18} />,
      },
    //   {
    //     name: "Settings",
    //     href: "/settings",
    //     isActive: segments[0] === "settings",
    //     icon: <Settings width={18} />,
    //   },
    ];
  }, [segments, id]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <div className="flex flex-row justify-between">
        {
          segments[0] === "menuitem" && id ? 
          <button
            onClick={() => router.back()}
            className="fixed z-10 top-7 left-2 dark:text-white text-black"
          >
            <MoveLeft width={50} />
          </button>
          :
          segments.length >= 1 &&
          <Link href={tabs[0].href} key={tabs[0].name}>
            <span className="fixed z-10 top-7 left-2 dark:text-white text-black"> <MoveLeft width={50} /> </span>
          </Link>
        }
        <button
          className={`fixed z-20 dark:text-white text-black dark:bg-zinc-700 rounded-full w-8 h-8 justify-center items-center flex right-5 top-7 sm:hidden`
            // ${
            //   // left align for Editor, right align for other pages
            //   (segments[0] === "sites" || segments[0] === "site" || segments[0] === "menu" || segments[0] === "menuitem" && !showSidebar) && segments.length >= 2 && !showSidebar
            //     ? "left-5 top-5"
            //     : "right-5 top-7"
            //   }
          }
          onClick={() => setShowSidebar(!showSidebar)}
        >
        { showSidebar ? <XIcon width={20} /> : <Menu width={20} />}
        </button>
      </div>
      <div
        className={`transform ${
          showSidebar ? "w-[70%] translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all sm:w-60 sm:translate-x-0 dark:border-stone-700 dark:bg-stone-900`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            
              <Link
                href="/"
                className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
              >
                <Image
                  src={logo ?? "/logo.png"}
                  width={24}
                  height={24}
                  alt="Logo"
                  className="dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
                />
              </Link>
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }, index) => (
              segments[0] === "menuitem" && id ? 
              <button
                key={index}
                onClick={() => router.back()}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                  } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`
                }
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </button>
              :
              <Link
                key={index}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
