import { defineCollection, z } from 'astro:content';

// Schemas réutilisables
const HeroSchema = z.object({
  eyebrow: z.string(),
  h1: z.string(),
  subtitle: z.string(),
  ctaText: z.string(),
  ctaUrl: z.string(),
  reassurance: z.string(),
  proofBadge: z.string(),
  vslSrc: z.string().optional(),
  vslPoster: z.string().optional(),
});

const PainCardSchema = z.object({
  icon: z.string(), // nom de l'icône Lucide
  title: z.string(),
  description: z.string(),
  highlightPhrase: z.string().optional(),
});

const PivotSchema = z.object({
  line1: z.string(),
  line2: z.string(),
  supportText: z.string(),
  transitionTitle: z.string(),
});

const BulletSchema = z.object({
  label: z.string(),
  text: z.string(),
});

const SolutionItemSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  bullets: z.array(BulletSchema),
  microCta: z.string().optional(),
  videoSrc: z.string().optional(),
});

const ReviewCardSchema = z.object({
  name: z.string(),
  context: z.string(),
  avatar: z.string().optional(), // chemin vers image
  stars: z.number().optional(),
  beforeLabel: z.string().optional(),
  afterLabel: z.string().optional(),
  beforeQuote: z.string(),
  afterQuote: z.string().optional(),
});

const TestimonialItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const PricingFeatureSchema = z.object({
  text: z.string(),
  included: z.boolean(),
});

const PricingPlanSchema = z.object({
  id: z.enum(['core', 'growth', 'empire']),
  badge: z.string(),
  name: z.string(),
  price: z.string(),
  priceNote: z.string().optional(),
  description: z.string().optional(),
  features: z.array(PricingFeatureSchema),
  ctaText: z.string(),
  ctaUrl: z.string(),
  ctaDataAttr: z.string().optional(),
  ctaSecondaryText: z.string().optional(),
  ctaSecondaryUrl: z.string().optional(),
  ctaSecondaryDataAttr: z.string().optional(),
  isCurrent: z.boolean().default(false),
  isSoon: z.boolean().default(false),
});

const FAQItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const LandingSchema = z.object({
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  hero: HeroSchema,
  painSection: z.object({
    title: z.string(),
    cards: z.array(PainCardSchema),
    bridgeText: z.string(),
  }),
  pivot: PivotSchema,
  solution: z.object({
    introTitle: z.string(),
    items: z.array(SolutionItemSchema),
  }),
  reviews: z.object({
    title: z.string(),
    subtitle: z.string(),
    trust: z.array(z.string()),
    cards: z.array(ReviewCardSchema),
    transitionText: z.string().optional(),
  }),
  testimonial: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      qa: z.array(TestimonialItemSchema),
      context: z.string().optional(),
    })
    .optional(),
  pricing: z.object({
    title: z.string(),
    subtitle: z.string(),
    plans: z.array(PricingPlanSchema),
    guarantees: z.array(z.string()),
    transitionText: z.string().optional(),
  }),
  faq: z.object({
    title: z.string(),
    subtitle: z.string(),
    items: z.array(FAQItemSchema),
    contact: z.string(),
  }),
});

const landings = defineCollection({
  type: 'data',
  schema: LandingSchema,
});

export const collections = { landings };
