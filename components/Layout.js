import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { GoHome } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";
import { BiAddToQueue } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";
import styles from "../styles/dashboard.module.css"
const Layout = ({ children }) => {
  return (
    <>
    <div class={styles.wrapper}>
        <div class={styles.sidebar}>
          <div className="logo md:mx-8 mr-auto my-4 ">
            <Link href={"/"}>
              <Image
                src="/logo.png"
                alt="logo"
                width={150}
                height={40}
                layout="fixed"
              />
            </Link>
          </div>
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarListItem}>
              <Link href="/admin" className={styles.sidebarLink}>
                <span class="item flex"> <GoHome className="mx-2 my-1"/>My Dashboard</span>
              </Link>
            </li>
            <li className={styles.sidebarListItem}>
              <Link href="/admin/add" className={styles.sidebarLink}>
                <span class="item flex"><BiAddToQueue className="mx-2 my-1"/>Add product</span>
              </Link>
            </li>
                     <li  className={styles.sidebarListItem}>
              <Link href="/admin/allproducts" className={styles.sidebarLink}>
                <span class="item flex"><CiViewTable className="mx-2 my-1"/>View products</span>
              </Link>
            </li>
            <li  className={styles.sidebarListItem}>
              <Link href="/admin/allorders" className={styles.sidebarLink}>
                <span class="item flex"><CiStar className="mx-2 my-1" />Orders</span>
              </Link>
            </li>
          </ul>
          <main className={styles.mainContent}>
          {children}
        </main>
        </div>
      </div></>
  )
}

export default Layout