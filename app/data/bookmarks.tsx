// https://opensheet.elk.sh/1jonPSUsmPe5NZ9odeGyrgt8I32oViHkQ79XFVYyv2ZU/Bookmarks

const bookmarks = [
  {
    Title: 'Same Energy',
    Link: 'https://same.energy/',
    Description: 'Find similar images. Search based on visual instead of text.',
    Tags: 'search engine',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fsame.energy.webp?alt=media&token=c53319f6-6ccd-4e68-a052-c1c919befc18',
    Category: 'Utility',
    Favicon:
      'https://img.notionusercontent.com/s3/prod-files-secure%2Fd71078c0-7e5c-4d00-bd4c-9de073cf5fbb%2F37bc4b96-9711-461e-954c-1841389c2e49%2FfaviconV2.png/size/w=250?exp=1744099681&sig=LL4vpOONLRLMKgnuyHP9MxNDMCKwWJgNB2rpnWiLrTE&id=1cbd114b-b4c2-804f-a6d8-c2a2cbf214f6&table=block&userId=459bff25-24a0-4dc8-8a7a-808541d9802d',
  },
  {
    Title: 'Extract Pics',
    Link: 'https://extract.pics',
    Description: 'Extract all images from a web page for free.',
    Tags: 'bulk downloader, images from url',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fextract.pics.webp?alt=media&token=b8c0de26-bb70-4203-97f6-3ec3df94ed16',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'Photopea',
    Link: 'https://www.photopea.com/',
    Description: 'Run photoshop for free online without installing it.',
    Tags: 'photoshop, image editor, psd editor',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fphotopea.com.webp?alt=media&token=19a6d3ae-c0ca-436c-9066-ee195e0a12d4',
    Category: 'Tool',
    Favicon: 'Favicon',
  },
  {
    Title: 'Vectorpea',
    Link: 'https://www.vectorpea.com/',
    Description: 'Run illustrator for free online without installing it.',
    Tags: 'illustrator, vector editor, eps editor',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fvectorpea.com.webp?alt=media&token=23c07d46-6ba2-4eae-9a98-6677c267d0c9',
    Category: 'Tool',
    Favicon: 'Favicon',
  },
  {
    Title: 'Monkey Type',
    Link: 'https://monkeytype.com/',
    Description: 'Typing test: adjust modes, monitor growth, boost speed.',
    Tags: 'typing speed, typing practice',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fmonkeytype.com.webp?alt=media&token=91ab8235-fbb0-4596-b2ad-8ff22e4d0321',
    Category: 'Productivity',
    Favicon: 'Favicon',
  },
  {
    Title: 'Hemingway App',
    Link: 'https://hemingwayapp.com/',
    Description: 'Clarifies writing, marking long sentences & errors.',
    Tags: 'writing editor, grammer checker, proof reader',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fhemingwayapp.com.webp?alt=media&token=c0250e76-cbcc-415b-9fdc-2d42f3577b76',
    Category: 'Productivity',
    Favicon: 'Favicon',
  },
  {
    Title: 'Witeboard',
    Link: 'https://witeboard.com/',
    Description: 'Witeboard is the fastest real-time online whiteboard.',
    Tags: 'whiteboard, brainstorming',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fwiteboard.com.webp?alt=media&token=116f33bd-4293-4ada-b5b9-f96548b98e88',
    Category: 'Tool',
    Favicon: 'Favicon',
  },
  {
    Title: 'Excalidraw',
    Link: 'https://excalidraw.com/',
    Description: 'Whiteboard tool that lets you easily sketch diagrams.',
    Tags: 'whiteboard, brainstorming',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fexcalidraw.com.webp?alt=media&token=b4439aa6-ea80-40a3-aa54-0355f0420069',
    Category: 'Tool',
    Favicon: 'Favicon',
  },
  {
    Title: 'Littler Books',
    Link: 'https://littlerbooks.com/',
    Description: 'Nonfiction books summarized into their essential ideas.',
    Tags: 'books to read, book suggestions, book summaries',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Flittlerbooks.com.webp?alt=media&token=af66c4d2-861a-42c6-8d72-4454f2876520',
    Category: 'Learning',
    Favicon: 'Favicon',
  },
  {
    Title: 'Quran',
    Link: 'https://quran.com/',
    Description:
      'Simple Quran with translation available in multiple languages.',
    Tags: 'quran recitation',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fquran.com.webp?alt=media&token=a0bdcda0-f9d1-4ab3-9372-ee47b31f6bbe',
    Category: 'Reading',
    Favicon: 'Favicon',
  },
  {
    Title: 'WordStream',
    Link: 'https://www.wordstream.com/keywords',
    Description: 'Fast and easy way to find keywords.',
    Tags: 'seo, search engine optimization',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fwordstream.com.webp?alt=media&token=a982d7a2-948b-4e76-9ba9-a67d41f1e09c',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'Fast',
    Link: 'https://fast.com/',
    Description: 'Test internet speed without hustle.',
    Tags: 'wifi, router, network',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Ffast.com.webp?alt=media&token=6690b348-47bb-4ab8-9023-edd50b112ed4',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'Growth Design',
    Link: 'https://growth.design/',
    Description: 'Level up your product skills with bite-size tips.',
    Tags: 'pyschology, uiux',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fdesign.growth.webp?alt=media&token=1b278e60-c7c1-4c24-8952-c561875c3878',
    Category: 'Learning',
    Favicon: 'Favicon',
  },
  {
    Title: 'HTTPIE',
    Link: 'https://httpie.io/app',
    Description: 'REST API testing tool. Postman alternative.',
    Tags: 'coding, javascript, react',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fhttpie.io.webp?alt=media&token=6f8f3184-e866-44b0-b506-e05686017d5c',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'mymind',
    Link: 'https://access.mymind.com/everything',
    Description: 'Save images, videos & links with AI organize.',
    Tags: 'bookmarks, collections, saved',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fmymind.com.webp?alt=media&token=8e986cce-3b65-4933-ba75-1d7908a9622d',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'Curation of Curations',
    Link: 'https://www.curationofcurations.com/',
    Description: 'The ultimate design curations to get inspired.',
    Tags: 'user experience, design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fcurationofcurations.com.webp?alt=media&token=87f02980-9b07-4b3e-9116-da30dfee5303',
    Category: 'Collection',
    Favicon: 'Favicon',
  },
  {
    Title: 'Eleven Labs',
    Link: 'https://elevenlabs.io/',
    Description: 'Create the most realistic speech with our AI audio.',
    Tags: 'text to speech, ai',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Felevanlabs.io.webp?alt=media&token=61a9023d-05c3-4af6-8738-62cebad560e3',
    Category: 'Tool',
    Favicon: 'Favicon',
  },
  {
    Title: 'Uppbeat',
    Link: 'https://uppbeat.io/',
    Description: 'Free music and sound effect for video editors.',
    Tags: 'audio, sounds, music',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fuppbeat.io.webp?alt=media&token=8e714b37-2f14-4ef2-8d4b-8e6b60980326',
    Category: 'Resources',
    Favicon: 'Favicon',
  },
  {
    Title: 'Navbar Gallery',
    Link: 'https://www.navbar.gallery/',
    Description: 'Collection of best Navbars.',
    Tags: 'website design, components',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fnavbar.gallery.webp?alt=media&token=ce4b7c67-a869-49f8-a9f7-31496c67c6ad',
    Category: 'Inspiration',
    Favicon: 'Favicon',
  },
  {
    Title: 'Footer Design',
    Link: 'https://footer.design/',
    Description: 'Curated gallery of top website footer inspiration.',
    Tags: 'website design, components',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Ffooter.design.webp?alt=media&token=29d8fa87-437a-466e-8f0f-28ed7dcd93fa',
    Category: 'Inspiration',
    Favicon: 'Favicon',
  },
  {
    Title: 'App Motion Design',
    Link: 'https://appmotion.design/',
    Description: 'Explore the best, hand-picked app motion design.',
    Tags: 'micro-interactions, animations, app design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fappmotion.design.webp?alt=media&token=9db63b59-8386-4019-a865-0a5c2dc699ad',
    Category: 'Inspiration',
    Favicon: 'Favicon',
  },
  {
    Title: '60fps',
    Link: 'https://www.60fps.design/',
    Description: 'Collection of delightful interaction in apps.',
    Tags: 'micro-interactions, animations, app design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2F60fps.design.webp?alt=media&token=8903eefe-7e00-4648-a9a8-c5f991bdd5cb',
    Category: 'Inspiration',
    Favicon: 'Favicon',
  },
  {
    Title: 'Shots',
    Link: 'https://shots.so/',
    Description: 'Create amazing mockups for screenshots and more online.',
    Tags: 'screenshot, mockup',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fshots.so.webp?alt=media&token=a53a91e9-132d-4040-b799-f3a8ec371e24',
    Category: 'Tool',
    Favicon: 'Favicon',
  },
  {
    Title: 'Tweek',
    Link: 'https://tweek.so/',
    Description: 'User-friendly weekly to-do list in a calendar format.',
    Tags: 'calendar, todolist',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Ftweek.so.webp?alt=media&token=ee02da1e-911f-4bb7-b653-d35b55ac9fa0',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'UI Colors',
    Link: 'https://uicolors.app/create',
    Description: 'Get hue values of any color. From one shade to another.',
    Tags: 'palettes, colors',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fuicolors.app.webp?alt=media&token=ac8306cb-0e81-4e9f-9c84-898be641e187',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'Octopus',
    Link: 'https://octopus.do/',
    Description: 'Visual sitemap builder with lo-fi wireframes.',
    Tags: 'seo, search engine optimization, web design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Foctopus.do.webp?alt=media&token=3aadf49c-06ee-4541-8935-ab108f7b739c',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'Teamcamp',
    Link: 'https://www.teamcamp.app/',
    Description: 'Manage projects, collaborate with your team.',
    Tags: 'project management',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fteamcamp.app.webp?alt=media&token=5d430753-5201-4bcf-a9d3-690d41d1b3bd',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'RaySo',
    Link: 'https://ray.so/',
    Description: 'Turn code to pics. Pic modes, change colors and sizes.',
    Tags: 'screenshot, social media post',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fray.so.webp?alt=media&token=ebf3f9c8-6fa5-4fff-a588-8659c9f3beb8',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'MuscleWiki',
    Link: 'https://musclewiki.com/',
    Description:
      'Interactive body map with 2000+ guided exercises for all fitness levels.',
    Tags: 'fitness, exercises',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fmusclewiki.com.webp?alt=media&token=36f63f22-e986-4b21-8d26-e7420e86454c',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'MergeMyPDFs',
    Link: 'https://mergemypdfs.com/',
    Description: "Combine PDFs in a snap. It's quick and easy to use.",
    Tags: 'pdf',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fmergemypdfs.com.webp?alt=media&token=65806ba1-2b38-4240-bb68-71ab119b9550',
    Category: 'Tool',
    Favicon: 'Favicon',
  },
  {
    Title: 'Index Guru',
    Link: 'https://www.indexguru.io/',
    Description: '#1 Website indexing tool. Index unindexed pages.',
    Tags: 'seo, indexing',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Findexguru.com.webp?alt=media&token=e11dcd34-c716-4a0e-99f0-6f69a9af0825',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'Logo System',
    Link: 'https://logosystem.co/',
    Description:
      'Find inspiration by exploring this library of real and fictional logos.',
    Tags: 'logo, graphic design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Flogosystem.co.webp?alt=media&token=2acfb523-9b03-496a-b5f2-ec0fd9725f83',
    Category: 'Inspiration',
    Favicon: 'Favicon',
  },
  {
    Title: 'Coolors',
    Link: 'https://coolors.co/palettes/trending',
    Description: 'Thousands of beautiful color palettes inspiration.',
    Tags: 'colors, colours',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fcoolors.co.webp?alt=media&token=2dff7d11-8a82-4af3-96b8-aacd9e1262d7',
    Category: 'Inspiration',
    Favicon: 'Favicon',
  },
  {
    Title: 'Shortcuts Design',
    Link: 'https://shortcuts.design/',
    Description: 'Every shortcut for designers, centralized & searchable.',
    Tags: 'shortcuts, softwares',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fshortcuts.design.webp?alt=media&token=f00213f2-78fa-4865-822b-45b63f832032',
    Category: 'Productivity',
    Favicon: 'Favicon',
  },
  {
    Title: 'Daily Dev',
    Link: 'https://app.daily.dev/',
    Description: 'Quality knowledge about tech, design & development.',
    Tags: 'learning, programming, coding',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fapp.daily.dev.webp?alt=media&token=07309c1d-6536-4c71-ad12-6bfe2a046090',
    Category: 'Learning',
    Favicon: 'Favicon',
  },
  {
    Title: 'Uiverse',
    Link: 'https://uiverse.io/',
    Description: 'Free UI elements made with CSS.',
    Tags: 'components, elements',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fuiverse.io.webp?alt=media&token=ab1c9c57-5b53-4f5c-9d3d-3fad4919905c',
    Category: 'Resources',
    Favicon: 'Favicon',
  },
  {
    Title: 'Design Checklist',
    Link: 'https://www.checklist.design/',
    Description: 'List of checklists for user interface design.',
    Tags: 'checklists, ui design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fchecklist.design.webp?alt=media&token=c603c6ed-12db-4508-8132-666f8e8c95ec',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'Gridzzly',
    Link: 'https://gridzzly.com/',
    Description: 'Make printable grid paper easily.',
    Tags: 'printable paper, grids, layout',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fgridzzly.com.webp?alt=media&token=d3157b69-a973-4cb3-a52e-54efe8a79ae6',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'StoryMap',
    Link: 'https://storymap.site/',
    Description: 'Effortless user story mapping.',
    Tags: 'brainstorming, mapping, planning',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fstorymap.site.webp?alt=media&token=c190e44c-1af3-4dd4-b758-9ea11baf813e',
    Category: 'Utility',
    Favicon: 'Favicon',
  },
  {
    Title: 'Design Spells',
    Link: 'https://www.designspells.com/',
    Description: 'Design details that feel like magic.',
    Tags: 'micro-interactions, design details',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fdesignspells.com.webp?alt=media&token=db0821a9-1ae7-483f-8f0e-7652c115c1c3',
    Category: 'Inspiration',
    Favicon: 'Favicon',
  },
  {
    Title: 'Thiings',
    Link: 'https://www.thiings.co/things',
    Description: 'Collection of AI-generated, skeuomorphic icons.',
    Tags: 'icons',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fthiings.co.webp?alt=media&token=77a5c491-5266-409d-9233-b09528796748',
    Category: 'Resources',
  },
];

export default bookmarks;
