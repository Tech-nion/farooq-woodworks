import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, prompt, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = prompt;

    switch (type) {
      case "product-description":
        systemPrompt = `You are an expert woodworking product copywriter. Generate compelling, detailed product descriptions for handcrafted wooden furniture and items. Focus on craftsmanship, materials, and unique features. Keep descriptions concise but engaging (2-3 paragraphs).`;
        userPrompt = `Generate a product description for: ${prompt}. Context: ${context || "Handcrafted wooden item"}`;
        break;
      case "recommendations":
        systemPrompt = `You are a helpful furniture consultant for a woodworking business. Based on customer needs, recommend suitable products or services. Be friendly and knowledgeable about wood types, finishes, and customization options.`;
        userPrompt = `Customer query: ${prompt}. Available categories: Doors, Kitchen Cabinets, Tables, Study Tables, Sleeping Carts, Wooden Decors. Suggest 2-3 specific recommendations with brief explanations.`;
        break;
      case "custom-quote":
        systemPrompt = `You are a woodworking project estimator. Help customers understand what goes into custom furniture projects. Provide helpful information about materials, timeframes, and considerations for their project.`;
        userPrompt = `Customer project request: ${prompt}. Provide helpful insights about this type of project, including key considerations, typical materials, and general guidance.`;
        break;
      default:
        systemPrompt = `You are a helpful AI assistant for a woodworking and furniture business. Answer questions about woodworking, furniture care, customization options, and help customers with their inquiries.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("AI assistant error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
