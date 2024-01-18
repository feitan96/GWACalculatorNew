import React, { useState, useEffect } from 'react';
import Confetti from './Confetti';
import './GwaCalculator.css';

function GwaCalculator() {
  const [result, setResult] = useState('');
  const [animate, setAnimate] = useState(false);


  const handleGenerateBoxes = () => {
    setResult('');
    const subjectCount = parseInt(document.getElementById("subjectCount").value);
    const subjectBoxes = document.getElementById("subjectBoxes");

    subjectBoxes.innerHTML = "";

    const numRows = Math.ceil(subjectCount / 2);

    for (let row = 0; row < numRows; row++) {
      const rowContainer = document.createElement("div");
      rowContainer.className = "row-container";

      for (let col = 0; col < 2; col++) {
        const boxIndex = row * 2 + col + 1;

        if (boxIndex <= subjectCount) {
          const box = document.createElement("div");
          box.className = "subject-box";
          box.innerHTML = `
            <h3>Subject ${boxIndex}</h3>
            <label for="grade${boxIndex}">Grade:</label>
            <input type="number" id="grade${boxIndex}" class="subject-grade">
            <label for="units${boxIndex}">Units:</label>
            <input type="number" id="units${boxIndex}" class="subject-units">
          `;

          rowContainer.appendChild(box);
        }
      }

      subjectBoxes.appendChild(rowContainer);
    }

    centerBoxes(subjectCount);
  };

  const handleCalculateGWA = () => {
    const subjectBoxes = document.getElementsByClassName("subject-box");
    let totalWeightedPoints = 0;
    let totalUnits = 0;

    for (const box of subjectBoxes) {
      const units = parseFloat(box.querySelector(".subject-units").value);
      const grade = parseFloat(box.querySelector(".subject-grade").value);

      if (!isNaN(units) && !isNaN(grade)) {
        totalWeightedPoints += units * grade;
        totalUnits += units;
      } else {
        setResult("Enter valid grades and units");
        return;
      }
    }

    if (totalUnits > 0) {
      const gwa = totalWeightedPoints / totalUnits;
      setResult(`Your GWA is: ${gwa.toFixed(2)}`);
      setAnimate(true);
    } else {
      setResult("Generate boxes first");
    }
  };

  useEffect(() => {
    if (result.includes("Your GWA is")) {
    }
  }, [result]);

  useEffect(() => {
    if (animate) {
      setTimeout(() => setAnimate(false), 2000);
    }
  }, [animate]);  

  function centerBoxes(subjectCount) {
    const rows = document.querySelectorAll(".row-container");

    if (subjectCount % 2 !== 0 || subjectCount === 1) {
      rows.forEach(row => {
        row.style.display = "flex";
        row.style.justifyContent = "center";
      });
    } else {
      rows.forEach(row => {
        row.style.display = "flex";
        row.style.justifyContent = "space-between";
      });
    }
  }

  return (
    <div className="gwa-calculator">
      <h1 className='gwa-title'>GWA Calculator</h1>
      <label htmlFor="subjectCount">Number of Subjects:</label>
      <input type="number" id="subjectCount" min="1" />
      <button className="generate-boxes-button" onClick={handleGenerateBoxes}>
        Generate Boxes
      </button>
      <div id="subjectBoxes"></div>
      <button className="calculate-gwa-button" onClick={handleCalculateGWA}>
        Calculate GWA
      </button>
  
      {/* Apply different classNames based on the content of the result */}
      {result.includes("Your GWA is") ? (
        <div id="result" className={`result-success ${animate ? 'popin' : ''}`}>
          <div>Your GWA is:</div>
          <div className="gwa-value">{result.replace("Your GWA is: ", "")}</div>
        </div>
      ) : (
        <div id="result" className='result-error'>
          {result}
        </div>
      )}

  
      <p className="quote">Grades can't show every amazing quality you have!</p>
  
      {/* Conditionally render the Confetti component */}
      {result.includes("Your GWA is") && <Confetti />}
      <p className="copyright">© {new Date().getFullYear()} KJ Desierto. All rights reserved.</p>
    </div>
  );
  
}

export default GwaCalculator;
