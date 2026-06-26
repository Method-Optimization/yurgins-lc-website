/** Verbatim customer reviews from the current site / Yelp / Angi. Do not edit wording. */
export type Testimonial = { quote: string; author: string; short?: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      'This was by far my best experience with a landscaper… come home and see your house edged perfectly and looking crispier than all the neighbors! I’d recommend Yurgins to everyone I know in South Jersey — they are quick, clean and professional!',
    short:
      'This was by far my best experience with a landscaper… come home and see your house edged perfectly and looking crispier than all the neighbors.',
    author: 'E.S.',
  },
  {
    quote:
      'Fantastic service. Always timely and does a great job. His trimming skills are of the best and my home never looked so good. I highly recommend Yurgin’s for your lawn care.',
    short: 'Always timely and does a great job… my home never looked so good.',
    author: 'Anna F.',
  },
  {
    quote:
      'Yurgin’s Lawn Care did an outstanding job with my lawn. They were meticulous and professional. I would highly recommend their services to anyone.',
    short: 'Meticulous and professional. I would highly recommend their services to anyone.',
    author: 'Bryant D.',
  },
  {
    quote:
      'I called for a mulch quote. I got a fast response, quote and install. Looks great. I’ll definitely use Yurgin’s again.',
    author: 'Jim G.',
  },
  {
    quote:
      'Yurgin’s Lawn Care took care of a nightmare weeding job at my house. Brett did an amazing job and left us very pleased! Highly recommend!',
    author: 'Lea F.',
  },
  {
    quote:
      'They provide lawn care and maintenance at our office and I must say, all of the guys are very professional and their attention to detail is second to none. They even go above and beyond the normal service.',
    author: 'Jillian N.',
  },
  {
    quote: 'Awesome service and Brett is amazing to deal with. Highly recommended this company.',
    author: 'Michael Y.',
  },
];
