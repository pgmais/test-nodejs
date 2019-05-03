const chai = require('chai');
const assert = chai.assert;
const app = require('../config/express');
const http = require('supertest')(app); 

describe('Teste de Projeto', () => {

	//#######################

	it('Deve validar a estrutura de um dos clientes cadastrados na base', (done) => {

		const url = '/v1/clients';

		http
		.get(url)			
		.expect('Content-Type', /json/)
		.expect(200)
		.expect((results) => {
			
			const pattern = results.body[0];

			assert.property(pattern, 'id');
			assert.property(pattern, 'name');
			assert.property(pattern, 'CEP');
			assert.property(pattern, 'CPF');
			assert.property(pattern, 'date_sent');
			assert.property(pattern, 'status');
		})
		.end(done);
	});

	//#######################

	it('Deve cadastrar um novo cliente na base', (done) => {

		const url = '/v1/clients';
		const params = {
			"name" : "Test10",
			"CEP" : "83010220",
			"CPF" : "99988877745"
		};

		http
		.post(url)
		.send(params)
		.expect('Content-Type', /json/)
		.expect(200)
		.expect((results) => {

			const result = results.body;

			assert.isNumber(result);	
		})
		.end(done);
	});

	//#######################

	it('Deve validar a estrutura do cliente com o id informado no parametro da url', (done) => {

		const url = '/v1/clients/1';

		http
		.get(url)			
		.expect('Content-Type', /json/)
		.expect(200)
		.expect((results) => {
			
			const pattern = results.body;

			assert.property(pattern, 'id');
			assert.property(pattern, 'name');
			assert.property(pattern, 'CEP');
			assert.property(pattern, 'CPF');
			assert.property(pattern, 'date_sent');
			assert.property(pattern, 'status');
		})
		.end(done);
	});

	//#######################

	it('Deve atualizar o Nome, Data de Envio e Status do cliente com o id informado no parametro da url', (done) => {

		const url = '/v1/clients/1';
		const params = {
			"id" : "1",
			"name" : "Teste de primeiro valor",
		};

		http
		.put(url)
		.send(params)
		.expect('Content-Type', /json/)
		.expect(200)
		.expect((results) => {
			
			const pattern = results.body;

			assert.equal(pattern, 1, "atualização feita");
		})
		.end(done);
	});

	//#######################

	it('Deve retornar status 500 ao tentar remover cliente com o id informado no parametro da url', (done) => {

		const url = '/v1/clients/88888888888888888';

		http
		.delete(url)
		.expect('Content-Type', /json/)
		.expect(500)
		.end(done);
	});

	//#######################
});