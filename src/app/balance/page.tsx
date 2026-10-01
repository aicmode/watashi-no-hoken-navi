import type { Metadata } from "next";
import { BalanceExperience } from "@/components/balance/BalanceExperience";

export const metadata: Metadata = {
  title: "わたしのお金バランス",
  description:
    "もしもに備える「守るお金」と、将来に向けた「育てるお金」。7つの質問に答えるだけで、いま何から考えるとよさそうかを一緒に整理できる体験デモです。",
};

export default function BalancePage() {
  return <BalanceExperience />;
}
