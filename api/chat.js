export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const hfToken = process.env.HF_TOKEN;

        // ON PASSE SUR LE NOUVEAU ROUTEUR (Indispensable pour le 70B en 2026)
                const response = await fetch(
            "https://router.huggingface.co/models/meta-llama/Llama-3.3-70B-Instruct",
            {
                headers: { 
                    Authorization: `Bearer ${hfToken}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${req.body.system_instruction.parts[0].text}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${req.body.contents[0].parts[0].text}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
                    parameters: {
                        max_new_tokens: 150, // On réduit à 150 pour gagner en vitesse
                        temperature: 0.7,
                        return_full_text: false
                    },
                    options: {
                        wait_for_model: true
                    }
                }),
            }
        );


        const data = await response.json();

        // Si le modèle charge encore (le 70B est lourd)
        if (data.error && data.error.includes("currently loading")) {
            return res.status(503).json({ 
                error: "Le videur met ses gants...", 
                details: "Le 70B est en train de chauffer, réessaie dans 20 secondes." 
            });
        }

        if (data.error) {
            return res.status(500).json({ error: "HF Erreur", details: data.error });
        }

        // Llama 3.3 via Router renvoie souvent un tableau [ { generated_text: "..." } ]
        const text = Array.isArray(data) ? data[0].generated_text : data.generated_text;

        res.status(200).json({
            candidates: [{
                content: {
                    parts: [{ text: text || "Bradford est muet... (Pas de réponse)" }]
                }
            }]
        });

    } catch (error) {
        res.status(500).json({ error: "Crash serveur", details: error.message });
    }
}
