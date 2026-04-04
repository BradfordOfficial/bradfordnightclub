export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        // Sécurité 1 : On nettoie la clé de tout caractère invisible (Espaces, retours à la ligne)
        const groqApiKey = process.env.API_KEY ? process.env.API_KEY.replace(/[^a-zA-Z0-9_-]/g, '') : null;

        if (!groqApiKey) {
            return res.status(500).json({ error: "Clé API_KEY manquante sur Vercel" });
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            headers: {
                "Authorization": `Bearer ${groqApiKey}`,
                // Sécurité 2 : On force l'UTF-8 pour que les accents passent comme une lettre à la poste
                "Content-Type": "application/json; charset=utf-8"
            },
            method: "POST",
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: req.body.system_instruction.parts[0].text
                    },
                    {
                        role: "user",
                        content: req.body.contents[req.body.contents.length - 1].parts[0].text
                    }
                ],
                max_tokens: 200,
                temperature: 0.8
            })
        });

        // On vérifie si la réponse est ok
        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ error: "Erreur Groq", details: errorText });
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || "Bradford ne répond pas...";

        res.status(200).json({
            candidates: [{
                content: {
                    parts: [{ text: text }]
                }
            }]
        });

    } catch (error) {
        // Si ça bug encore ici, c'est que le problème vient du format du JSON reçu
        res.status(500).json({ 
            error: "Erreur Bradford", 
            details: error.message 
        });
    }
}
