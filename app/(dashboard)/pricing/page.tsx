import { Check } from 'lucide-react';
import { checkoutPricingPlanAction } from '@/lib/payments/actions';
import { PRICING_PLANS } from '@/lib/payments/pricing-plans';

export default function PricingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
        {PRICING_PLANS.map((plan) => (
          <PricingCard key={plan.slug} plan={plan} />
        ))}
      </div>
    </main>
  );
}

function PricingCard({ plan }: { plan: (typeof PRICING_PLANS)[number] }) {
  return (
    <div className="pt-6 flex flex-col">
      <h2 className="text-2xl font-medium text-gray-900 mb-4">{plan.name}</h2>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p>&nbsp;</p>
          <p className="text-gray-900">{plan.everyTwoWeeks}</p>
          <p className="text-gray-900">every 2 weeks</p>
        </div>
        <div>
          <p className="text-gray-900">Total amount</p>
          <p className="text-gray-900">{plan.yearlyTotal}</p>
          <p className="text-gray-900">per year</p>
        </div>
      </div>
      <p className="text-base text-gray-500 mb-4">{plan.description}</p>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <form action={checkoutPricingPlanAction} className="mt-auto">
        <input type="hidden" name="planSlug" value={plan.slug} />
        <button
          type="submit"
          className="block w-fit min-w-56 rounded-full bg-black px-8 py-3 text-center text-base font-medium text-white hover:bg-gray-900"
        >
          Continue with this
        </button>
      </form>
    </div>
  );
}
