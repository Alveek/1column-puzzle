import peppa from "./assets/peppa-400.jpg";
import { useRef, useEffect } from "react";
import { posArray4x4, posArray2x2 } from "./utils";

// размеры пока что задаются в App.css
import "./App.css";

function App() {
  const elements = useRef("");

  // новый рандомный массив
  const shuffledArray = posArray2x2.sort((a, b) => 0.5 - Math.random());

  // эта фунция создает новый массив из id элементов в доме,чтобы потом каждый раз
  // при перетаскивании элемента сравнивать с оригинальным массивом
  // или даже проще с arr.sort()
  const getElementsIdsArray = (nodelist) => {
    const nodeArr = Array.from(
      nodelist.current.querySelectorAll(".puzzle__box")
    );
    return nodeArr.map((item) => item.id);
  };

  useEffect(() => {
    console.log(getElementsIdsArray(elements));
  }, [elements]);

  return (
    <div className="App">
      <div className="puzzle__container" ref={elements}>
        {shuffledArray.map((el) => {
          return (
            <div
              id={el.id}
              className="puzzle__box"
              draggable="true"
              key={el.id}
            >
              <img
                src={peppa}
                style={{ objectPosition: `${el.x} ${el.y}` }}
                alt="oink oink"
                className="puzzle-img"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
