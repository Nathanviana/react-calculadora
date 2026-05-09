import { useState, useEffect } from "react";
import "./App.css";
import Botao from "./components/botao/Botao";

function App() {
  const [numroUm, setNumroUm] = useState("");
  const [numroDois, setNumroDois] = useState("");
  const [numroTres, setNumroTres] = useState("");
  const [simbolo, setSimbolo] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  function adcNumero(n) {
    if (numroTres !== "") {
      setNumroUm(n);
      setNumroDois("");
      setSimbolo("");
      setNumroTres("");
    } else if (simbolo === "") {
      let num = numroUm + n;
      setNumroUm(num);
    } else {
      let num = numroDois + n;
      setNumroDois(num);
    }
  }

  function conta(s) {
    if (numroUm !== "" && numroDois !== "" && s !== simbolo) {
      setNumroUm(resultado().toString());
      limparDoisTres();
      setSimbolo(s);
    } else if (numroTres !== "") {
      setNumroUm(numroTres.toString());
      limparDoisTres();
      setSimbolo(s);
    } else if (numroUm !== "" && numroDois !== "" && simbolo === s) {
      setNumroUm(resultado().toString());
      limparDoisTres();
      setSimbolo(s);
    } else if (numroUm !== "") {
      setSimbolo(s);
    }
  }

  function limparDoisTres() {
    setNumroDois("");
    setNumroTres("");
  }

  function limpar() {
    setNumroUm("");
    setNumroDois("");
    setSimbolo("");
    setNumroTres("");
  }

  function apagarUltimo() {
    if (numroTres !== "") {
      limpar();
    } else if (simbolo === "") {
      let num = numroUm.toString().slice(0, -1);
      setNumroUm(num);
    } else if (simbolo !== "" && numroDois === "") {
      setSimbolo("");
    } else {
      let num = numroDois.toString().slice(0, -1);
      setNumroDois(num);
    }
  }

  function resultado() {
    let result;
    const n1 = parseFloat(numroUm);
    const n2 = parseFloat(numroDois);

    if (simbolo === "+") result = n1 + n2;
    else if (simbolo === "-") result = n1 - n2;
    else if (simbolo === "X") result = n1 * n2;
    else if (simbolo === "/") result = n1 / n2;
    else if (simbolo === "%") {
      result = n2 === 0 || isNaN(n2) ? n1 / 100 : (n1 / 100) * n2;
    }
    return result;
  }

  function positivoNegativo() {
    if (numroTres !== "") {
      setNumroTres((parseFloat(numroTres) * -1).toString());
    } else if (simbolo === "") {
      setNumroUm((parseFloat(numroUm) * -1).toString());
    } else {
      setNumroDois((parseFloat(numroDois) * -1).toString());
    }
  }

  function formatarNumero(numero) {
    if (!numero && numero !== 0) return "";
    const num = parseFloat(numero);
    if (isNaN(num)) return numero;
    
    // Formatting for display
    let formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 8
    }).format(num);

    return num < 0 ? `(${formatted})` : formatted;
  }

  function adicionarPonto() {
    if (numroUm === "" && numroDois === "" && simbolo === "") {
      setNumroUm("0.");
    } else if (!numroUm.toString().includes(".") && numroDois === "" && simbolo === "") {
      setNumroUm(numroUm + ".");
    } else if (numroUm !== "" && simbolo !== "" && numroDois === "") {
      setNumroDois("0.");
    } else if (!numroDois.toString().includes(".") && simbolo !== "") {
      setNumroDois(numroDois + ".");
    }
  }

  return (
    <>
      <div className="bg-gradient-circle circle-1"></div>
      <div className="bg-gradient-circle circle-2"></div>

      <button className="theme-toggle glass" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <main className="glass squircle">
        <header>
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </header>

        <div className="displayBox">
          <p className="equacao">
            {numroTres !== "" ? `${formatarNumero(numroUm)} ${simbolo} ${formatarNumero(numroDois)}` : ""}
          </p>
          <p className="solucao">
            {numroTres !== "" ? formatarNumero(numroTres) : 
             numroDois !== "" ? formatarNumero(numroDois) : 
             numroUm !== "" ? formatarNumero(numroUm) : "0"}
          </p>
        </div>

        <div className="buttonsBox">
          <Botao type="function" text="AC" onClick={limpar} />
          <Botao type="function" text="⌫" onClick={apagarUltimo} />
          <Botao type="function" text="%" onClick={() => conta("%")} />
          <Botao type="operator" text="÷" onClick={() => conta("/")} />

          <Botao type="number" text="7" onClick={() => adcNumero("7")} />
          <Botao type="number" text="8" onClick={() => adcNumero("8")} />
          <Botao type="number" text="9" onClick={() => adcNumero("9")} />
          <Botao type="operator" text="×" onClick={() => conta("X")} />

          <Botao type="number" text="4" onClick={() => adcNumero("4")} />
          <Botao type="number" text="5" onClick={() => adcNumero("5")} />
          <Botao type="number" text="6" onClick={() => adcNumero("6")} />
          <Botao type="operator" text="−" onClick={() => conta("-")} />

          <Botao type="number" text="1" onClick={() => adcNumero("1")} />
          <Botao type="number" text="2" onClick={() => adcNumero("2")} />
          <Botao type="number" text="3" onClick={() => adcNumero("3")} />
          <Botao type="operator" text="+" onClick={() => conta("+")} />

          <Botao type="number" text="±" onClick={positivoNegativo} />
          <Botao type="number" text="0" onClick={() => adcNumero("0")} />
          <Botao type="number" text="." onClick={adicionarPonto} />
          <Botao type="action" text="=" onClick={() => setNumroTres(resultado())} />
        </div>
      </main>
    </>
  );
}

export default App;
