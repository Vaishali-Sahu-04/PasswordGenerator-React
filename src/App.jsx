import { useCallback, useState ,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [password,setPassword]=useState("")
  const [length,setLength]=useState(12)
  const [charAllowed,setCharAllowed]=useState()
  const [numberAllowed,setNumberAllowed]=useState()

  const passwordRef = useRef(null)

  const PassGenerator = useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqqrstuvwxyz";
      if(numberAllowed) str+="0123456789"
      if(charAllowed) str+="!@#$%^&*()-_+=~`"
      for(let i=1;i<=length;i++){
          let ind = Math.floor(Math.random()*str.length+1)
          pass+=str[ind];
      }
      setPassword(pass)
  }, [length,numberAllowed,charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    PassGenerator()
  }, [length, numberAllowed, charAllowed])
  return (

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h2 className='text-white text-center my-3'>Password generator</h2>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
      />
      <button
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >copy</button>
      
    </div>
    <div className='flex text-sm gap-x-3'>
    <div className='flex items-center gap-x-1 text-lg'>
      <input 
      type="range"
      min={6}
      max={50}
      value={length}
       className='cursor-pointer'
       onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length:{length}</label>
    </div>
    <div className="flex items-center gap-x-1 text-lg">
    <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={() => {
           setNumberAllowed((prev) => !prev);
        }}
    />
    <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1 text-lg">
        <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
           onChange={() => {
                setCharAllowed((prev) => !prev )
            }}
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
  </div>
</div>
  )
}

export default App
