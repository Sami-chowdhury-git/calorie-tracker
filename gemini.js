/* ═══════════════════════════════════════════ */
/* GEMINI — Google Gemini AI Integration       */
/* ═══════════════════════════════════════════ */

window.Gemini = {
  API_KEY: 'AIzaSyA_3D59jbIQpQm9MTcUF2_LVTt_pc9l4Xk',
  MODEL: 'gemini-2.5-flash',

  _endpoint() {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.MODEL}:generateContent?key=${this.API_KEY}`;
  },

  _normalize(item) {
    const qty = item.quantity || 1;
    return {
      food: {
        name: item.name || 'Unknown Food',
        aliases: [],
        category: 'ai-detected',
        calories: Math.round((item.calories || 0) / qty),
        protein: parseFloat(((item.protein || 0) / qty).toFixed(1)),
        carbs: parseFloat(((item.carbs || 0) / qty).toFixed(1)),
        fat: parseFloat(((item.fat || 0) / qty).toFixed(1)),
        serving: item.serving || '1 serving',
        unit: 'serving',
      },
      ingredients: Array.isArray(item.ingredients)
        ? item.ingredients.map(ing => ({
            name: ing.name || 'Unknown',
            quantity: ing.quantity || 1,
            calories: Math.round(ing.calories || 0),
            protein: parseFloat((ing.protein || 0).toFixed(1)),
            carbs: parseFloat((ing.carbs || 0).toFixed(1)),
            fat: parseFloat((ing.fat || 0).toFixed(1)),
            serving: ing.serving || '1 serving',
          }))
        : [],
      quantity: qty,
      totalCalories: Math.round(item.calories || 0),
      totalProtein: parseFloat((item.protein || 0).toFixed(1)),
      totalCarbs: parseFloat((item.carbs || 0).toFixed(1)),
      totalFat: parseFloat((item.fat || 0).toFixed(1)),
    };
  },

  _parseJSON(text) {
    // Strip markdown fences if model wraps in ```json ... ```
    const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    return JSON.parse(cleaned);
  },

  /**
   * Analyze a text meal description using Gemini.
   * Returns an array of parsed food items with full nutritional data — no database lookup.
   */
  async analyzeText(mealDescription) {
    const prompt = `You are a certified nutrition expert. Your ONLY job is to analyze the meal description below and calculate accurate nutritional values entirely from your own knowledge. Do NOT reference any external database. Calculate the values yourself.

Meal: "${mealDescription}"

Return ONLY a valid JSON array. No markdown, no explanation, no code fences. Each element:
[
  {
    "name": "Food item name",
    "quantity": 1,
    "calories": 150,
    "protein": 10.0,
    "carbs": 20.0,
    "fat": 5.0,
    "serving": "1 medium"
  }
]

Rules:
- calories/protein/carbs/fat are the TOTAL for the stated quantity (not per unit).
- Parse quantity from the text (e.g. "3 eggs" → quantity: 3).
- Use USDA-based nutritional values calculated in your own reasoning.
- Calories must be a whole number. Macros can have 1 decimal place.
- Return at least 1 item.`;

    try {
      const res = await fetch(this._endpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 2048 },
        }),
      });

      if (!res.ok) {
        console.error('Gemini text error:', res.status, await res.text());
        return null;
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) return null;

      const items = this._parseJSON(text);
      if (!Array.isArray(items) || items.length === 0) return null;
      return items.map(i => this._normalize(i));
    } catch (err) {
      console.error('Gemini text analysis failed:', err);
      return null;
    }
  },

  /**
   * Analyze a food image using Gemini Vision.
   * Nutritional values come ENTIRELY from Gemini's own knowledge — no database matching.
   */
  async analyzeImage(file) {
    try {
      const base64 = await this._fileToBase64(file);
      const mimeType = file.type || 'image/jpeg';

      const prompt = `You are a certified nutrition expert with computer vision ability. Analyze this food image carefully.

IMPORTANT: Calculate ALL nutritional values yourself from your own knowledge of food science and USDA data. Do NOT say you cannot calculate values — always provide your best expert estimate.

Step 1 — Identify what you see. If there is NO food in the image, return exactly:
[{"error": "No food detected in this image. Please try a food photo."}]

Step 2 — For each food or dish you identify, return a JSON array like this:
[
  {
    "name": "Name of the dish or food (e.g. Chicken Biryani, Cheeseburger)",
    "quantity": 1,
    "calories": 650,
    "protein": 35.0,
    "carbs": 70.0,
    "fat": 22.0,
    "serving": "1 plate (~400g)",
    "ingredients": [
      {
        "name": "Basmati Rice",
        "quantity": 1,
        "calories": 260,
        "protein": 5.0,
        "carbs": 55.0,
        "fat": 1.0,
        "serving": "1.5 cups cooked"
      },
      {
        "name": "Chicken",
        "quantity": 1,
        "calories": 250,
        "protein": 28.0,
        "carbs": 0.0,
        "fat": 14.0,
        "serving": "150g"
      }
    ]
  }
]

Rules:
- Identify the main DISH name (e.g. "Chicken Biryani", "Cheeseburger", "Margherita Pizza") — not individual ingredients as top-level items.
- Provide ingredient breakdown in the "ingredients" array for complex dishes. For simple foods (apple, banana) the array can be empty [].
- Distinct side dishes (fries, drink) should be separate top-level items.
- Estimate portion size visually. A typical restaurant plate ≈ 400-600g.
- calories/protein/carbs/fat for each top-level item = TOTAL for the full estimated portion.
- calories/protein/carbs/fat for each ingredient = that ingredient's contribution within the dish.
- Calories whole number, macros 1 decimal place.
- Return ONLY the JSON array. No markdown, no explanation.`;

      const res = await fetch(this._endpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inlineData: { mimeType, data: base64 } },
            ],
          }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 4096 },
        }),
      });

      if (!res.ok) {
        console.error('Gemini Vision error:', res.status, await res.text());
        return null;
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) return null;

      const items = this._parseJSON(text);
      if (!Array.isArray(items) || items.length === 0) return null;

      // Pass through error objects untouched
      if (items[0]?.error) return items;

      return items.map(i => this._normalize(i));
    } catch (err) {
      console.error('Gemini image analysis failed:', err);
      return null;
    }
  },

  /**
   * Convert a File to base64 string (without the data URI prefix).
   */
  _fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};
