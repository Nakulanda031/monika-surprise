// ✏️ EDIT EVERYTHING HERE. Media files live in /public/media (see README).
export const content = {
  recipientName: 'Monika',
  creatorName: 'Nakulan',
  birthday: '2026-10-29', // YYYY-MM-DD, uses the visitor's local time

  welcome: {
    title: 'Happy Birthday, Monika! 💗',
    subtitle: 'Someone made a little world just for you.',
    support: 'A tiny surprise, made with a lot of heart.',
    button: 'Tap to Begin ✨',
  },
  countdown: {
    heading: 'Something special is waiting for you.',
    birthdayTitle: 'Happy Birthday, Monika! 🎂',
    birthdayText: 'Today is your day. I hope it is full of smiles.',
    afterTitle: 'A little world, still yours',
    afterText: 'Your birthday has passed, but this little world is still yours to explore.',
  },

  balloons: [
    'You deserve all the happiness in the world. 💗',
    'Never stop smiling, Monika.',
    'You make ordinary moments feel special.',
    'I hope this year brings you beautiful memories.',
    "Here's a little reminder that you are appreciated.",
    'Some people make life brighter just by being themselves.',
    "One last balloon… there's a tiny secret waiting ahead. 👀",
  ],
  balloonsDone: 'All seven balloons popped! 🎉 Your little secret is just ahead.',

  gallery: {
    title: 'Little Moments 📸',
    subtitle: 'Little moments can become the loveliest memories.',
    photos: [
      { src: 'media/photos/01.webp', alt: 'Smiling in a red saree in front of an ornate wooden door with flower garlands', caption: 'Dressed in red and grace, welcoming the day with a radiant smile. ✨' },
      { src: 'media/photos/02.webp', alt: 'Two friends standing together outdoors by a brick pillar', caption: 'Good friends and quiet smiles that make ordinary days feel brighter. 🌸' },
      { src: 'media/photos/03.webp', alt: 'Smiling in a black patterned top in front of a tree with huge green leaves', caption: 'Surrounded by leafy green shades and a soft touch of sunlight. 🌿' },
      { src: 'media/photos/04.webp', alt: 'Smiling in a sky-blue embroidered outfit in front of a leafy hedge', caption: 'That spontaneous, wholehearted laugh that lights up everything around it. 💫' },
      { src: 'media/photos/05.webp', alt: 'Smiling in a lilac outfit beside a tree and a green fence', caption: 'A quiet moment under the branches, wrapped in soft lilac calm. 🌷' },
      { src: 'media/photos/06.webp', alt: 'In a white and gold saree and sunglasses, holding marigolds under hanging flower garlands', caption: 'Festive vibes, yellow marigolds, and a touch of effortless style. 🌼' },
      { src: 'media/photos/07.webp', alt: 'Smiling in a white and gold Kerala saree with a brown floral blouse', caption: 'Classic elegance in white and gold, carrying timeless poise. ✨' },
      { src: 'media/photos/08.webp', alt: 'Smiling in a white kurta and red dupatta standing on grass', caption: 'Bright smiles and a splash of red on an easygoing sunny afternoon. ☀️' },
      { src: 'media/photos/09.webp', alt: 'Close-up of an eye with winged eyeliner in warm pink light', caption: 'A quiet focus on the finer details, glowing in warm light. 💫' },
    ] as { src: string; alt: string; caption?: string; date?: string }[],
  },

  videos: {
    title: 'Little Moments, Moving Memories 🎬',
    subtitle: 'Some memories are even better when they move.',
    items: [
      { src: 'media/videos/memory-1.mp4', poster: 'media/videos/memory-1-poster.jpg', caption: 'A moment worth remembering.' },
    ] as { src: string; poster?: string; caption?: string }[],
  },

  notes: {
    title: 'Secret Notes 💌',
    subtitle: 'Tap an envelope to open it.',
    items: [
      'You have a way of making ordinary days feel special.',
      'Your smile can make a difficult day feel lighter.',
      "I'm glad our paths crossed.",
      'You are one of my favourite people to talk to.',
      'Some people become special without even trying.',
      "Maybe one day you'll understand the little secret behind this surprise. 💗",
    ],
  },

  final: {
    line1: 'Monika, this little world was made just for you.',
    line2: 'Some people slowly become a special part of our everyday lives.',
    button: 'Open One Last Secret 💌',
    revealed: 'Here it comes… read it slowly. 💗',
    next: 'Read the secret',
  },

  crush: {
    paragraphs: [
      'Somewhere between our conversations, your smiles, and the little moments we share, you became someone a little more special to me. 💗',
      "Maybe there's a tiny secret behind all this effort…",
      'Can you guess who made this for you? 👀',
    ],
    signoff: ['With a little courage and a lot of care,', '— Nakulan ❤️'],
    button: "That's so sweet 💗",
    thanks: 'Thank you for reading. There is no rush and nothing you need to say. I just hope today made you smile.',
    replay: 'Replay the journey 🎈',
    credit: 'Made with care by Nakulan',
  },

  // Put an original / licensed / your own audio file in public/media/audio and set the path.
  // Leave src empty to hide the music button.
  music: { src: 'media/audio/birthday-music.mp3', title: 'Background music' },
};
