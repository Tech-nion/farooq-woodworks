import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { Sparkles, MessageSquare, Lightbulb, Palette } from "lucide-react";

const AIFeatures = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">AI-Powered Features</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the power of AI to help you find the perfect furniture, 
              generate product descriptions, and get insights for custom projects.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-lg border bg-card text-card-foreground">
              <MessageSquare className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Describe your needs and get personalized product recommendations 
                based on your preferences, space, and style.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground">
              <Lightbulb className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Product Descriptions</h3>
              <p className="text-sm text-muted-foreground">
                Generate compelling, professional product descriptions 
                that highlight craftsmanship and unique features.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground">
              <Palette className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Project Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get helpful information about custom projects including 
                materials, considerations, and general guidance.
              </p>
            </div>
          </div>

          {/* AI Assistant */}
          <AIAssistant />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIFeatures;
