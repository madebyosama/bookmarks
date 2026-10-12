// Editorial content layered on top of bookmarks.tsx. Bookmarks are referenced by slug
// (lowercased title, non-alphanumerics → "-"); bookmarkService throws on unknown slugs.

export const categoryDescriptions: Record<string, string> = {
  Utility: 'Small, single-purpose tools that do one job well.',
  Inspiration: 'Galleries and references worth browsing before you design.',
  Resources: 'Free assets — fonts, icons and kits — ready to use.',
  Tool: 'Full applications for making things, right in the browser.',
  Learning: 'Paths and guides for picking up a new skill.',
  AI: 'Tools built around generative models.',
  Productivity: 'Help with focus, writing and getting things done.',
  Collection: 'Curated directories and asset libraries.',
  Reading: 'Things worth reading and listening to.',
}

// Hero carousel, then the "Editor's picks" grid below it.
export const featuredSlugs = ['photopea', 'coolors', 'excalidraw', 'phosphor-icons']
export const pickSlugs = ['60fps', 'design-spells', 'fontshare', 'tldraw', 'rayso', 'uiverse', 'roadmaps', 'whisk']

export type Collection = { slug: string; title: string; description: string; bookmarks: string[] }

export const collections: Collection[] = [
  {
    slug: 'motion',
    title: 'Motion & micro-interactions',
    description: 'References and tools for transitions, easing curves and the small details that make an interface feel alive.',
    bookmarks: ['60fps', 'app-motion-design', 'design-spells', 'easing', 'jitter', 'rive'],
  },
  {
    slug: 'color',
    title: 'Color toolkit',
    description: 'Find a palette direction, then turn a single hex into a full set of usable shades.',
    bookmarks: ['coolors', 'ui-colors', 'colorway', 'picular'],
  },
  {
    slug: 'free-assets',
    title: 'Free design assets',
    description: 'Fonts, icons, logos and flags you can drop straight into a project.',
    bookmarks: ['fontshare', 'uncut', 'phosphor-icons', 'thiings', '3d-icons', 'icon-buddy', 'svgl', 'flagpack'],
  },
  {
    slug: 'sketch',
    title: 'Sketch & brainstorm',
    description: 'Open canvases for thinking out loud — whiteboards, story maps and mind maps.',
    bookmarks: ['excalidraw', 'tldraw', 'witeboard', 'storymap', 'rabbithole', 'mind-map-wizard'],
  },
  {
    slug: 'logos',
    title: 'Logo & brand inspiration',
    description: 'Archives of marks, wordmarks and identities to study before you draw.',
    bookmarks: ['logo-system', 'logggos', 'brand-archive', 'logo-book', 'world-vector-logo'],
  },
  {
    slug: 'web-ui',
    title: 'Web UI references',
    description: 'Real-world navbars, footers, CTAs and landing pages, organised by pattern.',
    bookmarks: ['navbar-gallery', 'footer-design', 'patttterns', 'cta-examples', 'landingfolio', 'view-port'],
  },
  {
    slug: 'seo',
    title: 'SEO & launch',
    description: 'Get found: keyword research, indexing, audits and a domain to launch on.',
    bookmarks: ['wordstream', 'octopus', 'index-guru', 'serpdrill', 'magickseo', 'instant-domain-search'],
  },
]

export type Post = { slug: string; title: string; excerpt: string; tag: string; body: string[]; bookmarks: string[] }

// ponytail: plain paragraphs, no markdown. Add a renderer when posts need links or headings.
export const posts: Post[] = [
  {
    slug: 'color-palette-tools',
    title: 'Two tools for every color palette',
    excerpt: 'Coolors for finding a direction, UI Colors for turning one hex into a scale an interface can actually use.',
    tag: 'Color',
    bookmarks: ['coolors', 'ui-colors'],
    body: [
      'Picking colors is two different jobs. First you need a direction: a mood, a small set of hues that work together. Coolors is built for that — it collects thousands of trending palettes you can browse, save and tweak.',
      'Once a base color is chosen, an interface needs more than five swatches. It needs tints and shades for backgrounds, borders, hover states and text. UI Colors takes a single value and generates that full range, from the lightest step to the darkest.',
      'Used together, the first gives you the idea and the second makes it usable in a real product.',
    ],
  },
  {
    slug: 'study-ui-motion',
    title: 'Where to study good UI motion',
    excerpt: 'Three references for animation that feels intentional instead of decorative.',
    tag: 'Motion',
    bookmarks: ['60fps', 'design-spells', 'easing'],
    body: [
      'Good motion is mostly invisible: it explains where something came from and confirms that an action worked. The fastest way to learn it is to study real examples.',
      '60fps collects interactions recorded from shipping apps, sorted by pattern. Design Spells focuses on the small, delightful details that make a product feel considered. Easing is a reference of easing curves, so you can see how an animation accelerates and settles before you write a line of CSS.',
    ],
  },
  {
    slug: 'free-browser-design-stack',
    title: 'A free design stack that runs in the browser',
    excerpt: 'Photopea, Fontshare and Phosphor cover image editing, type and icons — no installs, no licenses.',
    tag: 'Assets',
    bookmarks: ['photopea', 'fontshare', 'phosphor-icons'],
    body: [
      'You can do a surprising amount of design work without installing anything. Photopea runs a Photoshop-style editor in the browser and opens PSD files.',
      'For type, Fontshare offers free, high-quality fonts from the Indian Type Foundry. For icons, Phosphor is a flexible family you can tune in weight and size to match your interface.',
    ],
  },
]

export type Term = { slug: string; term: string; definition: string; bookmarks: string[] }

export const glossary: Term[] = [
  { slug: 'ai-art', term: 'AI art', definition: 'Images created or remixed by machine-learning models from a text prompt or reference pictures.', bookmarks: ['whisk', 'imageprompt'] },
  { slug: 'code-screenshot', term: 'Code screenshot', definition: 'An image of a code snippet, framed and styled for sharing where plain text would lose its formatting.', bookmarks: ['rayso'] },
  { slug: 'color-palette', term: 'Color palette', definition: 'A small, deliberate set of colors used together so an interface or brand feels consistent.', bookmarks: ['coolors', 'ui-colors', 'colorway', 'picular'] },
  { slug: 'easing', term: 'Easing', definition: 'The acceleration curve of an animation — how motion speeds up and slows down instead of moving at a constant rate.', bookmarks: ['easing', '60fps'] },
  { slug: 'icon-set', term: 'Icon set', definition: 'A family of icons drawn on the same grid, stroke and style, so they look consistent side by side.', bookmarks: ['phosphor-icons', 'icon-buddy', '3d-icons', 'thiings'] },
  { slug: 'micro-interaction', term: 'Micro-interaction', definition: 'A small, single-purpose moment of feedback — a like animating, a toggle snapping — that confirms an action.', bookmarks: ['60fps', 'design-spells', 'app-motion-design', 'easing'] },
  { slug: 'mockup', term: 'Mockup', definition: 'A realistic preview of a design placed in context, such as a screenshot inside a device frame.', bookmarks: ['shots', 'brand-bird'] },
  { slug: 'pomodoro', term: 'Pomodoro', definition: 'A focus technique of short, timed work sessions separated by brief breaks.', bookmarks: ['pomofocus'] },
  { slug: 'psd', term: 'PSD', definition: 'Photoshop’s layered file format. Browser editors like Photopea can open and save it.', bookmarks: ['photopea'] },
  { slug: 'roadmap', term: 'Roadmap', definition: 'A step-by-step learning path that shows which skills to pick up, and in what order.', bookmarks: ['roadmaps', 'learn-anything'] },
  { slug: 'seo', term: 'SEO', definition: 'Search engine optimisation: making pages easier for search engines to find, understand and rank.', bookmarks: ['wordstream', 'octopus', 'serpdrill', 'index-guru'] },
  { slug: 'typeface', term: 'Typeface', definition: 'A family of fonts that share one design, such as its regular, medium and bold weights.', bookmarks: ['fontshare', 'uncut'] },
  { slug: 'vector', term: 'Vector', definition: 'Graphics defined by paths and points instead of pixels, so they scale to any size without blurring.', bookmarks: ['vectorpea', 'svgl', 'world-vector-logo'] },
  { slug: 'whiteboard', term: 'Whiteboard', definition: 'A shared, open canvas for sketching diagrams and ideas, often with other people at the same time.', bookmarks: ['excalidraw', 'tldraw', 'witeboard'] },
  { slug: 'wireframe', term: 'Wireframe', definition: 'A low-fidelity layout that shows structure and hierarchy before any visual design is applied.', bookmarks: ['wireframe-examples', 'flowmapp'] },
]
