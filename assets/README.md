# Garden assets

The approved Fernhollow-inspired direction uses a dark floral valley with an open center for the profile text.

| Runtime file | Dimensions | Size |
| --- | --- | --- |
| `garden-desktop.webp` | 1586 × 992 | 238,448 bytes |
| `garden-mobile.webp` | 887 × 1774 | 169,664 bytes |

Both backgrounds were created with the built-in `image_gen` tool from the approved design previews, then encoded as WebP with Sharp. They contain no baked-in UI or text. The real page renders all headings, links and controls as accessible HTML.

`valley/` contains the flower sprite renderer, camera path, textures and ambient MP3 extracted from the supplied `index (3).html`. `garden.js` increases flower coverage and lets visitors travel continuously along the camera path. The images above serve as fallbacks while the scene loads and when WebGL is unavailable. The footer controls pause motion and play the ambient track independently.

Barlow Condensed is served locally from `fonts/`; its SIL Open Font License is included in `fonts/OFL-Barlow-Condensed.txt`.


## Personal portrait avatar

Created from the user's supplied portrait with the built-in `image_gen` tool. Hair was changed to natural black and the portrait was adapted as an illustrated head-and-shoulders avatar. The PNG preserves transparency; the website supplies a dark circular background in CSS.

- `avatar.png`: original generated transparent PNG for reuse.
- `avatar.webp`: optimized 256 × 256 website avatar.
- `avatar-icon.png`: 64 × 64 browser tab icon.

### Portrait prompt

Use case: identity-preserve, portrait avatar / logo.
Input images: the large phone Photos screenshot containing the same man's portrait twice is the IDENTITY REFERENCE AND EDIT TARGET. The small website-header screenshot with a cat is CONTEXT ONLY, showing the small circular avatar slot to replace. Do not draw the cat.
Primary request: turn the man in the provided photo into a clean, recognizable illustrated personal avatar, changing his hair color from light brown/blond to NATURAL BLACK. Preserve the haircut's swept side-parted volume and preserve the recognizable facial proportions, eyebrows, eyes, nose, mouth and jawline from his photo.
Output: ONE person only, head and upper shoulders, centered in ONE square avatar asset. A refined semi-flat portrait illustration suitable for a personal logo, with confident smooth contours, restrained dimensional shading, natural warm skin tones, clearly defined facial features, and a plain ivory-white crew-neck shirt matching the source. Make the hair unequivocally black with subtle charcoal highlights, not brown. Keep the expression natural and friendly, faithfully based on the photo. No exaggerated caricature or anime eyes.
Composition: frontal / slight three-quarter face like the source, face and hair large enough to read in a 36–44px circular website avatar. Keep the whole hairstyle inside a safe central circle with about 8% breathing room at the top and sides. Clean silhouette; no arms or hands, no duplicate portrait. A fine understated warm ivory edge along the dark hair/shoulder silhouette can help visibility on the website's near-black garden background.
Background: genuinely transparent outside the head-and-shoulders portrait, with clean anti-aliased alpha edges. No solid square background, no fake checkerboard, no halo or glow, no decorative badge.
Remove all screenshot content: phone UI, timestamps, gallery controls, duplicated image panel, interior room, curtains, wall, and shirt lettering. No text, no initials, no watermark. Produce a finished, polished avatar asset, not a mockup or a website screenshot.

### Edge cleanup prompt

Use case: precise-object-edit, avatar alpha-edge cleanup.
Edit the supplied black-haired illustrated portrait avatar. Preserve the man's face, facial identity, expression, natural black hair, hairstyle, ivory-white crew-neck shirt, lighting, pose, scale, and composition exactly.
Change only the messy outer silhouette and stray pixels: remove every white, gray, yellow or colored speck, detached fragment, fuzzy patch and ragged remnant OUTSIDE the head-and-shoulders portrait, especially beside the neck, around the shoulders and below the shirt. Finish the shoulders and bottom of the bust as one intentional smooth curved silhouette. The result should be a polished personal avatar / logo with clean confident illustration contours and a professional transparent cutout. Use a neat hair contour with no stray background debris. Do not add an outer white stroke, halo, circle, badge or background.
The background must remain genuinely transparent with clean anti-aliased alpha edges, not a black rectangle and not a checkerboard. ONE square avatar, ONE person. No typography, monograms, duplicate images, logos, icons or watermark.

### White-hair avatar variant

Created using the built-in `image_gen` tool by changing only the hair color of the existing portrait avatar. Saved as an alternative variant.

- `avatar-white.png`: full-size transparent PNG.
- `avatar-white.webp`: 256 × 256 website avatar.
- `avatar-white-icon.png`: 64 × 64 tab icon.

Prompt:

Use case: precise-object-edit, hair color variant of an existing personal avatar.
Change ONLY the scalp hair color of the supplied avatar from black to PLATINUM WHITE / SOFT SILVER-WHITE. The user wants to try the original light-haired look instead of black. Make the hair clearly light white, with delicate cool ash-gray shading defining the individual strands and natural volume. Avoid yellow blond, brown, dark roots, or a flat featureless white shape. Keep the exact same swept side-parted haircut, hairline, strand shapes and silhouette.
Preserve the man's facial identity and face pixels as closely as possible: same eyebrows (keep them dark), eyes, skin, nose, lips, expression, ears, jawline and neck. Keep the same ivory-white crew-neck shirt, illustration style, pose, crop, framing and square dimensions. Do not age the face. Do not add or remove facial hair. Do not change the face or clothing colors.
Preserve the genuinely transparent background and existing alpha silhouette. No added outline, badge, background, typography, initials, watermarks, extra objects or duplicate portraits. Output one finished transparent portrait avatar with WHITE hair.


### Reference-matched beige hair avatar

The current website avatar matches the user's original photo: muted ash-beige light brown hair. Created with the built-in `image_gen` tool using the supplied photo as a color reference.

- `avatar-beige.png`: full-size transparent PNG.
- `avatar-beige.webp`: 256 × 256 website avatar.
- `avatar-beige-icon.png`: 64 × 64 browser tab icon.

Prompt:

Use case: precise-object-edit, reference-matched hair recoloring.
There are TWO input images: the smaller side-by-side photo of a man with LIGHT BEIGE-BROWN hair is the HAIR COLOR REFERENCE; the large transparent illustrated avatar with bright white hair is the EDIT TARGET.
The user's correction is explicit: match the light beige-brown hair color in the small original photo, NOT the pure white hair of the previous avatar.
Change ONLY the scalp hair color in the large avatar to the reference's muted warm ASH-BEIGE LIGHT BROWN / MILK-TEA BLOND. It has a soft taupe/light brown base, subdued beige-blond highlights, and darker ash-brown shadows. The overall value is clearly darker than white or silver. Match the photographed hair's warmth and brightness faithfully, rather than neutralizing it to gray. Avoid platinum white, snowy white, silver, bleached yellow, orange, dark brown or black hair.
Keep the exact avatar haircut, side-swept strands, volume, hairline and silhouette. Preserve the face and facial identity, eyebrows (keep their original dark color), eyes, nose, lips, skin color, expression, ears, neck, white shirt, pose, crop and illustration style. Do not change the person's age or expression.
Output ONLY one square portrait avatar, same composition as the edit target. Preserve the genuinely transparent background with anti-aliased edges. The small side-by-side photo is only for color reference: do not include its duplicate face, room, curtains or black borders. No collage, background, text, badge, added white outline, logo or watermark.


## Image generation prompts

### garden_desktop

Extract and reconstruct ONLY the wide DESKTOP flower garden background from the LEFT panel. Output a single full-bleed landscape 16:10 environment image at high resolution, not a design board. Remove EVERY text, avatar, UI element, border, label, icon, button and footer, filling their places naturally with the garden environment. Preserve the approved image's exact aesthetic: cinematic dark 3D fern and wildflower valley, deep near-black central negative space occupying the middle upper 65% of the picture so white website text can sit clearly in front, realistic sharp fern leaves and tiny peach-orange, pink, yellow and lavender flowers at the lower sides, blurred close blossoms at the outer corners, a lush V-shaped floral valley receding toward the dark center, warm petal lighting and dark green leaves. Keep the top 15% almost black for a site header. Flowers should frame the lower half and outer edges, never cover the central text-safe region. No people, no animals, no portrait, no words, no lettering, no logo, no UI, no watermark. This is a production background texture for an interactive immersive floral website.

### garden_mobile

Edit the supplied approved mobile website preview into ONLY its clean full-bleed background. Output a high-resolution portrait image in exactly 1:2 aspect ratio, no device, no framing. Remove ALL text, cat avatar, icons, buttons, footer, monogram and UI, inpainting those regions naturally. Preserve the exact background aesthetic and composition: almost black deep forest central space, cinematic 3D garden with realistic fern leaves and tiny pink, peach, orange, yellow and lavender wildflowers on the bottom and outer sides, shallow depth of field, large blurry foreground blossoms near extreme bottom corners, sharp midground flower clusters, a deep V-shaped valley narrowing into the center. Keep the entire upper 18% dark and the central middle 65% width between y=20% and y=58% very dark and mostly free of flowers, ready for readable website typography. Retain a richly detailed full garden at the lower half of the image. Do not replace it with a flat gradient or an illustration. No text, lettering, logos, human, animal, UI, watermark. Production responsive background texture for an immersive floral website.
