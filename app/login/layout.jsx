import "@/app/globals.css";

export const metadata = {
  title: "آلمین مدیا",
  description: "طلاقی هنر و تکنولوژی",
};

export default function RootLayout({ children }) {
  return (
    <body dir="rtl" lang="fa">
      <main className="bg-fuchsia-950 text-white">
        {children}
      </main>
    </body>
  );
}
