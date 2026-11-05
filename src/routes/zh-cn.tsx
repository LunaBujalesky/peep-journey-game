import { createFileRoute } from "@tanstack/react-router";
import bosque from "@/assets/bosque.png.asset.json";
import { localeHead } from "@/lib/i18n";
import { PeepHome } from "./index";

export const Route = createFileRoute("/zh-cn")({
  head: () => localeHead("zh-Hans", bosque.url),
  component: () => <PeepHome locale="zh-Hans" />,
});
