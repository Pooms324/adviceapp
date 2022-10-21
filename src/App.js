import { useCallback, useEffect, useState } from "react";
import "./index.css";
let firstTime = true;
function App() {
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const getAdvice = () => {
    firstTime = false;
    const sendReq = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.adviceslip.com/advice");
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setAdvice(data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    sendReq();
  };

  let content;

  if (firstTime) {
    content = <p>click on button to load an advice</p>;
  } else if (loading) {
    content = <p>loading</p>;
  } else if (error) {
    content = <p>{"" + error}</p>;
  } else {
    content = `"${advice.slip.advice}"`;
  }

  return (
    <div className="App">
      <div className="card">
        <div className="advice_content">
          <div>{!firstTime && <b className="heading">Advice</b>}</div>
          {content}
          <div className="line"></div>
        </div>
        <div className="btn_holder">
          <button className="btn" onClick={getAdvice}></button>
        </div>
      </div>
    </div>
  );
}

export default App;
