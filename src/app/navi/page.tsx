import type { Metadata } from "next";
import { NaviExperience } from "@/components/navi/NaviExperience";

export const metadata: Metadata = {
  title: "自分に関係する備えを見てみる",
  description:
    "クルマ・スマホ・住まいから自分に合う例えを選び、最近の暮らしの変化に合わせて“暮らしの備え”を眺めてみる体験デモです。",
};

export default function NaviPage() {
  return <NaviExperience />;
}
