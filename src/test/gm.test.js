import 'babel-polyfill';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import {
  validVehicleIds, vehicleInfoProps, evId, iceId, coupeId, sedanId, invalidId,
} from 'constants/test';
import app from '../server';

process.env.NODE_ENV = 'test';

chai.should();

chai.use(chaiHttp);

describe('vehicle info endpoint', () => {
  validVehicleIds.forEach((id) => {
    it(`GET vehicle info for valid vehicleId: ${id}`, (done) => {
      chai.request(app)
        .get(`/v1.0/vehicles/${id}/`)
        .end((err, res) => {
          res.should.have.status(200);
          vehicleInfoProps.forEach((prop) => {
            res.body.should.have.property(prop);
          });
          done();
        });
    });
  });

  it(`GET vehicle info for invalid vehicle: ${invalidId}`, (done) => {
    chai.request(app)
      .get(`/v1.0/vehicles/${invalidId}/`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.type.should.equal('VehicleNotFoundError');
        done();
      });
  });
});

describe('battery range endpoint', () => {
  it('GET /battery for an EV', (done) => {
    chai.request(app)
      .get(`/v1.0/vehicles/${evId}/battery`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.percent.should.be.a('number');
        done();
      });
  });

  it('GET /battery for an ICE', (done) => {
    chai.request(app)
      .get(`/v1.0/vehicles/${iceId}/battery`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.type.should.equal('VehicleEnergyTypeError');
        done();
      });
  });

  it('GET /battery for invalid vehicle', (done) => {
    chai.request(app)
      .get(`/v1.0/vehicles/${invalidId}/battery`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.type.should.equal('VehicleNotFoundError');
        done();
      });
  });
});

describe('fuel range endpoint', () => {
  it('GET /fuel for an EV', (done) => {
    chai.request(app)
      .get(`/v1.0/vehicles/${evId}/fuel`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.type.should.equal('VehicleEnergyTypeError');
        done();
      });
  });

  it('GET /fuel data for an ICE', (done) => {
    chai.request(app)
      .get(`/v1.0/vehicles/${iceId}/fuel`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.percent.should.be.a('number');
        done();
      });
  });

  it(`GET /fuel for invalid vehicle: ${invalidId}`, (done) => {
    chai.request(app)
      .get(`/v1.0/vehicles/${invalidId}/fuel`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.type.should.equal('VehicleNotFoundError');
        done();
      });
  });
});

describe('doors endpoint', () => {
  it('GET /doors for two-door coupe', (done) => {
    chai.request(app)
      .get(`/v1.0/vehicles/${coupeId}/doors`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array').of.length(2);
        done();
      });
  });

  it('GET /doors for a four-door sedan', (done) => {
    chai.request(app)
      .get(`/v1.0/vehicles/${sedanId}/doors`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array').of.length(4);
        done();
      });
  });

  it('GET /doors for invalid vehicle', (done) => {
    chai.request(app)
      .get(`/v1.0/vehicles/${invalidId}/doors`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.type.should.equal('VehicleNotFoundError');
        done();
      });
  });
});

describe('engine action endpoint', () => {
  const start = { action: 'START' };
  const stop = { action: 'STOP' };
  const invalid = { action: 'TURN ON' };

  validVehicleIds.forEach((id) => {
    it(`POST stop to /engine for valid vehicle: ${id}`, (done) => {
      chai.request(app)
        .post(`/v1.0/vehicles/${id}/engine`)
        .set('Content-Type', 'application/json')
        .send(stop)
        .end((err, res) => {
          if (res.status === 200) {
            res.body.status.should.equal('success');
          } else {
            res.should.have.status(500);
            res.body.status.should.equal('error');
            res.body.type.should.equal('EngineActionExecutionError')
          }
          done();
        });
    });

    it(`POST start to /engine for valid vehicle: ${id}`, (done) => {
      chai.request(app)
        .post(`/v1.0/vehicles/${id}/engine`)
        .set('Content-Type', 'application/json')
        .send(start)
        .end((err, res) => {
          if (res.status === 200) {
            res.body.status.should.equal('success');
          } else {
            res.should.have.status(500);
            res.body.status.should.equal('error');
            res.body.type.should.equal('EngineActionExecutionError')
          }
          done();
        });
    });
  });

  it('POST invalid action to /engine endpoint.', (done) => {
    chai.request(app)
      .post(`/v1.0/vehicles/${evId}/engine`)
      .set('Content-Type', 'application/json')
      .send(invalid)
      .end((err, res) => {
        if (res.status === 200) {
          res.body.status.should.equal('success');
        } else {
          res.should.have.status(400);
          res.body.status.should.equal('error');
          res.body.type.should.equal('EngineActionTypeError')
        }
        done();
      });
  });

  it('POST stop to /engine for invalid vehicle', (done) => {
    chai.request(app)
      .post(`/v1.0/vehicles/${invalidId}/engine`, stop)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.type.should.equal('VehicleNotFoundError');
        done();
      });
  });
});
