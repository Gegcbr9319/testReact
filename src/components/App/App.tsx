import { useState } from "react";
import styles from "./App.module.scss";
import "../../library/iconLibrary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconName,
  findIconDefinition,
  library,
} from "@fortawesome/fontawesome-svg-core";

const iconsNames = Object.keys(
  (library as unknown as { definitions: { fab: Record<string, unknown> } })
    ?.definitions?.fab
);
const getRandomIcon = () =>
  findIconDefinition({
    prefix: "fab",
    iconName: iconsNames[
      Math.round(Math.random() * iconsNames.length)
    ] as IconName,
  });

export function App() {
  const [name, setName] = useState<ReturnType<getRandomIcon>[]>([]);

  let count = 0;

  const counter = () => {
    console.log("click");
    if (count === 0) {
      getIconName();
    }
    count++;
  };

  const getIconName = async () => {
    let timer = setInterval(() => {
      setName(([, ...prev]) => [...prev, getRandomIcon()]);

      count--;

      if (count === 0) {
        clearInterval(timer);
      }
    }, 3000);
  };

  return (
    <div className={styles.main_div}>
      <h2 className={styles.h2}>Меняющиеся иконки</h2>
      {name.length > 0 && <FontAwesomeIcon icon={name[name.length - 1]} className={styles.icon} />}

      <button
        onClick={() => {
          counter();
        }}
      >
        
        Нажми что б работало
      </button>
    </div>
  );
}
