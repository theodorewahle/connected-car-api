import 'babel-polyfill';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../server';

process.env.NODE_ENV = 'test';

chai.should();

chai.use(chaiHttp);

describe('check server connection', () => {
  it('GET server status', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.status.should.equal('connected');
        done();
      });
  });
});
