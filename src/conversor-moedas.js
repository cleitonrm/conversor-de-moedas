import './conversor-moedas.css';
import {Alert, Button, Form, Col, Row, Spinner, Modal} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import ListarMoedas from './listar-moedas';
import React , {useState} from 'react';
import axios from 'axios';

function ConversorMoedas() {

  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=0d9c441299759ea9e9248118b8d5105d';

  const [valor, setValor] = useState('1');
  const [moedaDe, setMoedaDe] = useState('BRL');
  const [moedaPara, setMoedaPara] = useState('USD');
  const [exibirSpinner, setExibirSpinner] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);
  const [resultadoConversao, setResultadoConversao] = useState('');

  function handleValor(event) {
    setValor(event.target.value.replace(/\D/g, ''));

  };

  function handleMoedaDe(event) {
    setMoedaDe(event.target.value);
  };

  function handleMoedaPara(event) {
    setMoedaPara(event.target.value);
  };

  function handleFecharModal(event) {
    setValor('1');
    setMoedaDe('BRL');
    setMoedaPara('USD');
    setFormValidado(false);
    setExibirModal(false);
  };

  function converter(event) {
    event.preventDefault();
    setFormValidado(true);
    if(event.currentTarget.checkValidity() === true) {
      setExibirSpinner(true);
      axios.get(FIXER_URL)
      .then(res => {
        const cotacao = obterCotacao(res.data);
        setResultadoConversao(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`);
        setExibirModal(true);
        setExibirSpinner(false);
      })
    } 
  };

    function obterCotacao(dadosCotacao) {
      if(!dadosCotacao || dadosCotacao.success !== true) {
        return false;
      }
      const cotacaoDe = dadosCotacao.rates[moedaDe];
      const cotacaoPara = dadosCotacao.rates[moedaPara];
      const cotacao = (1 / cotacaoDe * cotacaoPara) * valor;
      return cotacao.toFixed(2);
    }

  return (
   <div> 
     <h1>Conversor de Moedas</h1>
     <Alert variant='danger' show={false}>Erro ao obter dados de conversão, tente novamente.</Alert>
   
      <div className='p-5 mb-4 bg-light border rounded-3'>
        <Form onSubmit={converter} noValidate validated={formValidado}>
          <Row>
            <Col sm='3'>
              <Form.Control placeholder='0' value={valor} required onChange = {handleValor}></Form.Control>
            </Col>
            <Col sm='3'>
              <Form.Control as='select' value={moedaDe} onChange={handleMoedaDe}>
                <ListarMoedas/>
              </Form.Control>
            </Col>
            <Col sm='1' className='text-center' style={{paddingTop: '5px'}}>
              <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
            </Col>
            <Col sm='3'>
              <Form.Control as='select' value={moedaPara} onChange={handleMoedaPara}>
                <ListarMoedas/>
              </Form.Control>
            </Col>
            <Col sm='2'>
              <Button variant='success' type='submit'>
                <span className={exibirSpinner ? null : 'hidden'}>
                <Spinner animation='border' size='sm'></Spinner>
                </span>
                <span className={exibirSpinner ? 'hidden' : null}>
                Converter
                </span>
                </Button>
            </Col>
          </Row>
        </Form>
        <Modal show={exibirModal}>
          <Modal.Header>
          <Modal.Title>
            Conversão
          </Modal.Title>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleFecharModal}></button>
          </Modal.Header>
          <Modal.Body>
            {resultadoConversao}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' onClick={handleFecharModal}>Nova conversão</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ConversorMoedas;
