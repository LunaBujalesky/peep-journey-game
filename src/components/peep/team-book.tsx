import { Button } from "@/components/ui/button";
import book from "@/assets/team-book.webp.asset.json";
import diego from "@/assets/team-diego-clean.webp.asset.json";
import clara from "@/assets/team-clara-clean.webp.asset.json";
import luna from "@/assets/team-luna-clean.webp.asset.json";
import silvi from "@/assets/team-silvi-clean.webp.asset.json";
import aye from "@/assets/team-aye-clean.webp.asset.json";
import { teamProfiles } from "@/lib/peep-media";
import { playPlasticSound } from "@/lib/wood-sound";

const cards = { diego, clara, luna, silvi, aye };

export function TeamBook() {
  return <div className="team-book">
    <img className="book-background" src={book.url} alt="Libro de Dead Time Games" width={1717} height={1069} />
    {teamProfiles.map(member => <Button key={member.id} asChild variant="ghost" className={`asset-button team-card team-card-${member.id}`} onPointerEnter={playPlasticSound} onFocus={playPlasticSound}>
      <a href={member.href} target="_blank" rel="noopener noreferrer" aria-label={`Perfil de ${member.name}`}>
        <img src={cards[member.id].url} alt={`${member.name} — Dead Time Games`} draggable={false} />
      </a>
    </Button>)}
  </div>;
}