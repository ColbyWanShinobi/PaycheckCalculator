import React, { useState } from 'react';

const App = () => {
  const [hourlyWage, setHourlyWage] = useState('');
  const [annualEarnings, setAnnualEarnings] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [netEarnings, setNetEarnings] = useState(0);

  const calculateAnnualEarnings = () => {
    const hourlyWageFloat = parseFloat(hourlyWage);
    const workHoursPerWeek = 40; // Assuming 40 work hours per week
    const weeksPerYear = 52; // Assuming 52 weeks in a year
    const paidHolidays = 10; // Assuming 10 paid holidays in a year

    const annualSalary = hourlyWageFloat * workHoursPerWeek * (weeksPerYear - (paidHolidays / 5));
    setAnnualEarnings(annualSalary.toFixed(2));

    // Tax Calculation for 2023
    const taxBrackets = [
      { limit: 9875, rate: 0.1 },
      { limit: 40125, rate: 0.12 },
      { limit: 85525, rate: 0.22 },
      { limit: 163300, rate: 0.24 },
      { limit: 207350, rate: 0.32 },
      { limit: 518400, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ];

    let remainingIncome = annualSalary;
    let totalTax = 0;

    for (let i = 0; i < taxBrackets.length; i++) {
      const { limit, rate } = taxBrackets[i];

      if (remainingIncome <= 0) {
        break;
      }

      if (remainingIncome > limit) {
        const taxableAmount = limit;
        const tax = taxableAmount * rate;
        totalTax += tax;
        remainingIncome -= taxableAmount;
      } else {
        const taxableAmount = remainingIncome;
        const tax = taxableAmount * rate;
        totalTax += tax;
        break;
      }
    }

    setTaxAmount(totalTax.toFixed(2));
    setNetEarnings((annualSalary - totalTax).toFixed(2));
  };

  return (
    <div>
      <h1>Hourly Wage to Annual Earnings Calculator</h1>
      <div>
        <label htmlFor="hourly-wage">Hourly Wage:</label>
        <input
          id="hourly-wage"
          type="number"
          step="0.01"
          value={hourlyWage}
          onChange={(e) => setHourlyWage(e.target.value)}
        />
      </div>
      <button onClick={calculateAnnualEarnings}>Calculate</button>
      {annualEarnings > 0 && (
        <div>
          <h2>Annual Earnings:</h2>
          <p>${annualEarnings}</p>
          <h2>Tax Amount:</h2>
          <p>${taxAmount}</p>
          <h2>Net Earnings:</h2>
          <p>${netEarnings}</p>
        </div>
      )}
    </div>
  );
};

export default App;
