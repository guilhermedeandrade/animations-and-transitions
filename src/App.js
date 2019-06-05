import React, { useState } from "react";
import "./App.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Transition, animated } from "react-spring/renderprops";

export default () => {
  const [boxes, setBoxes] = useState(["hej", "tack", "smol"]);
  const [foods, setFoods] = useState(["falafel", "kebab", "cheeseburger"]);

  const removeByIndex = xs => idx => xs.filter(el => el !== xs[idx]);
  const removeByValue = xs => value => xs.filter(el => el !== value);

  const deleteBoxByIndex = removeByIndex(boxes);
  const deleteFoodByValue = removeByValue(foods);

  return (
    <div className="container">
      <div>
        <TransitionGroup component="ul">
          <h1>Transitions made with react-transition-group</h1>
          {boxes.map((box, idx) => (
            <CSSTransition timeout={500} classNames="fade" key={box}>
              <li
                key={box}
                className="box"
                onClick={() => setBoxes(deleteBoxByIndex(idx))}
              >
                {box}
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <div>
        <h1>Transitions made with react-spring</h1>
        <ul>
          <Transition
            items={foods}
            keys={item => item}
            from={{ transform: "translate3d(0,-40px,0)", opacity: 0 }}
            enter={{ transform: "translate3d(0,0px,0)", opacity: 1 }}
            leave={{ transform: "translate3d(0,-40px,0)", opacity: 0 }}
          >
            {item => props => (
              <animated.li
                style={props}
                className="box"
                onClick={() => setFoods(deleteFoodByValue(item))}
              >
                {item}
              </animated.li>
            )}
          </Transition>
        </ul>
      </div>
    </div>
  );
};
