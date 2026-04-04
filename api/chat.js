export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const hfToken = process.env.HF_TOKEN;

        // ON PASSE SUR LLAMA 3.3 70B (Souvent plus nerveux)
        const response = await fetch(
            "https://api-inference.huggingface.co/models/meta-llama/Llama-3.3-70B-Instruct",
            {
                headers: { 
                    Authorization: `Bearer ${hfToken}`,
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${req.body.system_instruction.parts[0].text}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${req.body.contents[0].parts[0].text}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
                    parameters: {
                        max_new_tokens: 150, // On force une réponse courte pour gagner du temps
                        temperature: 0.7,
                        top_p: 0.9,
                        return_full_text: false
                    },
                    options: {
                        wait_for_model: true // Indispensable pour éviter le crash au réveil
                    }
                }),
            }
        );

        const data = await response.json();

        // Si Hugging Face est surchargé
        if (data.error) {
            return res.status(500).json({ error: "Hugging Face saturé", details: data.error });
        }

        // Récupération du texte (Llama renvoie parfois un tableau, parfois un objet)
        const text = Array.isArray(data) ? data[0].generated_text : data.generated_text;

        res.status(200).json({
            candidates: [{ content: { parts: [{ text: text || "Le videur t'ignore..." }] } }]
        });

    } catch (error) {
        res.status(500).json({ error: "Crash serveur", details: error.message });
    }
}
