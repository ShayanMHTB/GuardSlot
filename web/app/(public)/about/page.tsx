// app/(public)/about/page.tsx
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  Heart,
  Lightbulb,
  Users,
  ArrowRight,
  CheckCircle,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description:
        "We're on a mission to eliminate the $150 billion lost annually to no-shows across service industries",
    },
    {
      icon: Heart,
      title: 'Customer-Centric',
      description:
        'Every feature we build starts with understanding the real challenges service providers face daily',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description:
        'We combine cutting-edge technology with simple, intuitive design that anyone can use',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        "We're building a community of successful service providers who support each other's growth",
    },
  ];

  const milestones = [
    {
      year: '2024',
      title: 'The Problem',
      description:
        'After losing $50,000 to no-shows in his dental practice, our founder decided something had to change.',
    },
    {
      year: 'Early 2025',
      title: 'The Solution',
      description:
        'We launched our MVP with payment authorization technology, immediately reducing no-shows by 85%.',
    },
    {
      year: 'Mid 2025',
      title: 'Growing Impact',
      description:
        '2,500+ businesses joined our platform, collectively saving millions in lost revenue.',
    },
    {
      year: 'Today',
      title: 'The Future',
      description:
        "We're expanding globally, adding AI-powered features, and building the future of appointments.",
    },
  ];

  const stats = [
    { label: 'Revenue Protected', value: '$50M+', icon: TrendingUp },
    { label: 'Businesses Served', value: '2,500+', icon: Users },
    { label: 'No-Show Reduction', value: '87%', icon: CheckCircle },
    { label: 'Countries', value: '25+', icon: Calendar },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Our Story
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
              We&apos;re Fighting the{' '}
              <span className="text-primary">$150 Billion Problem</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Every year, service providers lose $150 billion globally to
              no-shows. We built GuardSlot to solve this massive problem with a
              simple, elegant solution that puts the power back in the hands of
              business owners.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-muted-foreground">
                Empowering service providers with technology that protects their
                time, revenue, and peace of mind
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  The Problem We Solve
                </h3>
                <p className="text-muted-foreground mb-6">
                  Service providers across industries—from hair salons to
                  medical practices—lose an average of 20-30% of their revenue
                  to no-shows. Traditional booking systems offer no protection,
                  leaving businesses vulnerable to lost time slots that
                  can&apos;t be recovered.
                </p>
                <p className="text-muted-foreground">
                  We believe every business owner deserves to be compensated for
                  their time and expertise, regardless of whether a customer
                  shows up or not.
                </p>
              </div>
              <div className="bg-primary/10 p-8 rounded-lg">
                <h4 className="font-semibold mb-4">Industry Impact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm">
                      Healthcare: $150B lost annually to no-shows
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm">
                      Beauty & Wellness: 25% average no-show rate
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm">
                      Professional Services: 30% revenue loss
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm">
                      Fitness & Training: 40% appointment abandonment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              From a personal pain point to a global solution
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0
                        ? 'md:text-right md:pr-8'
                        : 'md:text-left md:pl-8'
                    }`}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{milestone.year}</Badge>
                          <CardTitle className="text-xl">
                            {milestone.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {milestone.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background md:left-1/2 md:transform md:-translate-x-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardHeader className="pb-4">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Our Vision for the Future
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We envision a world where service providers never have to worry
              about no-shows again. Where every appointment is respected, every
              business owner is fairly compensated, and customer relationships
              are built on mutual trust and accountability.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2025</div>
                <div className="opacity-90">
                  Global expansion to 50+ countries
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2026</div>
                <div className="opacity-90">
                  AI-powered booking optimization
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2027</div>
                <div className="opacity-90">Industry-specific solutions</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Join Our Mission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/careers">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Work With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Protect Your Revenue?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of service providers who&apos;ve eliminated no-shows
            and grown their businesses with GuardSlot
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
