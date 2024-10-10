import { useCallback } from "react";
import { useState,useEffect } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let charac = "!@#$%^&*(){}[]_-+=/~";

    if (number) str += num;
    if (characters) str += charac;


    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);

  }, [length, number, characters, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, number, characters, generatePassword]);

  const handleLengthChange = (e) => {
    const newLength = Number(e.target.value);
    setLength(newLength);
    generatePassword();
  };

  const handleCheckboxChange = (setter) => {
    setter((prev) => !prev);
    generatePassword(); 
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password); 
    alert("Password copied to clipboard!");
  };

  return (
    <div className="h-screen w-full bg-black flex justify-center items-center">
      <div className="h-[50%] w-[50%] bg-gray-700 p-5">
        <h3 className="text-white text-3xl text-center w-full mb-2">Password Generator</h3>
        <div className="w-full h-[40%] flex items-center">
          <input type="text" className="w-[80%] h-[30%] text-black" value={password} readOnly />
          <button className="w-[10%] h-[30%] bg-green-600" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
        <div className="flex items-center gap-10 justify-center">
          <div className="flex items-center gap-5">
            <input
              type="range"
              id="leng"
              min={6}
              max={100}
              value={length}
              onChange={handleLengthChange}
            />
            <label htmlFor="leng" className="text-2xl">Length {length}</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="num"
              checked={number}
              onChange={() => handleCheckboxChange(setNumber)}
            />
            <label htmlFor="num" className="text-2xl">Numbers</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="char"
              checked={characters}
              onChange={() => handleCheckboxChange(setCharacters)}
            />
            <label htmlFor="char" className="text-2xl">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
