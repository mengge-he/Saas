export type PricingPlan = {
  slug: string;
  name: string;
  everyTwoWeeks: string;
  yearlyTotal: string;
  description: string;
  features: string[];
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    slug: 'econo',
    name: 'ECONO',
    everyTwoWeeks: '$10.99',
    yearlyTotal: '$285.75',
    description: 'Everything included in the Weekend option, plus:',
    features: [
      'Access to your local gym 7 days a week.',     
    ],
  },
  {
    slug: 'platinum',
    name: 'PLATNIUM',
    everyTwoWeeks: '$10.99',
    yearlyTotal: '$285.75',
    description: 'Everything included in the Weekend option, plus:',
    features: [
      'Unlimited access to all gyms.',
      '24/7 access*.',
      'Access to the Recovery Platinum Zone.',
      'Access to the Platinum Workout Zone*',
      'Share your membership card.',
    ],
  },
  {
    slug: 'extra',
    name: 'EXTRA(Group Classes)',
    everyTwoWeeks: '$10.99',
    yearlyTotal: '$285.75',
    description: 'Everything included in the Weekend option, plus:',
    features: [
      'Unlimited group classes with coach.',
      'Unlimited access to Zumba classes.',
    ],
  },
];

function yearlyLabelToCents(label: string): number {
  const match = label.trim().match(/\$?([\d,]+(?:\.\d+)?)/);
  if (!match) {
    throw new Error(`Invalid yearly total label: ${label}`);
  }
  return Math.round(parseFloat(match[1].replace(/,/g, '')) * 100);
}

export function getPricingPlanCheckout(slug: string) {
  const plan = PRICING_PLANS.find((p) => p.slug === slug);
  if (!plan) {
    return null;
  }
  return {
    productName: plan.name,
    unitAmountCents: yearlyLabelToCents(plan.yearlyTotal),
  };
}
