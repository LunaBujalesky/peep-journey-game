import { Button } from "@/components/ui/button";
const book = { url: "/assets/team-book.webp" };
const diego = { url: "/assets/team-diego-clean.webp" };
const clara = { url: "/assets/team-clara-clean.webp" };
const luna = { url: "/assets/team-luna-clean.webp" };
const silvi = { url: "/assets/team-silvi-clean.webp" };
const aye = { url: "/assets/team-aye-clean.webp" };
import { teamProfiles } from "@/lib/peep-media";
import { playPlasticSound } from "@/lib/wood-sound";

const cards = { diego, clara, luna, silvi, aye };

export function TeamBook({ profileLabel }: { profileLabel: string }) {
  return <div className="team-book">
    <img className="book-background" src={book.url} alt="Libro de Dead Time Games" width={1717} height={1069} />
    {teamProfiles.map(member => <Button key={member.id} asChild variant="ghost" className={`asset-button team-card team-card-${member.id}`} onPointerEnter={playPlasticSound} onFocus={playPlasticSound}>
      <a href={member.href} target="_blank" rel="noopener noreferrer" aria-label={`${profileLabel} ${member.name}`}>
        <img src={cards[member.id].url} alt={`${member.name} — Dead Time Games`} draggable={false} />
      </a>
    </Button>)}
  </div>;
}