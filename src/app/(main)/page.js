import Featured from "@/components/home/Featured";
import HeroBanner from "@/components/home/HeroBanner";
import TopCategories from "@/components/home/TopCategories";

export default function Home() {
  return (
    <div className="text-slate-900">
      <HeroBanner />
      <Featured />
      <TopCategories />
    </div>
  );
}
