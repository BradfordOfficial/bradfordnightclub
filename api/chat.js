export default async function handler(req, res) {
    // 1. Configuration des headers pour autoriser ton site
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Gérer la requête de pré-vérification (CORS)
    if (req.method === 'OPTIONS') return res.status(200).end();

    // Vérifier que c'est bien une requête POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        // CHANGEMENT CRUCIAL : Passage de /v1/ à /v1beta/ pour Gemini 2.0
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        // 2. Appel à l'API Google avec reconstruction propre du JSON
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: req.body.contents,
                system_instruction: req.body.system_instruction,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000,
                    topP: 0.95
                }
            })
        });

        const data = await response.json();

        // 3. Renvoi de la réponse de l'IA à ton chatbot
        res.status(200).json(data);

    } catch (error) {
        console.error("Erreur Backend Bradford:", error);
        res.status(500).json({ error: "Erreur serveur interne" });
    }
}
