export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const hfToken = process.env.HF_TOKEN;

        // NOUVELLE URL OBLIGATOIRE : router.huggingface.co
        const response = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Llama-3.3-70B-Instruct",
    {
        headers: { 
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/json",
            "x-use-cache": "false" // On force pour éviter les vieux résultats
        },
                method: "POST",
                body: JSON.stringify({
                    inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${req.body.system_instruction.parts[0].text}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${req.body.contents[0].parts[0].text}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
                    parameters: {
                        max_new_tokens: 200,
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

        // Gestion d'erreur si le nouveau routeur renvoie un truc bizarre
        if (data.error) {
            return res.status(500).json({ error: "Erreur Routeur HF", details: data.error });
        }

        const text = Array.isArray(data) ? data[0].generated_text : data.generated_text;

        res.status(200).json({
            candidates: [{ content: { parts: [{ text: text || "Le videur fait la sourde oreille..." }] } }]
        });

    } catch (error) {
        res.status(500).json({ error: "Erreur fatale", details: error.message });
    }
}
