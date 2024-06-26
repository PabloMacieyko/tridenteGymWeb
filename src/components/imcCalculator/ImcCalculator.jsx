import React, { useState } from 'react';

const ImcCalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [imc, setImc] = useState(null);
  const [imcCategory, setImcCategory] = useState('');

  const calculateImc = () => {
    const heightInMeters = height / 100; // convert height to meters
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBmi = bmi.toFixed(2); // round BMI to 2 decimal places
    setImc(roundedBmi);

    if (bmi < 18.5) {
      setImcCategory('Bajo peso');
    } else if (bmi >= 18.5 && bmi < 24.9) {
      setImcCategory('Peso normal');
    } else if (bmi >= 24.9 && bmi < 29.9) {
      setImcCategory('Sobrepeso');
    } else {
      setImcCategory('Obesidad');
    }
  };

  return (
    <div className="py-10 my-10 bg-gray-100 dark:bg-dark">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white hover:text-primary text-center">
          CALCULADORA IMC
        </h1>
        <div className="flex flex-col items-center mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <label className="text-white font-semibold hover:text-primary">Altura (cm)</label>
              <input
                type="number"
                className="w-40 px-4 py-2 mt-2 rounded-md shadow-sm text-black dark:bg-cyan"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ingrese altura"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-white font-semibold hover:text-primary">Peso (kg)</label>
              <input
                type="number"
                className="w-40 px-4 py-2 mt-2 rounded-md shadow-sm text-black dark:bg-cyan"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ingrese peso"
              />
            </div>
          </div>
          <button
            className="mt-4 bg-green-600 hover:text-primary text-white font-bold py-2 px-4 rounded-md"
            onClick={calculateImc}
          >
            Calcular IMC
          </button>
          {imc !== null && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg">
              <h2 className="text-lg font-bold mb-2">Su Índice de Masa Corporal (IMC) es:</h2>
              <p className="text-4xl font-bold text-primary">{imc}</p>
              <p className="text-lg font-semibold mt-2">
                Categoría: {imcCategory}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImcCalculator;
