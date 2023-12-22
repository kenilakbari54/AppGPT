import exress from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fetch from 'node-fetch';
dotenv.config();
const app = exress()
app.use(cors());
app.use(exress.json())


app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;
    const data = {
        model: 'gpt-3.5-turbo',

        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant.',
            }
        ]
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.PUBLIC_URL_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                ...data,
                messages: [
                    ...data.messages,
                    ...messages,
                ]
            })

        });
        // response.body.on('data', data => {
        //     const lines = data.toString().split('\n').filter((line) => line.trim() !== '');
        //     for (const line of lines) {
        //         const message = line.replace(/^data: /, '');
        //         console.log(message, 'message');
        //         if (message === '[DONE]') {
        //             return res.end();
        //         }
        //         const { choices } = JSON.parse(message);
        //         const { content } = choices[0].delta || {};

        //         if (content) {
        //             res.write(content);
        //         }
        //     }
        // })

        const resdata = await response.json();
        console.log(resdata)
        res.send(resdata)
    } catch (error) {
        console.log(error)
    }
});


app.post('/api/title', async (req, res) => {
    try {
        const { title } = req.body;
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.PUBLIC_URL_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'text-davinci-002',
                prompt: `Write a 3 words title for the following article: ${title}`,
                max_tokens: 100,
                temperature: 0.7,
                n: 1,
            })
        })
        const data = await response.json();
        console.log(data, 'data')
        res.json({ title: data?.choices?.[0]?.text });
    } catch (error) {
        console.log(error, 'error');
    }
});



app.listen(8000, () => {
    console.log('app is listning')
})