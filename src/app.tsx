import { useState, useEffect } from "react";
import "./app.css";
import axios from "axios";
import pattern_divider_dektop from "./assets/pattern-divider-desktop.svg";
import pattern_divider_mobile from "./assets/pattern-divider-mobile.svg";
import icon_dice from "./assets/icon-dice.svg";

export function App() {
  interface AdviceData {
    id: number;
    advice: string;
  }

  const [advice, setAdvice] = useState<AdviceData>({ id: 0, advice: "" });

  useEffect(() => {
    getAdvices(); // Appel de getAdvices une fois que le composant est monté
  }, []);

  const getAdvices = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      //  console.log(response.data.slip);
      setAdvice(response.data.slip);
    } catch (error) {
      console.log(error);
    }
  };

  let isDesktop = window.innerWidth >= 1024 ? true : false;

  const handleCLick = (e: Event) => {
    e.preventDefault();
    getAdvices();
  };

  //console.log(advice);

  return (
    <>
      <div className="container">
        <div className="box">
          <h3 className="advice-title">ADVICE #{advice.id}</h3>
          <p>"{advice.advice}"</p>
          <img
            src={isDesktop ? pattern_divider_dektop : pattern_divider_mobile}
            className="pattern_divider"
            alt="pattern-divider-desktop"
          />
          <button
            className="btn-dice"
            onClick={(e: Event) => {
              handleCLick(e);
            }}
          >
            <img src={icon_dice} alt="icone_dice" />
          </button>
        </div>
      </div>
    </>
  );
}
