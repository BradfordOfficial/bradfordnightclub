export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const groqApiKey = process.env.GROQ_API_KEY;

        // ON APPELLE L'API DE GROQ (Ultra rapide, adieu les 10s de timeout)
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            headers: {
                "Authorization": `Bearer ${groqApiKey}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                model: "llama-3.3-70b-specdec", // Le nom exact du 70B chez Groq
                messages: [
                    {
                        role: "system",
                        content: req.body.system_instruction.parts[0].text // Ton gros script
                    },
                    {
                        role: "user",
                        content: req.body.contents[req.body.contents.length - 1].parts[0].text
                    }
                ],
                max_tokens: 1000,
                temperature: 0.8
            })
        });

                const data = await response.json();

        // Si Groq renvoie une erreur directe
        if (data.error) {
            return res.status(500).json({ error: "Erreur Groq", details: data.error.message || data.error });
        }

        // LA CORRECTION EST ICI : On va chercher le contenu du message
        // Groq (OpenAI style) renvoie : data.choices[0].message.content
        const text = data.choices && data.choices[0]?.message?.content 
                     ? data.choices[0].message.content 
                     : "Le videur reste muet...";

        // On renvoie le format que ton interface attend
        res.status(200).json({
            candidates: [{
                content: {
                    parts: [{ text: text }] // On s'assure que 'text' est bien une chaîne de caractères
                }
            }]
        });


    } catch (error) {
        res.status(500).json({ error: "Bradford a eu un court-circuit", details: error.message });
    }
}
