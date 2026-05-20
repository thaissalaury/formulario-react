import { useState } from "react";  

export default function Contador(){
    const [count, setCount] = useState(0)

    useEffect(() => {
  document.tittle = "contador apreceu na tela" + count 
}, [count])

    return (
        <div>
            <p>contador: {count}</p>
            <button onClick={() => setCount (count + 1)}>
                Somar
            </button>
        </div>
    )
}
 