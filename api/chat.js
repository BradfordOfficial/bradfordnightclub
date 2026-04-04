export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const hfToken = process.env.HF_TOKEN;

        // RETOUR SUR QWEN 2.5 72B (L'URL QUI MARCHAIT)
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
            {
                headers: { 
                    Authorization: `Bearer ${hfToken}`,
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify({
                    // Format spécifique pour Qwen (ChatML)
                    inputs: `<|im_start|>system\n${req.body.system_instruction.parts[0].text}<|im_end|>\n<|im_start|>user\n${req.body.contents[0].parts[0].text}<|im_end|>\n<|im_start|>assistant\n`,
                    parameters: {
                        max_new_tokens: 100, // ON RESTE SUR 100 POUR LA VITESSE
                        temperature: 0.8,
                        top_p: 0.9,
                        return_full_text: false
                    },
                    options: {
                        wait_for_model: true
                    }
                }),
            }
        );

        const data = await response.json();

        // Gestion du chargement (Le 72B est une baleine à réveiller)
        if (data.error && data.error.includes("currently loading")) {
            return res.status(503).json({ 
                error: "Bradford arrive...", 
                details: "Le modèle est en train de charger sur Hugging Face. Réessaie dans 15-20 sec." 
            });
        }

        if (data.error) {
            return res.status(500).json({ error: "HF Erreur", details: data.error });
        }

        // Qwen renvoie souvent un tableau [ { generated_text: "..." } ]
        const text = Array.isArray(data) ? data[0].generated_text : data.generated_text;

        res.status(200).json({
            candidates: [{
                content: {
                    parts: [{ text: text || "Bradford te regarde de haut sans rien dire..." }]
                }
            }]
        });

    } catch (error) {
        res.status(500).json({ error: "Crash serveur", details: error.message });
    }
}
