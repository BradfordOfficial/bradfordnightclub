export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        // ON APPELLE LE NOM EXACT QUE TU AS MIS SUR VERCEL
        const groqApiKey = process.env.API_KEY;

        if (!groqApiKey) {
            return res.status(500).json({ error: "Clé API_KEY introuvable sur Vercel" });
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            headers: {
                "Authorization": `Bearer ${groqApiKey}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                model: "llama-3.3-70b-specdec",
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
                max_tokens: 1000,
                temperature: 0.8
            })
        });

        const data = await response.json();

        // Si Groq renvoie une erreur (clé invalide, modèle saturé, etc.)
        if (data.error) {
            return res.status(500).json({ 
                error: "Erreur Groq", 
                details: data.error.message || data.error 
            });
        }

        // Extraction propre du texte
        const text = data.choices && data.choices[0]?.message?.content 
                     ? data.choices[0].message.content 
                     : "Bradford te regarde de travers sans répondre...";

        // Envoi au front-end
        res.status(200).json({
            candidates: [{
                content: {
                    parts: [{ text: text }]
                }
            }]
        });

    } catch (error) {
        res.status(500).json({ 
            error: "Bradford a eu un court-circuit", 
            details: error.message 
        });
    }
}
