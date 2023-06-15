import React, { useEffect, useState } from "react";
import styles from "./select.module.css";

function Select({ multiple, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false); //setHighlightedIndex
  const [highlightedIndex, setHighlightedIndex] = useState(0); //setHighlightedIndex

  function clearOptions(e) {
    e.stopPropagation();

    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }

    setIsOpen(false);
  }

  function isOptionSelected(option) {
    if (multiple) {
      return value?.includes(option);
    }
    return option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <>
      <div
        onBlur={() => setIsOpen(false)}
        tabIndex={0}
        className={styles.container}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.value}>
          {multiple
            ? value?.map((v) => (
                <button
                  key={v.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                  className={styles["option-badge"]}
                >
                  {v.label}
                  <span className={styles["remove-btn"]}> &times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          className={styles["clear-btn"]}
          onClick={(e) => clearOptions(e)}
        >
          &times;
        </button>
        <div className={styles.divider}> </div>
        <div className={styles.caret}> </div>

        <ul className={`${styles.options} ${isOpen && styles.show}`}>
          {options &&
            options.map((option, index) => (
              <li
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(option);
                }}
                className={`${styles.option} ${
                  isOptionSelected(option) && styles.selected
                }  ${highlightedIndex === index && styles.highlighted}`}
                key={option.value}
              >
                {option.label}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Select;
