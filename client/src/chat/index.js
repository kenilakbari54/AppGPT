import React, { useState } from 'react'

function Chat() {
    const examples = [
        'How to use Tailwind CSS',
        'How to use Tailwind CSS with HTML',
        'How to use Tailwind CSS with REACT',
        'How to use Tailwind CSS with Angular',
        'How to use Tailwind CSS with Flask',
        'How to use Tailwind CSS with Next.js',
    ]

    const [chat, setChat] = useState([]);
    const [input, setInput] = useState('');
    const [title, setTitle] = useState('')
    const [chatHistory, setchatHistory] = useState([])
    console.log(chatHistory, 'chatHistory')
    const handleSend = async () => {
        if (input.trim) {
            setChat([...chat, { role: 'user', content: input }]);
            setInput('');
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        ...chat,
                        { role: 'user', content: input },

                    ]
                })
            });
            const resdata = await response.json();
            console.log(resdata, 'resdata')

            //eslint-disable-next-line
            // const readData = response.body.pipeThrough(new TextDecoderStream()).getReader();
            // let aiRes = '';
            // while (true) {
            //     const { done, value } = await readData.read()
            //     if (done) {
            //         break;
            //     } else {
            //         aiRes += value;
            //         setChat([...chat, { role: 'user', content: input }, { role: 'assistant', content: aiRes }]);
            //     }
            // }


            setChat([...chat, { role: 'user', content: input }, resdata?.choices?.[0]?.message]);
        }
        if (!title) {
            const createTitle = await fetch('http://localhost:8000/api/title', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: input,
                })
            })
            const title = await createTitle.json()
            setTitle(title?.title)
            setchatHistory([...chatHistory, title])
        }
    }

    return (
        <div className='h-screen w-screen flex bg-[#050509]'>
            <div className='w-[20%] h-screen bg-[#0c0c15] text-white p-4'>
                <div className='h-[5%]'>
                    <button className='w-full h-[50px] border rounded hover:bg-slate-600' onClick={() => { setChat([]); setTitle('') }} >+ New Chat</button>
                </div>
                <div className='h-[70%] mt-8 overflow-scroll shadow-lg hide-scroll-bar'>
                    {
                        chatHistory.map((item, index) => (
                            <div className='py-3 text-center rounded mt-4 text-lg font-light flex items-center px-8 hover:bg-slate-600 cursor-pointer'>
                                <span className='mr-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M8 9h8" />
                                        <path d="M8 13h6" />
                                        <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                                    </svg>
                                </span>
                                <span className='text-left'>
                                    {item.title}</span>
                            </div>
                        ))
                    }
                </div>
                <div className='overflow-scroll shadow-lg hide-scroll-bar h-[20%] border-t'>
                    {
                        [1, 2, 3].map((item, index) => (
                            <div className='py-3 text-center rounded mt-4 text-lg font-light flex items-center px-8 hover:bg-slate-600 cursor-pointer'>
                                <span className='mr-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings-cog" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12.003 21c-.732 .001 -1.465 -.438 -1.678 -1.317a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c.886 .215 1.325 .957 1.318 1.694" />
                                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                        <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                        <path d="M19.001 15.5v1.5" />
                                        <path d="M19.001 21v1.5" />
                                        <path d="M22.032 17.25l-1.299 .75" />
                                        <path d="M17.27 20l-1.3 .75" />
                                        <path d="M15.97 17.25l1.3 .75" />
                                        <path d="M20.733 20l1.3 .75" />
                                    </svg>
                                </span>
                                Code settings
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='w-[80%]'>

                {
                    chat?.length > 0 ?
                        (
                            <div className='h-[80%] overflow-scroll hide-scroll-bar pt-8'>
                                {
                                    chat?.map((item, index) => (
                                        <div className={`w-[60%] mx-auto p-6 text-white flex items-center ${item.role === 'assistant' && 'bg-slate-900'}`}>
                                            <span className='mr-8 p-2 bg-slate-800 text-white rounded-full '>
                                                {
                                                    item.role === 'user' ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-scan" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                                                            <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                                                            <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                                                            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                                                            <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-robot" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                                                            <path d="M12 2v2" />
                                                            <path d="M9 12v9" />
                                                            <path d="M15 12v9" />
                                                            <path d="M5 16l4 -2" />
                                                            <path d="M15 14l4 2" />
                                                            <path d="M9 18h6" />
                                                            <path d="M10 8v.01" />
                                                            <path d="M14 8v.01" />
                                                        </svg>
                                                }
                                            </span>
                                            <div className='loafing-loose' style={{ whiteSpace: 'break-spaces' }}> {item.content}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='h-[80%] flex flex-col justify-center items-center text-white'>

                                <div className='text-4xl font-bold mb-8'>APP GPT</div>
                                <div className='flex flex-wrap justify-around max-w-[900px] '>
                                    {
                                        examples.map((item, index) => (
                                            <div onClick={() => setInput(item)} className='text-lg font-light mt-4 p-4 border rounded cursor-pointer min-w-[400px] hover:bg-slate-800'>
                                                {item}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                <div className='h-[20%]'>
                    <div className='flex flex-col items-center justify-center w-full h-full text-white'>
                        <div className='w-[60%] flex justify-center relative'>
                            <input type='text' onChange={(e) => setInput(e.target.value)} value={input} className=' w-full rounded-lg p-4 pr-16 bg-slate-800 text-white' placeholder='Type your message here...' />
                            <span className='absolute right-4 top-4 cursor-pointer' onClick={() => input.trim() ? handleSend() : undefined}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                                    <path d="M6.5 12h14.5" />
                                </svg>
                            </span>
                        </div>
                        <small className='text-slate-500 mt-2'>AI can generate incorrect information.</small>

                    </div>  </div>

            </div>
        </div >
    )
}

export default Chat