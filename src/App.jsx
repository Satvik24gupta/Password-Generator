import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let char = "!@#$%^&*()-_+=[]{}~`";
    if(numberAllowed){
      str += num;
    }
    if(charAllowed){
      str += char;
    }
    for(let i=0;i<length;i++){
      let random = Math.floor(Math.random()*str.length);
      pass += str[random];

    }
        
    setPassword(pass);  

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();


  },[password])

  const passRef = useRef(null);

  useEffect(passwordGenerator, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
          <h1 className='text-white text-center my-3'>Password Generator </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
          <input type="text" className='outline-none w-full py-1 px-3' value={password} placeholder='Password' readOnly ref={passRef} />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyToClipboard}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2"> 
          <div className='flex items-center gap-x-1'> 
            <input type="range" min={6} max={30} value={length} className='cursor-pointer' onChange={
              (e)=>{
                setLength(e.target.value)
                }
            }
            />
            <label>Length: {length}</label>
            <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{
              setNumberAllowed((prev)=> !prev)
            }}/>
            <label>Number</label>
            <input type="checkbox" defaultChecked={charAllowed} onChange={()=>{
              setCharAllowed((prev)=> !prev)
            }}/>
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
