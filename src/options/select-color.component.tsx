import React, { useEffect, useState } from "react";

import { StorageService } from "../shared/storage.service";
import { Colors } from '../shared/colors';

export const SelectColor = () => {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    //runs every time component is rendered (initially and as state changes)
    // see dependency array (second arg to useEffect)

    // Update the color value after we get it from storage
    StorageService.get('color', (result) => {
      if (result) {
        setColor(result)
      }
    });

  }, [/* empty array === only run after initial render */]);

  const changeColor = (event: any) => {
    const el = event.target;
    const color = el?.dataset.color;
    if (color) {
      setColor(color);
      StorageService.set('color', color);
    }
  }

  return (
    <>
      <div>
        {
          Colors.webSafeHex.map((c) => {
            const style: any = { backgroundColor: c };
            if (c === color) {
              style.borderWidth = '4px';
              style.borderColor = '#000000'
            }
            return <button data-color={c} title={c} style={style} onClick={changeColor}></button>
          })
        }
      </div>
    </>
  );

}