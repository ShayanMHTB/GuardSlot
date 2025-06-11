// app/(public)/pricing/page.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, ArrowRight, Star, Zap, Building } from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individual practitioners and small businesses',
      icon: Zap,
      price: {
        monthly: 29,
        annual: 24,
      },
      features: [
        'Up to 100 bookings/month',
        'Payment authorization',
        'Basic calendar integration',
        'Email notifications',
        'Mobile-friendly booking page',
        'Basic analytics',
        'Email support',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses with multiple staff',
      icon: Star,
      price: {
        monthly: 79,
        annual: 65,
      },
      features: [
        'Up to 500 bookings/month',
        'Everything in Starter',
        'Multi-staff scheduling',
        'Custom branding',
        'Advanced analytics',
        'SMS notifications',
        'Priority support',
        'API access',
        'Custom booking fields',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      icon: Building,
      price: {
        monthly: 199,
        annual: 165,
      },
      features: [
        'Unlimited bookings',
        'Everything in Professional',
        'White-label solution',
        'Advanced integrations',
        'Custom workflows',
        'Dedicated account manager',
        'Phone support',
        'SLA guarantee',
        'Custom reporting',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'How does the payment authorization work?',
      answer:
        'When customers book, we securely authorize their payment method without charging them. If they attend the appointment, nothing happens. If they no-show, you can choose to charge a penalty fee.',
    },
    {
      question: 'What happens during the free trial?',
      answer:
        'You get full access to all features in your chosen plan for 14 days. No credit card required to start. You can process real bookings and see the results immediately.',
    },
    {
      question: 'Can I change plans anytime?',
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
    },
    {
      question: 'What integrations do you support?',
      answer:
        'We integrate with popular calendar apps (Google Calendar, Outlook), payment processors (Stripe), and can connect to most scheduling software via our API.',
    },
    {
      question: 'Is there a setup fee?',
      answer:
        'No setup fees ever. You only pay the monthly or annual subscription fee. We believe in transparent, simple pricing.',
    },
    {
      question: 'What if I have more bookings than my plan allows?',
      answer:
        "We'll automatically upgrade you to the next plan tier for that month. You'll receive a notification before any charges. No bookings are ever blocked.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
              Choose the Perfect Plan for{' '}
              <span className="text-primary">Your Business</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Start with a 14-day free trial. No credit card required. Cancel
              anytime. All plans include our core no-show protection.
            </p>

            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className={`text-sm ${
                  !isAnnual ? 'font-semibold' : 'text-muted-foreground'
                }`}
              >
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <span
                className={`text-sm ${
                  isAnnual ? 'font-semibold' : 'text-muted-foreground'
                }`}
              >
                Annual
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="ml-2">
                  Save 20%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.price.annual : plan.price.monthly;

              return (
                <Card
                  key={index}
                  className={`relative border-0 shadow-lg hover:shadow-xl transition-shadow ${
                    plan.popular ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-8">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>

                    <div className="mt-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">${price}</span>
                        <span className="text-muted-foreground ml-1">
                          /{isAnnual ? 'month' : 'month'}
                        </span>
                      </div>
                      {isAnnual && (
                        <div className="text-sm text-muted-foreground mt-1">
                          Billed annually (${price * 12})
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full"
                      variant={plan.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <Link
                        href={
                          plan.name === 'Enterprise' ? '/contact' : '/register'
                        }
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">All Plans Include</h2>
            <p className="text-xl text-muted-foreground">
              Core features that protect your business from day one
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">No-Show Protection</h3>
              <p className="text-sm text-muted-foreground">
                Secure payment authorization ensures you&apos;re compensated for
                missed appointments
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Instant Setup</h3>
              <p className="text-sm text-muted-foreground">
                Get your booking link in under 5 minutes with our intuitive
                setup process
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Mobile Optimized</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful booking experience that works perfectly on all devices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about GuardSlot pricing
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {faq.answer}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Stop Losing Money?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your free trial today and see how GuardSlot can transform your
            business in just 14 days
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
          <p className="text-sm mt-4 opacity-75">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
