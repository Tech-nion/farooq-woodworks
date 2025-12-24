import { Search, MessageSquare, Hammer, Package } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Explore our curated collection of handcrafted pieces or find skilled artisans for custom work.",
  },
  {
    icon: MessageSquare,
    title: "Connect & Discuss",
    description: "Chat directly with craftsmen to discuss your vision, materials, and timeline.",
  },
  {
    icon: Hammer,
    title: "Craft & Create",
    description: "Watch your vision come to life with regular updates and transparent progress tracking.",
  },
  {
    icon: Package,
    title: "Receive & Enjoy",
    description: "Get your beautifully crafted piece delivered safely to your doorstep.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-accent/5">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2">
            From Vision to Reality
          </h2>
          <p className="text-muted-foreground mt-4">
            A simple, transparent process to get your dream woodwork piece.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              <div className="text-center">
                <div className="relative inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
