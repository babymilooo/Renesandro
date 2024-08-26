import React, { useState } from "react";
import { InputManyTexts } from "../../InputManyTexts";

const InputTextRef = () => {
  const [textArray, setTextArray] = useState<string[]>([]);

  return (
    <div>
      <InputManyTexts textArray={textArray} setTextArray={setTextArray} />
    </div>
  );
};

export default InputTextRef;
