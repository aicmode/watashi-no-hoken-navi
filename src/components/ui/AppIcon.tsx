import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Baby,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CarFront,
  Check,
  ChevronDown,
  CircleHelp,
  Clock,
  Cloud,
  Compass,
  FileText,
  Flag,
  Flame,
  Gem,
  Heart,
  HeartHandshake,
  HeartPulse,
  House,
  KeyRound,
  Landmark,
  Layers3,
  LockKeyhole,
  Mail,
  MessageCircle,
  Navigation,
  PiggyBank,
  Plus,
  PhoneCall,
  RefreshCw,
  RotateCcw,
  Route,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sprout,
  Stethoscope,
  SunMedium,
  Umbrella,
  UserRound,
  UsersRound,
  WalletCards,
  Waypoints,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * アイコン名の一覧。
 * ここは「素材」のカタログで、見た目の組み立て（面・装飾・バッジ）は
 * IconScene と visuals.ts が担当する。
 */
export type AppIconName =
  | "activity"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "baby"
  | "badge-check"
  | "briefcase"
  | "building"
  | "calendar"
  | "car"
  | "check"
  | "chevron-down"
  | "clock"
  | "cloud"
  | "compass"
  | "document"
  | "family"
  | "flag"
  | "flame"
  | "gem"
  | "health"
  | "heart"
  | "help"
  | "home"
  | "key"
  | "landmark"
  | "layers"
  | "lock"
  | "mail"
  | "message"
  | "navigation"
  | "piggy-bank"
  | "phone"
  | "plus"
  | "refresh"
  | "restart"
  | "route"
  | "shield-alert"
  | "shield-check"
  | "smartphone"
  | "sparkles"
  | "sprout"
  | "stethoscope"
  | "sun"
  | "umbrella"
  | "user"
  | "users"
  | "wallet"
  | "waypoints"
  | "wrench"
  | "x";

export const APP_ICONS: Record<AppIconName, LucideIcon> = {
  activity: Activity,
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  baby: Baby,
  "badge-check": BadgeCheck,
  briefcase: BriefcaseBusiness,
  building: Building2,
  calendar: CalendarClock,
  car: CarFront,
  check: Check,
  "chevron-down": ChevronDown,
  clock: Clock,
  cloud: Cloud,
  compass: Compass,
  document: FileText,
  family: HeartHandshake,
  flag: Flag,
  flame: Flame,
  gem: Gem,
  health: HeartPulse,
  heart: Heart,
  help: CircleHelp,
  home: House,
  key: KeyRound,
  landmark: Landmark,
  layers: Layers3,
  lock: LockKeyhole,
  mail: Mail,
  message: MessageCircle,
  navigation: Navigation,
  "piggy-bank": PiggyBank,
  phone: PhoneCall,
  plus: Plus,
  refresh: RefreshCw,
  restart: RotateCcw,
  route: Route,
  "shield-alert": ShieldAlert,
  "shield-check": ShieldCheck,
  smartphone: Smartphone,
  sparkles: Sparkles,
  sprout: Sprout,
  stethoscope: Stethoscope,
  sun: SunMedium,
  umbrella: Umbrella,
  user: UserRound,
  users: UsersRound,
  wallet: WalletCards,
  waypoints: Waypoints,
  wrench: Wrench,
  x: X,
};

/**
 * ページ内で線の太さがバラつかないように、既定値をここに集約する。
 * 大きいアイコンだけ視覚補正で少し細くする（IconScene 側で調整）。
 */
export const STROKE = {
  /** 本文中・小さなインラインアイコン */
  inline: 2,
  /** 標準 */
  base: 1.95,
  /** 大型アイコンの視覚補正 */
  large: 1.8,
} as const;

export function AppIcon({
  name,
  size = 20,
  className = "",
  strokeWidth = STROKE.base,
}: {
  name: AppIconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = APP_ICONS[name];
  return (
    <Icon
      aria-hidden="true"
      className={className}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
}
