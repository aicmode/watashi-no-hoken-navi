import type { Metadata } from "next";
import { NaviExperience } from "@/components/navi/NaviExperience";

export const metadata: Metadata = {
  title: "自分に必要な備えを見てみる",
  description:
    "最近の暮らしの変化から、クルマの安全装備に例えて“暮らしの備え”を眺めてみる体験デモです。",
};

export default function NaviPage() {
  return <NaviExperience />;
}
