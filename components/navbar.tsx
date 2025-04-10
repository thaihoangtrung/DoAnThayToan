"use client"
import { useEffect, useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    Menu,
    ShoppingCart,
    UserIcon,
    UserCircle,
    LogOut
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useUserStore } from "@/lib/store/useUserStore";
import { useCartStore } from "@/lib/store/useCartStore";

const NavBarPage = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isHover, setIsHover] = useState<number | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const handleHover = (menuLabel: string | null) => {
        setOpenMenu(prev => (prev === menuLabel ? null : menuLabel));
    };
    const { user, clearUser } = useUserStore()
    const cartItemCount = useCartStore((state) => state.getTotalUniqueItems())
    const handleLogout = () => {
        clearUser()
    }
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <>
            <header className="flex items-center justify-between p-6 bg-black sticky top-0 z-40">
                <Link href="/">
                    <h1 className="text-3xl text-white">Đồ Án Thầy Tùng</h1>
                </Link>
                <ul className="relative items-center space-x-0 hidden md:flex">
                    {NAV_ITEMS.map((navItem) => (
                        <li
                            key={navItem.label}
                            className="relative"
                            onMouseEnter={() => handleHover(navItem.label)}
                            onMouseLeave={() => handleHover(null)}
                        >
                            <Link href={navItem.link ?? "/"}>
                                <button
                                    className="text-sm py-1.5 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-white relative"
                                    onMouseEnter={() => setIsHover(navItem.id)}
                                    onMouseLeave={() => setIsHover(null)}
                                >
                                    <span>{navItem.label}</span>
                                    {navItem.subMenus && (
                                        <ChevronDown
                                            className={`h-4 w-4 group-hover:rotate-180 duration-300 transition-transform
                                        ${openMenu === navItem.label ? "rotate-180" : ""}
                                        `}
                                        />
                                    )}
                                    {(isHover === navItem.id || openMenu === navItem.label) && (
                                        <motion.div
                                            layoutId="hover-bg"
                                            className="absolute inset-0 size-full bg-white/10"
                                            style={{
                                                borderRadius: 99,
                                            }}
                                        />
                                    )}
                                </button>
                            </Link>
                            <AnimatePresence>
                                {openMenu === navItem.label && navItem.subMenus && (
                                    <div className="w-auto absolute left-0 top-full pt-2">
                                        <motion.div
                                            className="bg-[#0A0A0A] border border-white/10 p-4 w-max"
                                            style={{
                                                borderRadius: 16,
                                            }}
                                            layoutId="menu"
                                        >
                                            <div className="w-fit shrink-0 flex space-x-9 overflow-hidden">
                                                {navItem.subMenus.map((sub) => (
                                                    <motion.div layout className="w-40 " key={sub.title}>
                                                        <h3 className="mb-4 text-sm font-medium capitalize text-white/50">
                                                            {sub.title}
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {sub.items.map((item) => {
                                                                return (
                                                                    <li key={item.label}>
                                                                        <Link
                                                                            href={item.link}
                                                                            className="flex items-start space-x-3 text-white hover:bg-white hover:text-black p-2 rounded-lg"
                                                                        >
                                                                            <div className="leading-5 w-max">
                                                                                <p className="text-sm font-medium shrink-0">
                                                                                    {item.label}
                                                                                </p>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/cart">
                        <ShoppingCart size={20} className="text-white relative" />
                    </Link>
                    {user ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative hover:bg-black hover:text-white focus:bg-black focus:text-white">
                                    <UserIcon size={20} className="text-white" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 bg-black text-white border p-0 mr-4">
                                <div className="grid gap-2 p-2">
                                    <div className="font-medium text-center py-2 border-b">{user.username}</div>
                                    <Link href={'/personal-info'}>
                                        <Button variant="ghost" className="w-full justify-start hover:bg-white hover:text-black">
                                            <UserCircle className="mr-2 h-4 w-4" />
                                            Thông tin cá nhân
                                        </Button>
                                    </Link>
                                    <Link href={'/change-password'}>
                                        <Button variant="ghost" className="w-full justify-start hover:bg-white hover:text-black">
                                            <UserIcon className="mr-2 h-4 w-4" />
                                            Thay đổi mật khẩu
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" className="w-full justify-start hover:bg-white hover:text-black" onClick={() => handleLogout()}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Thoát
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Link href="/signin" >
                            <span className="text-white">Đăng nhập</span>
                        </Link>
                    )}
                </div>

                <div className="md:hidden">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white" aria-label="Open Menu">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full bg-[#0A0A0A]">
                            <nav className="flex flex-col space-y-1">
                                <div>
                                    {user ? (
                                        <p className="block py-1 px-1 text-sm font-medium capitalize text-white">Hello, <span className="uppercase ">{user.email}</span></p>
                                    ) : (
                                        <Link href="/signin" className="block py-1.5 px-1 text-sm font-medium capitalize text-white" onClick={() => setIsSheetOpen(!isSheetOpen)}>
                                            Đăng nhập
                                        </Link>
                                    )}
                                </div>
                                {NAV_ITEMS.map((navItem) => (
                                    <div key={navItem.label} className="py-1">
                                        <button
                                            className="text-sm py-2 pr-4 pl-1 flex w-full cursor-pointer group transition-colors duration-300 items-center justify-between text-white"
                                            onClick={() => handleHover(navItem.label)}
                                        >
                                            <Link href={navItem.link ?? "/"} onClick={() => setIsSheetOpen(!isSheetOpen)}>
                                                <span>{navItem.label}</span>
                                            </Link>
                                            {navItem.subMenus && (
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform duration-300 ${openMenu === navItem.label ? "rotate-180" : ""
                                                        }`}
                                                />
                                            )}
                                        </button>
                                        {openMenu === navItem.label && navItem.subMenus && (
                                            <div className="pl-1 mt-2">
                                                {navItem.subMenus.map((sub) => (
                                                    <div key={sub.title} className="mb-4">
                                                        <h3 className="mb-2 text-sm font-medium capitalize text-white/50">{sub.title}</h3>
                                                        <ul className="space-y-2">
                                                            {sub.items.map((item) => {

                                                                return (
                                                                    <li key={item.label}>
                                                                        <Link
                                                                            href={item.link} className="flex items-start space-x-3 group py-2" onClick={() => setIsSheetOpen(!isSheetOpen)}>
                                                                            <div className="leading-5">
                                                                                <p className="text-sm font-medium text-white">{item.label}</p>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div>
                                    <Button
                                        variant="ghost"
                                        className="block items-center py-1 px-1 text-sm text-white"
                                        onClick={() => handleLogout()}
                                    >
                                        Đăng xuất
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
        </>
    );
};

export default NavBarPage;
type Props = {
    id: number;
    label: string;
    subMenus?: {
        title: string;
        link?: string;
        items: {
            label: string;
            description: string;
            link: string;
        }[];
    }[];
    link?: string;
};
export const NAV_ITEMS: Props[] = [
    {
        id: 1,
        label: "Sản Phẩm",
        link: "/products",
    },
    {
        id: 6,
        label: "Tin Tức",
        link: "/blog",
    },
    {
        id: 7,
        label: "Liên Hệ",
        link: "/contact",
    },
];