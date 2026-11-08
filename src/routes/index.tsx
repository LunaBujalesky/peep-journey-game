import { createFileRoute } from "@tanstack/react-router";
const bosque = { url: "/assets/bosque.png" };
import { localeHead } from "@/lib/i18n";
import { PeepHome } from "@/components/peep/peep-home";

export const Route = createFileRoute("/")({
  head: () => localeHead("es", bosque.url),
  component: () => <PeepHome locale="es" />,
});
