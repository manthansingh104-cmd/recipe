const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function getRecipeFromChefClaude(ingredientsArr) {
    try {
        const prompt = `
You are a professional chef.

Create a detailed recipe using these ingredients:
${ingredientsArr.join(", ")}

Return the recipe in Markdown format with:
- Title
- Ingredients list
- Steps
- Cooking tips
`;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();

        console.log("Groq Response:", data);

        if (!response.ok) {
            throw new Error(
                data?.error?.message || "Failed to generate recipe"
            );
        }

        return data.choices[0].message.content;
    } catch (error) {
        console.error("Groq Error:", error);
        return `Error: ${error.message}`;
    }
}