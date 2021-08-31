import React from 'react';
import ReactDOM from 'react-dom';
import ListaMoedas from './listar-moedas';

describe('teste do componente de listagem de moedas', () => {
    it('deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ListaMoedas />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});