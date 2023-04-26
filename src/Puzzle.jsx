import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ConfettiExplosion from 'react-confetti-explosion';

import './Puzzle.css';

export default function Puzzle() {
  let width =
    window.innerWidth - 20 ||
    document.documentElement.clientWidth - 20 ||
    document.body.clientWidth - 20;

  const height = 420;

  const posArray = [
    { id: 1, x: '0px', y: '0px' },
    { id: 2, x: '0px', y: '-70px' },
    { id: 3, x: '0px', y: '-140px' },
    { id: 4, x: '0px', y: '-210px' },
    { id: 5, x: '0px', y: '-280px' },
    { id: 6, x: '0px', y: '-350px' },
  ];

  const [puzzle, updatePuzzle] = useState([]);
  const [image, setImage] = useState(null);

  const mediumProps = {
    force: 0.6,
    duration: 2500,
    particleCount: 200,
    width: width,
  };

  const isSolved = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const shuffleArray = (arr) => {
    let shuffled = arr.slice().sort((a, b) => 0.5 - Math.random());

    while (isSolved(arr, shuffled)) {
      shuffled = arr.slice().sort((a, b) => 0.5 - Math.random());
    }
    return shuffled;
  };

  const getNewImage = () => {
    if (width > 600) width = 600;

    fetch(`https://picsum.photos/${width}/${height}`).then((result) => {
      updatePuzzle(shuffleArray(posArray));
      setImage(null);

      setTimeout(() => {
        setImage(result.url);
      }, 200);
    });
  };

  useEffect(() => {
    getNewImage();
  }, []);

  const onDragStart = (vib) => {
    if (vib) {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(puzzle);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updatePuzzle(items);
  }

  return (
    <div className='Puzzle'>
      {isSolved(posArray, puzzle) && (
        <ConfettiExplosion
          className='confetti'
          {...mediumProps}
        />
      )}
      {image && (
        <div>
          {isSolved(posArray, puzzle) ? (
            <>
              <img
                src={image}
                alt=''
              />
              <button
                className='button'
                onClick={() => {
                  getNewImage();
                }}>
                Ещё!
              </button>
            </>
          ) : (
            <DragDropContext
              onDragStart={() => onDragStart(false)}
              onDragEnd={handleOnDragEnd}>
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
                                src={image || placeholder400}
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
          )}
        </div>
      )}
    </div>
  );
}
