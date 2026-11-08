<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Peep's image buttons use the shared Button component with the supplied artwork to preserve accessible actions.
- All images and audio live as real files in public/assets/ and are referenced by /assets/... paths, so the site deploys independently of Lovable's asset CDN.
- Wooden interaction audio is synthesized client-side after a user gesture because browsers restrict autoplay.
- Peep media policy and team profile data live in a pure shared module; illustrated modals and the team book are focused components so artwork and links stay independently editable.
- Menu music uses a single gesture-unlocked browser player with modal and page-visibility pause rules; uploaded audio and card artwork are compressed to MP3/WebP and stored in public/assets to reduce transfer size.
- Localized copy and per-language SEO head (canonical, hreflang, JSON-LD) live in src/lib/i18n.ts; each language route renders the shared PeepHome so the design stays identical across languages.
