export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        // ON PASSE EN v1 (STABLE) avec le NOM COMPLET
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // Note : En v1, on met parfois les system_instruction dans contents 
                // mais la structure ci-dessous est la plus standard
                system_instruction: req.body.system_instruction, 
                contents: req.body.contents,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 800
                }
            })
        });

        const data = await response.json();
        
        if (data.error) {
            console.error("Erreur Google API détaillée:", JSON.stringify(data.error, null, 2));
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("ERREUR SERVEUR:", error);
        res.status(500).json({ error: "Le Bradford est en maintenance technique." });
    }
}
