const bookmarks = [
  {
    Title: 'Same Energy',
    Link: 'https://same.energy/',
    Description: 'Find similar images. Search based on visual instead of text.',
    Tags: 'search engine',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fsame.energy.webp?alt=media&token=c53319f6-6ccd-4e68-a052-c1c919befc18',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'Extract Pics',
    Link: 'https://extract.pics',
    Description: 'Extract all images from a web page for free.',
    Tags: 'bulk downloader, images from url',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fextract.pics.webp?alt=media&token=b8c0de26-bb70-4203-97f6-3ec3df94ed16',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'Photopea',
    Link: 'https://www.photopea.com/',
    Description: 'Run photoshop for free online without installing it.',
    Tags: 'photoshop, image editor, psd editor',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fphotopea.com.webp?alt=media&token=19a6d3ae-c0ca-436c-9066-ee195e0a12d4',
    Category: 'Tool',
    Favicon: 'a',
  },
  {
    Title: 'Vectorpea',
    Link: 'https://www.vectorpea.com/',
    Description: 'Run illustrator for free online without installing it.',
    Tags: 'illustrator, vector editor, eps editor',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fvectorpea.com.webp?alt=media&token=23c07d46-6ba2-4eae-9a98-6677c267d0c9',
    Category: 'Tool',
    Favicon: 'a',
  },
  {
    Title: 'Monkey Type',
    Link: 'https://monkeytype.com/',
    Description: 'Typing test: adjust modes, monitor growth, boost speed.',
    Tags: 'typing speed, typing practice',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fmonkeytype.com.webp?alt=media&token=91ab8235-fbb0-4596-b2ad-8ff22e4d0321',
    Category: 'Productivity',
    Favicon: 'a',
  },
  {
    Title: 'Hemingway App',
    Link: 'https://hemingwayapp.com/',
    Description: 'Clarifies writing, marking long sentences & errors.',
    Tags: 'writing editor, grammer checker, proof reader',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fhemingwayapp.com.webp?alt=media&token=c0250e76-cbcc-415b-9fdc-2d42f3577b76',
    Category: 'Productivity',
    Favicon: 'a',
  },
  {
    Title: 'Witeboard',
    Link: 'https://witeboard.com/',
    Description: 'Witeboard is the fastest real-time online whiteboard.',
    Tags: 'whiteboard, brainstorming',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fwiteboard.com.webp?alt=media&token=116f33bd-4293-4ada-b5b9-f96548b98e88',
    Category: 'Tool',
    Favicon: 'a',
  },
  {
    Title: 'Excalidraw',
    Link: 'https://excalidraw.com/',
    Description: 'Whiteboard tool that lets you easily sketch diagrams.',
    Tags: 'whiteboard, brainstorming',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fexcalidraw.com.webp?alt=media&token=b4439aa6-ea80-40a3-aa54-0355f0420069',
    Category: 'Tool',
    Favicon: 'a',
  },
  {
    Title: 'Littler Books',
    Link: 'https://littlerbooks.com/',
    Description: 'Nonfiction books summarized into their essential ideas.',
    Tags: 'books to read, book suggestions, book summaries',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Flittlerbooks.com.webp?alt=media&token=af66c4d2-861a-42c6-8d72-4454f2876520',
    Category: 'Learning',
    Favicon: 'a',
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
    Favicon: 'a',
  },
  {
    Title: 'WordStream',
    Link: 'https://www.wordstream.com/keywords',
    Description: 'Fast and easy way to find keywords.',
    Tags: 'seo, search engine optimization',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fwordstream.com.webp?alt=media&token=a982d7a2-948b-4e76-9ba9-a67d41f1e09c',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'Fast',
    Link: 'https://fast.com/',
    Description: 'Test internet speed without hustle.',
    Tags: 'wifi, router, network',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Ffast.com.webp?alt=media&token=6690b348-47bb-4ab8-9023-edd50b112ed4',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'Growth Design',
    Link: 'https://growth.design/',
    Description: 'Level up your product skills with bite-size tips.',
    Tags: 'pyschology, uiux',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fdesign.growth.webp?alt=media&token=1b278e60-c7c1-4c24-8952-c561875c3878',
    Category: 'Learning',
    Favicon: 'a',
  },
  {
    Title: 'HTTPIE',
    Link: 'https://httpie.io/app',
    Description: 'REST API testing tool. Postman alternative.',
    Tags: 'coding, javascript, react',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fhttpie.io.webp?alt=media&token=6f8f3184-e866-44b0-b506-e05686017d5c',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'mymind',
    Link: 'https://access.mymind.com/everything',
    Description: 'Save images, videos & links with AI organize.',
    Tags: 'bookmarks, collections, saved',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fmymind.com.webp?alt=media&token=8e986cce-3b65-4933-ba75-1d7908a9622d',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'Curation of Curations',
    Link: 'https://www.curationofcurations.com/',
    Description: 'The ultimate design curations to get inspired.',
    Tags: 'user experience, design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fcurationofcurations.com.webp?alt=media&token=87f02980-9b07-4b3e-9116-da30dfee5303',
    Category: 'Collection',
    Favicon: 'a',
  },
  {
    Title: 'Eleven Labs',
    Link: 'https://elevenlabs.io/',
    Description: 'Create the most realistic speech with our AI audio.',
    Tags: 'text to speech, ai',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Felevanlabs.io.webp?alt=media&token=61a9023d-05c3-4af6-8738-62cebad560e3',
    Category: 'Tool',
    Favicon: 'a',
  },
  {
    Title: 'Uppbeat',
    Link: 'https://uppbeat.io/',
    Description: 'Free music and sound effect for video editors.',
    Tags: 'audio, sounds, music',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fuppbeat.io.webp?alt=media&token=8e714b37-2f14-4ef2-8d4b-8e6b60980326',
    Category: 'Resources',
    Favicon: 'a',
  },
  {
    Title: 'Navbar Gallery',
    Link: 'https://www.navbar.gallery/',
    Description: 'Collection of best Navbars.',
    Tags: 'website design, components',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fnavbar.gallery.webp?alt=media&token=ce4b7c67-a869-49f8-a9f7-31496c67c6ad',
    Category: 'Inspiration',
    Favicon: 'a',
  },
  {
    Title: 'Footer Design',
    Link: 'https://footer.design/',
    Description: 'Curated gallery of top website footer inspiration.',
    Tags: 'website design, components',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Ffooter.design.webp?alt=media&token=29d8fa87-437a-466e-8f0f-28ed7dcd93fa',
    Category: 'Inspiration',
    Favicon: 'a',
  },
  {
    Title: 'App Motion Design',
    Link: 'https://appmotion.design/',
    Description: 'Explore the best, hand-picked app motion design.',
    Tags: 'micro-interactions, animations, app design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fappmotion.design.webp?alt=media&token=9db63b59-8386-4019-a865-0a5c2dc699ad',
    Category: 'Inspiration',
    Favicon: 'a',
  },
  {
    Title: '60fps',
    Link: 'https://www.60fps.design/',
    Description: 'Collection of delightful interaction in apps.',
    Tags: 'micro-interactions, animations, app design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2F60fps.design.webp?alt=media&token=8903eefe-7e00-4648-a9a8-c5f991bdd5cb',
    Category: 'Inspiration',
    Favicon: 'a',
  },
  {
    Title: 'Shots',
    Link: 'https://shots.so/',
    Description: 'Create amazing mockups for screenshots and more online.',
    Tags: 'screenshot, mockup',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fshots.so.webp?alt=media&token=a53a91e9-132d-4040-b799-f3a8ec371e24',
    Category: 'Tool',
    Favicon: 'a',
  },
  {
    Title: 'Tweek',
    Link: 'https://tweek.so/',
    Description: 'User-friendly weekly to-do list in a calendar format.',
    Tags: 'calendar, todolist',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Ftweek.so.webp?alt=media&token=ee02da1e-911f-4bb7-b653-d35b55ac9fa0',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'UI Colors',
    Link: 'https://uicolors.app/create',
    Description: 'Get hue values of any color. From one shade to another.',
    Tags: 'palettes, colors',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fuicolors.app.webp?alt=media&token=ac8306cb-0e81-4e9f-9c84-898be641e187',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'Octopus',
    Link: 'https://octopus.do/',
    Description: 'Visual sitemap builder with lo-fi wireframes.',
    Tags: 'seo, search engine optimization, web design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Foctopus.do.webp?alt=media&token=3aadf49c-06ee-4541-8935-ab108f7b739c',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'Vector Maker',
    Link: 'https://vectormaker.co/',
    Description: 'Convert images to SVG Vector. PNG to SVG.',
    Tags: 'vectorize, illustrator',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fvectormaker.co.webp?alt=media&token=73ae4a36-470f-4d3a-b7b2-0f5ac74b1239',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'AI Logo Generator',
    Link: 'https://ailogogenerator.net',
    Description:
      'Create custom, industry-specific logos in minutes with our advanced AI. ',
    Tags: 'artificial intelligence, ai, logo design, graphic design',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Failogogenerator.net.webp?alt=media&token=28028a3a-05ed-42df-9709-684ad8e77cb2',
    Category: 'Utility',
    Favicon: 'a',
  },
  {
    Title: 'Frame Set',
    Link: 'https://frameset.app/',
    Description:
      'Search 350000+ frames from commercials, movies, and music videos.',
    Tags: 'filming, videography',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fframeset.app.webp?alt=media&token=b8639463-2f4b-4ae9-bb05-9c572c73a766',
    Category: 'Inspiration',
    Favicon: 'a',
  },
  {
    Title: 'Eye Candy',
    Link: 'https://eyecannndy.com/',
    Description: 'A visual technique library for visual technique lovers.',
    Tags: 'filming, videography',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Feyecannndy.com.webp?alt=media&token=ebea8eab-ff36-4586-b297-bc035465ee10',
    Category: 'Inspiration',
    Favicon: 'a',
  },
  {
    Title: 'Ads of The World',
    Link: 'https://www.adsoftheworld.com/',
    Description:
      'Creative advertisements from around the world highlighted by the AOTW team.',
    Tags: 'filming, videography',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fadsoftheworld.com.webp?alt=media&token=90712692-fa75-46b8-b5ef-0c26c7e3f804',
    Category: 'Inspiration',
    Favicon: 'a',
  },
  {
    Title: 'Shortverse',
    Link: 'https://shortverse.com/',
    Description:
      'Film festivals, distributors, and filmmakers all on one platform.',
    Tags: 'filming, videography',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fshortverse.com.webp?alt=media&token=65d51646-4fe3-4efa-9c98-4c32365008e6',
    Category: 'Inspiration',
    Favicon: 'a',
  },
  {
    Title: 'Flim Ai',
    Link: 'https://app.flim.ai/',
    Description: 'Flim helps you find the perfect image to express your ideas.',
    Tags: 'filming, videography, artificial intelligence, ai',
    Thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/uploadedbyosama.appspot.com/o/Bookmarks%2Fflim.ai.webp?alt=media&token=966ff250-c48c-4bae-b94b-f9982d91eb86',
    Category: 'Inspiration',
    Favicon: 'a',
  },
  {
    Title: 'Cosmos',
    Link: 'https://www.cosmos.so/',
    Description: '',
    Tags: '',
    Thumbnail: '',
    Category: 'Inspiration',
    Favicon: 'a',
  },
];

export default bookmarks;
