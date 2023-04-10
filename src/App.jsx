import peppa from './assets/peppa-400.jpg';
import { useRef, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { posArray4x4, posArray2x2, posArray1x4 } from './utils';

// размеры пока что задаются в App.css
import './App.css';

function App() {
  const elements = useRef('');

  // новый рандомный массив
  const posArrayIds = posArray1x4.filter((item) => item.id);
  const shuffledArray = posArray1x4.sort((a, b) => 0.5 - Math.random());

  console.log(posArrayIds);

  // эта фунция создает новый массив из id элементов в доме,чтобы потом каждый раз
  // при перетаскивании элемента сравнивать с оригинальным массивом
  // или даже проще с arr.sort()
  // const getElementsIdsArray = (nodelist) => {
  //   const nodeArr = Array.from(nodelist.current.querySelectorAll('.puzzle__box'));
  //   return nodeArr.map((item) => item.id);
  // };

  // useEffect(() => {
  //   console.log(getElementsIdsArray(elements));
  // }, [elements]);

  const [puzzle, updatePuzzle] = useState(shuffledArray);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(puzzle);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updatePuzzle(items);
  }

  // return (
  //   <div className="App">
  //     <div
  //       className="puzzle__container"
  //       ref={elements}>
  //       {shuffledArray.map((el) => {
  //         return (
  //           <div
  //             id={el.id}
  //             className="puzzle__box"
  //             draggable="true"
  //             key={el.id}>
  //             <img
  //               src={peppa}
  //               style={{ objectPosition: `${el.x} ${el.y}` }}
  //               alt="oink oink"
  //               className="puzzle-img"
  //             />
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );

  return (
    <div className='App'>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='characters'>
          {(provided) => (
            <ul
              className='puzzle__container'
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {puzzle.map(({ id, x, y }, index) => {
                return (
                  <Draggable
                    key={id}
                    draggableId={String(id)}
                    index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={id}
                        className='puzzle__box'
                        draggable='true'
                        key={id}>
                        <img
                          src={peppa}
                          style={{ objectPosition: `${x} ${y}` }}
                          alt='oink oink'
                          className='puzzle-img'
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}

export default App;
