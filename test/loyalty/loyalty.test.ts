import server from '../../src/server';
import supertest from 'supertest';

import { expect } from 'chai';

describe('Loyalty', function () {
    let request: supertest.SuperAgentTest;

    before(function () {
        request = supertest.agent(server);
    });
    after(function () {
        server.close();
    });

    it('should allow a POST to /loyalty', async function () {
        const loyaltyBody = { email: 'test@email.com' };
        const res = await request.post('/loyalty').send(loyaltyBody);

        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.email).to.be.an('string');
        expect(res.body.email).to.equal(loyaltyBody.email);
    });
});
