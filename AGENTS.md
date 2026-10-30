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

- Peep's image buttons use the shared Button component and CDN asset pointers to preserve supplied artwork and accessible actions.
- Wooden interaction audio is synthesized client-side after a user gesture because browsers restrict autoplay.
- Peep media policy and team profile data live in a pure shared module; illustrated modals and the team book are focused components so artwork and links stay independently editable.
- Menu music uses a single gesture-unlocked browser player with modal and page-visibility pause rules; uploaded audio and card artwork are compressed to MP3/WebP and stored as CDN pointers to reduce transfer size.
