export type Photo = {
  src: string
  caption: string
  alt: string
}

export type FloatingPhoto = {
  src: string
  alt: string
  /** Placement inside the hero, as CSS inset percentages / sizes */
  className: string
  duration: number
  delay: number
}

export type TimelineEvent = {
  date: string
  label: string
  title: string
  body: string
}

export const site = {
  title: 'For Arya, with love',
  description: 'Something special is coming, Minnu.',
  siteUrl: '',
  ogImage: '/photos/IMG_1861.JPG',
}

export const names = {
  partnerName: 'Arya',
  partnerNickname: 'Minnu',
  myName: 'Akhilesh',
  myNickname: 'Shuttu',
}

export const dates = {
  birthDate: '2001-11-07',
  birthdayTarget: '2026-11-07T00:00:00+05:30',
  firstMet: '2026-06-04',
  firstTravel: '2026-06-05',
  turningAge: 25,
}

export const copy = {
  heroEyebrow: 'For Minnu',
  heroLine: 'Something special is coming...',
  heroBirthdayLine: 'Today is yours, my love.',
  scrollHint: 'Scroll slowly',
  daysSinceLabel: 'Days since we met',
  galleryTitle: 'A few of my favorite frames',
  gallerySubtitle: 'Not every photo. Just the ones that still make me pause.',
  letterButton: 'Open my letter',
  letterOpenedLabel: 'A letter for you',
  surpriseButton: 'Tap for a surprise',
  surpriseMessage: 'I love you, Minnu.\nToday, tomorrow, and every quiet day in between.',
  surpriseFrom: '— Shuttu',
  birthdayHeadline: 'Happy 25th Birthday, Arya',
  birthdaySub: 'The world is softer because you are in it.',
  footer: `Made with love by ${names.myName}`,
  musicLabelPlay: 'Play music',
  musicLabelPause: 'Pause music',
  musicSrc: '/music.mp3',
}

export const letter = {
  greeting: 'Minnu,',
  body: `Five months is not a long time on a calendar.
It is long enough to learn the shape of your laugh,
and how a day can split into before you and after you.

June 4th. Then June 5th — the most memorable day,
the moment that quietly changed my life.
I still think about that journey. I still choose you in it.

You are 25, and I am grateful I get to watch you
walk into this year with that smile.

Happy birthday, my love.
I am so proud of you.`,
  signOff: 'Yours, always',
  signature: 'Shuttu',
}

export const timeline: TimelineEvent[] = [
  {
    date: dates.firstMet,
    label: 'June 4, 2026',
    title: 'The day we met',
    body: 'A beginning I did not know I was waiting for.',
  },
  {
    date: dates.firstTravel,
    label: 'June 5, 2026',
    title: 'Our first journey together',
    body: 'The most memorable day. The moment that changed my life.',
  },
  {
    date: 'today',
    label: 'Today',
    title: 'And here we are...',
    body: 'Still new. Still certain. Still choosing this.',
  },
]

export const photos: Photo[] = [
  {
    src: '/photos/IMG_1861.JPG',
    caption: 'Sky, palms, and you.',
    alt: 'Arya and Akhilesh looking up at the sky under palm trees',
  },
  {
    src: '/photos/IMG_3734.jpg',
    caption: 'Green hills, same smile.',
    alt: 'Arya and Akhilesh smiling together in a tea garden',
  },
  {
    src: '/photos/IMG_3764.JPG',
    caption: 'Your hand in mine.',
    alt: 'Akhilesh and Arya reaching for each other in the forest',
  },
  {
    src: '/photos/IMG_2771.jpg',
    caption: 'A quiet table, two of us.',
    alt: 'Arya and Akhilesh close together at a restaurant',
  },
  {
    src: '/photos/IMG_4403.JPG',
    caption: 'On the way, already home.',
    alt: 'Arya and Akhilesh taking a selfie in the car',
  },
  {
    src: '/photos/IMG_1201.JPG',
    caption: 'This smile.',
    alt: 'Portrait of Arya smiling by a window',
  },
  {
    src: '/photos/IMG_3697.jpg',
    caption: 'Yellow against the trees.',
    alt: 'Arya in a yellow dress standing on a forest bridge',
  },
  {
    src: '/photos/IMG_4061.jpg',
    caption: 'Evening light, looking back.',
    alt: 'Arya looking over her shoulder in warm evening light',
  },
  {
    src: '/photos/IMG_1864.JPG',
    caption: 'Grass, palms, us.',
    alt: 'Arya and Akhilesh smiling together under palm trees',
  },
  {
    src: '/photos/IMG_4075.JPG',
    caption: 'Night garden.',
    alt: 'Arya and Akhilesh standing together in front of green leaves at night',
  },
  {
    src: '/photos/IMG_4405.JPG',
    caption: 'That hug.',
    alt: 'Arya and Akhilesh hugging and smiling in the car',
  },
  {
    src: '/photos/IMG_0479.JPG',
    caption: 'Warm corridor, warmer smile.',
    alt: 'Arya smiling in an orange corridor with a tote bag',
  },
  {
    src: '/photos/IMG_0495.JPG',
    caption: 'This laugh.',
    alt: 'Arya smiling and giving a thumbs up outdoors',
  },
  {
    src: '/photos/IMG_2779.JPG',
    caption: 'Two shadows, one walk.',
    alt: 'Two shadows of Arya and Akhilesh on a night sidewalk',
  },
]

export const floatingPhotos: FloatingPhoto[] = [
  {
    src: '/photos/IMG_0479.JPG',
    alt: '',
    className: 'top-[6%] left-[-6%] w-24 sm:left-[1%] sm:w-36 md:w-44',
    duration: 16,
    delay: 0,
  },
  {
    src: '/photos/IMG_1864.JPG',
    alt: '',
    className: 'top-[7%] right-[-8%] w-28 sm:right-[1%] sm:w-40 md:w-48',
    duration: 19,
    delay: 1.2,
  },
  {
    src: '/photos/IMG_0495.JPG',
    alt: '',
    className: 'bottom-[12%] left-[-8%] w-20 sm:left-[3%] sm:w-28 md:w-32',
    duration: 21,
    delay: 0.6,
  },
  {
    src: '/photos/IMG_4075.JPG',
    alt: '',
    className: 'bottom-[10%] right-[-8%] w-24 sm:right-[2%] sm:w-32 md:w-36',
    duration: 18,
    delay: 2,
  },
  {
    src: '/photos/IMG_1220.jpg',
    alt: '',
    className: 'top-[28%] left-[-12%] w-20 sm:left-[-1%] sm:w-28 md:left-[0%] md:w-32',
    duration: 17,
    delay: 0.9,
  },
  {
    src: '/photos/IMG_1996.JPG',
    alt: '',
    className: 'top-[30%] right-[-12%] w-20 sm:right-[-1%] sm:w-28 md:right-[0%] md:w-32',
    duration: 20,
    delay: 1.8,
  },
  {
    src: '/photos/IMG_3767.JPG',
    alt: '',
    className: 'top-[52%] left-[-10%] hidden w-24 sm:left-[1%] sm:block sm:w-28 md:w-32',
    duration: 22,
    delay: 1.5,
  },
  {
    src: '/photos/IMG_0504.JPG',
    alt: '',
    className: 'top-[54%] right-[-10%] hidden w-24 sm:right-[1%] sm:block sm:w-28 md:w-32',
    duration: 15,
    delay: 0.3,
  },
  {
    src: '/photos/IMG_3896.JPG',
    alt: '',
    className: 'top-[2%] left-[18%] hidden w-20 sm:block md:left-[16%] md:w-24',
    duration: 23,
    delay: 1.1,
  },
  {
    src: '/photos/IMG_2780.jpg',
    alt: '',
    className: 'top-[3%] right-[16%] hidden w-20 sm:block md:right-[14%] md:w-24',
    duration: 18,
    delay: 2.4,
  },
  {
    src: '/photos/IMG_4405.JPG',
    alt: '',
    className: 'bottom-[2%] left-[16%] hidden w-20 md:block md:w-28',
    duration: 21,
    delay: 0.8,
  },
  {
    src: '/photos/IMG_2779.JPG',
    alt: '',
    className: 'bottom-[1%] right-[14%] hidden w-20 md:block md:w-28',
    duration: 19,
    delay: 1.6,
  },
  {
    src: '/photos/IMG_1201.JPG',
    alt: '',
    className: 'top-[18%] left-[8%] hidden w-16 lg:block lg:w-20',
    duration: 24,
    delay: 0.2,
  },
  {
    src: '/photos/IMG_3697.jpg',
    alt: '',
    className: 'top-[16%] right-[7%] hidden w-16 lg:block lg:w-20',
    duration: 16,
    delay: 2.1,
  },
]
