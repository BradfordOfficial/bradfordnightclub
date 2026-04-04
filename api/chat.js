export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/Qwen/Qwen2.5-72B-Instruct/v1/chat/completions",
            {
                headers: { 
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify({
                    model: "Qwen/Qwen2.5-72B-Instruct",
                    messages: [
                        { role: "system", content: req.body.system_instruction.parts[0].text },
                        { role: "user", content: req.body.contents[0].parts[0].text }
                    ],
                    max_tokens: 500
                }),
            }
        );

        const data = await response.json();
        const text = data.choices[0].message.content;

        res.status(200).json({
            candidates: [{
                content: {
                    parts: [{ text: text }]
                }
            }]
        });

    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
}
