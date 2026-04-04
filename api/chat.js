export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        // On utilise la version v1beta pour avoir accès au system_instruction
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // STRUCTURE CORRIGÉE ICI
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
            console.error("Erreur Google API:", data.error);
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Le serveur du Bradford a eu un petit vertige." });
    }
}
