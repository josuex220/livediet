import React from 'react';

const IMCComponent = ({ sexo, altura, peso, idade }) => {
    // Convertendo altura de metros para centímetros
    const alturaEmCm = altura * 100;

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Calcular o peso ideal
    const calcularPesoIdeal = (sexo, alturaEmCm) => {
        if (sexo === 'Masculino') {
            return alturaEmCm - 100;
        } else if (sexo === 'Feminino') {
            return alturaEmCm - 104;
        } else {
            return 'Indefinido'; // Para casos onde o sexo não é fornecido ou é inválido
        }
    };

    const pesoIdeal = calcularPesoIdeal(sexo, alturaEmCm);

    // Função para determinar a classificação
    const getClassificacao = (imc) => {
        if (imc < 18.5) return 'Abaixo do peso';
        if (imc >= 18.5 && imc < 24.9) return 'Peso normal';
        if (imc >= 25 && imc < 29.9) return 'Sobrepeso';
        return 'Obesidade';
    };

    // Função para determinar as recomendações
    const getRecomendacao = (imc) => {
        if (imc < 18.5) {
            return 'É importante aumentar a ingestão de calorias e manter uma alimentação equilibrada. Consultar um nutricionista pode ser útil.';
        }
        if (imc >= 18.5 && imc < 24.9) {
            return 'Você está com um peso saudável. Continue mantendo uma dieta equilibrada e praticando exercícios regularmente.';
        }
        if (imc >= 25 && imc < 29.9) {
            return 'É recomendável adotar uma dieta saudável e aumentar a atividade física para evitar problemas de saúde relacionados ao sobrepeso.';
        }
        return 'Consultar um médico ou nutricionista é essencial para desenvolver um plano de perda de peso saudável e sustentável.';
    };

    return (
        <div className="p-6 w-full bg-white mb-5 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Cálculo de IMC</h2>
            <div className="mb-4">
                <p><b>Sexo:</b> {sexo}</p>
                <p><b>Altura:</b> {altura} m</p>
                <p><b>Peso:</b> {peso} kg</p>
                <p><b>Idade:</b> {idade} anos</p>
            </div>
            <div className="mb-4">
                <p><b>IMC:</b> {imc.toFixed(2)}</p>
                <p><b>Classificação:</b> {getClassificacao(imc)}</p>
                <p><b>Peso Ideal:</b> {pesoIdeal.toFixed(2)} kg</p>
            </div>
            <div className="mt-4 p-4 bg-gray-100 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Recomendações:</h3>
                <p>{getRecomendacao(imc)}</p>
            </div>
        </div>
    );
};

export default IMCComponent;
