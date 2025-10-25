const OpenAI = require("openai");

class AIService {
  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    } else {
      this.openai = null;
    }
  }

  async categorizeComplaint(title, description) {
    try {
      const prompt = `Categorize this university complaint into one of these categories: Academic, Facilities, Administration, IT Services, Library, Dining, Housing, Transportation, Safety, Other.

Title: ${title}
Description: ${description}

Return only the category name.`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
        temperature: 0.3,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error("AI Categorization Error:", error);
      return "Other";
    }
  }

  async analyzeSentiment(description) {
    try {
      const prompt = `Analyze the sentiment of this complaint description. Return only: Positive, Neutral, or Negative.

Description: ${description}`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 20,
        temperature: 0.3,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error("AI Sentiment Analysis Error:", error);
      return "Neutral";
    }
  }

  async generateTags(title, description) {
    try {
      const prompt = `Generate 3-5 relevant tags for this university complaint. Return as comma-separated values.

Title: ${title}
Description: ${description}

Tags:`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
        temperature: 0.5,
      });

      const tags = response.choices[0].message.content
        .trim()
        .split(",")
        .map((tag) => tag.trim());
      return tags.slice(0, 5); // Limit to 5 tags
    } catch (error) {
      console.error("AI Tag Generation Error:", error);
      return [];
    }
  }

  async calculatePriority(title, description, urgency) {
    try {
      const prompt = `Rate the priority of this complaint on a scale of 1-5 (1=lowest, 5=highest) based on title, description, and urgency level.

Title: ${title}
Description: ${description}
Urgency: ${urgency}

Return only the number (1-5).`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 10,
        temperature: 0.3,
      });

      const priority = parseInt(response.choices[0].message.content.trim());
      return Math.max(1, Math.min(5, priority)); // Ensure 1-5 range
    } catch (error) {
      console.error("AI Priority Calculation Error:", error);
      // Fallback based on urgency
      const urgencyMap = { Low: 2, Medium: 3, High: 4, Critical: 5 };
      return urgencyMap[urgency] || 3;
    }
  }

  async suggestResolution(description, category) {
    try {
      const prompt = `Suggest a brief resolution approach for this ${category} complaint:

${description}

Keep it under 100 words.`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error("AI Resolution Suggestion Error:", error);
      return "Please review and address this complaint promptly.";
    }
  }
}

module.exports = new AIService();
