export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        // PASSAGE AU MODÈLE 2.0 FLASH (Version stable pour l'API v1beta)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: req.body.system_instruction, 
                contents: req.body.contents,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000, // Le 2.0 gère mieux les réponses détaillées
                    topP: 0.95
                }
            })
        });

        const data = await response.json();
        
        if (data.error) {
            console.error("Erreur Google API:", data.error);
            // On renvoie l'erreur précise pour savoir si c'est encore un quota ou autre chose
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Le serveur du Bradford a eu un petit vertige." });
    }
}
