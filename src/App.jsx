import './App.css'
import { useState, useEffect } from 'react'
import ImgDesktop from "./assets/img_desktop.svg"
import ImgMobile from "./assets/img_mobile.svg"
import iconCheck from "./assets/icon-success.svg"

function App() {
  const [email, setEmail] = useState("")
  const [erro, setErro] = useState(false)
  const [emailValido, setEmailValido] = useState(false)
  const [imagemAtual, setImagemAtual] = useState(ImgDesktop)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)')
    const handleResize = () => {
      setImagemAtual(mediaQuery.matches ? ImgMobile : ImgDesktop)
    }

    handleResize()

    mediaQuery.addEventListener('change', handleResize)

    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }

  }, [])

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = () => {
    if (!validarEmail(email)) {
      setErro(true)
      setEmailValido(false)
    } else {
      setErro(false)
      setEmailValido(true)
    }
  } 

  const reload = () => {
    window.location.reload()
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#37384E] px-3 lg:px-0 py-10 lg:py-0'>
      <div className={`flex flex-col-reverse lg:flex-row lg:gap-5 w-full lg:w-3/5 gap-10 rounded-2xl p-5 bg-white items-center justify-between ${emailValido ? 'hidden' : ''}`}>
          
        <div className='h-1/2 w-full lg:w-1/2 lg:h-full flex itemns-center justify-center flex-col'>

          <h1 className='text-[#222742] text-6xl font-bold'> Stay updated! </h1>

          <p className='text-[#37384E] text-[1.2em] mt-5 font-medium'>
            Join 60,000+ product managers receiving monthly updates on:
          </p>

          <div className='mt-5 flex gap-3'>
            <img src={iconCheck} alt="Check" className='h-auto w-[20px]'/>

            <p className='text-[#37384E] text-[1.1em] font-medium'>
              Product discovery and building what matters
            </p>
          </div>

          <div className='mt-5 flex gap-3'>
            <img src={iconCheck} alt="Check" className='h-auto w-[20px]'/>

            <p className='text-[#37384E] text-[1.1em] font-medium'>
              Measuring to ensure updates are a success
            </p>
          </div>

          <div className='mt-5 flex gap-3'>
            <img src={iconCheck} alt="Check" className='h-auto w-[20px]'/>

            <p className='text-[#37384E] text-[1.1em] font-medium'>
              And much more!
            </p>
          </div>

          <div className='flex flex-col mt-5'>
            <label className='text-[15px] font-medium text-[#222742]]'> Email address </label>

            <input type="email" 
            placeholder='email@company.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              p-3 rounded-[10px] outline-none mt-1 transition-all duration-200
              ${erro ? "border-2 border-red-500 bg-red-50" : "border border-gray-300 focus:border-2 focus:border-[#37384E]"}
            `}/>

            {erro && (
              <span className='text-red-500 text-sm mt-1'>
                Insira um e-mail válido 
              </span>
            )}

          </div>

          <button className='mt-5 bg-[#222742] p-3 rounded-[10px] text-[white] font-medium cursor-pointer' onClick={handleSubmit}>
            Subscribe to monthly newsletter
          </button>

        </div>

        <div className='h-1/2 w-full lg:w-1/2 lg:h-full flex items-center justify-center'>

          <img src={imagemAtual} alt="Background" className='w-[100%] h-auto object-contain' />

        </div>

      </div>

      <div className={`bg-white h-8/12 w-full lg:w-4/12 p-5 lg:p-10 flex flex-col rounded-3xl ${emailValido ? '' : 'hidden'}`}>

        <img src={iconCheck} alt="Check" className='h-auto w-[50px]'/>

        <h1 className='text-[#222742] text-5xl lg:text-6xl font-bold mt-5'> Thanks for subscribing! </h1>

        <p className='text-[#37384E] text-[1.2em] mt-5 font-normal'>
          A confirmation email has been sent to <b>{email}</b>. Please open it and click the button 
          inside to confirm your subscription 
        </p>

        <button className='mt-5 bg-[#222742] p-3 rounded-[10px] text-[white] font-medium cursor-pointer' onClick={reload}>
          Dismiss message
        </button>

      </div>

    </div>
  )
}

export default App
