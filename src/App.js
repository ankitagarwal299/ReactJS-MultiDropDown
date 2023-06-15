import React, { useState } from "react";
import Select from "./Select";

import "./styles.css";

//https://www.youtube.com/watch?v=bAJlYgeovlg&t=72s

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fouth", value: 4 },
  { label: "Five", value: 5 }
];

export default function App() {
  const [value1, setValue1] = useState([options[0]]);
  const [value2, setValue2] = useState(options[2]);

  return (
    <>
      <Select
        multiple
        options={options}
        value={value1}
        onChange={(o) => setValue1(o)}
      />
      <br />
      <Select options={options} value={value2} onChange={(o) => setValue2(o)} />
    </>
  );
}
