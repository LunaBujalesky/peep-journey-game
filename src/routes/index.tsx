import { createFileRoute } from "@tanstack/react-router";
import bosque from "@/assets/bosque.png.asset.json";
import rosa from "@/assets/luz-rosa.png.asset.json";
import polvo from "@/assets/polvo.png.asset.json";
import arboles from "@/assets/arboles.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Peep — El videojuego" },
      { name: "description", content: "Adentrate en el bosque de Peep, una aventura mágica entre árboles gigantes y luz rosa." },
      { property: "og:title", content: "Peep — El videojuego" },
      { property: "og:description", content: "Adentrate en el bosque de Peep, una aventura mágica entre árboles gigantes y luz rosa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const motes = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  top: 20 + ((i * 53) % 75),
  size: 3 + (i % 5) * 2,
  delay: (i % 7) * 0.6,
  dur: 6 + (i % 5) * 1.5,
}));

function Index() {
  return (
    <main className="scene">
      <img src={bosque.url} alt="" className="layer layer-forest" />
      <img src={rosa.url} alt="" className="layer layer-pink" />
      <div className="layer layer-particles">
        <img src={polvo.url} alt="" className="layer dust" />
        {motes.map((m, i) => (
          <span
            key={i}
            className="mote"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              animationDelay: `${m.delay}s`,
              animationDuration: `${m.dur}s`,
            }}
          />
        ))}
      </div>
      <img src={arboles.url} alt="" className="layer layer-trees" />

      <div className="hero">
        <h1 className="logo">Peep</h1>
        <nav className="menu">
          <a href="#" className="game-btn game-btn-primary">Jugar</a>
          <a href="#" className="game-btn">Tráiler</a>
          <a href="#" className="game-btn">Comunidad</a>
        </nav>
      </div>
    </main>
  );
}
