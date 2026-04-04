export default async function handler(req, res) {
    // On autorise ton site à appeler l'API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const hfToken = process.env.HF_TOKEN; // Ta clé Hugging Face configurée sur Vercel

        // On appelle le cerveau de Qwen 2.5 72B
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct",
            {
                headers: { 
                    Authorization: `Bearer ${hfToken}`,
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify({
                    // On injecte TON gros script système et le message de l'utilisateur
                    inputs: `<|im_start|>system\n${req.body.system_instruction.parts[0].text}<|im_end|>\n<|im_start|>user\n${req.body.contents[req.body.contents.length - 1].parts[0].text}<|im_end|>\n<|im_start|>assistant`,
                    parameters: {
                        max_new_tokens: 1000,
                        temperature: 0.8, // Pour que le Bradford ait du répondant
                        return_full_text: false
                    }
                }),
            }
        );

        const data = await response.json();

        // Si le modèle est en train de démarrer (fréquent sur le gratuit)
        if (data.error && data.error.includes("currently loading")) {
            return res.status(503).json({ 
                error: "Le videur met ses lunettes noires...",
                details: "Le modèle charge, réessaie dans 20 secondes." 
            });
        }

        // On récupère le texte généré
        const text = data[0]?.generated_text || data.generated_text;

        // On renvoie le format EXACT que ton interface attend déjà
        res.status(200).json({
            candidates: [{
                content: {
                    parts: [{ text: text }]
                }
            }]
        });

    } catch (error) {
        console.error("Erreur Bradford:", error);
        res.status(500).json({ error: "Le cerveau de l'IA a grillé." });
    }
}
