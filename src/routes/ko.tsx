import { createFileRoute } from "@tanstack/react-router";
import bosque from "@/assets/bosque.png.asset.json";
import { localeHead } from "@/lib/i18n";
import { PeepHome } from "@/components/peep/peep-home";

export const Route = createFileRoute("/ko")({
  head: () => localeHead("ko", bosque.url),
  component: () => <PeepHome locale="ko" />,
});
