'use server';

import { redirect } from 'next/navigation';
import {
  createCheckoutSession,
  createCustomerPortalSession,
  createPlanCheckoutSession
} from './stripe';
import { getPricingPlanCheckout } from './pricing-plans';
import { withTeam } from '@/lib/auth/middleware';

export const checkoutAction = withTeam(async (formData, team) => {
  const priceId = formData.get('priceId') as string;
  await createCheckoutSession({ team: team, priceId });
});

export const checkoutPricingPlanAction = withTeam(async (formData, team) => {
  const planSlug = formData.get('planSlug') as string;
  const plan = getPricingPlanCheckout(planSlug);
  if (!plan) {
    redirect('/pricing');
  }
  await createPlanCheckoutSession({
    team,
    productName: plan.productName,
    unitAmountCents: plan.unitAmountCents
  });
});

export const customerPortalAction = withTeam(async (_, team) => {
  const portalSession = await createCustomerPortalSession(team);
  redirect(portalSession.url);
});
