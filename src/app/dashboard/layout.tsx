import SideNav from "../ui/navigation/sidenav";
import styles from "@/app/styles/pos.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <div className={styles.sidenavContainer}>
        <SideNav />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}