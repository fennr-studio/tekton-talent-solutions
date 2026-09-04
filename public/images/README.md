# Images

The site ships without photography on purpose: every visual is generated in code
(SVG networks, the hub map, the monogram portrait plates), so there are no
licensing questions and nothing to compress.

Two places are designed to take real photographs when Tekton supplies them.

## Leadership portraits

Drop files here:

```
public/images/leadership/saikarthik.jpg
public/images/leadership/harika.jpg
```

Then set the paths in `data/leadership.ts`:

```ts
portrait: '/images/leadership/saikarthik.jpg',
```

`PortraitPlate` handles the rest — `next/image` with a 3:4 crop, AVIF/WebP
conversion, responsive sizes, and a monochrome-to-colour lift on hover. Supply
portraits at roughly 1200 × 1600 px or larger. With no file set, the designed
monogram plate is rendered instead, so nothing ever breaks.

## Anything else

If you add photography elsewhere, use `next/image` with explicit `sizes` and
keep the source at least twice the largest rendered width. Do not copy imagery
from the previous Wix site unless Tekton holds the licence for it — several of
those files are stock or AI-generated assets tied to that platform.
