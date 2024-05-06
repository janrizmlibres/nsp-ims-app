// import sinon from 'sinon';
// import { describe, it } from 'mocha';
// import { expect } from 'chai';

// import AcademicYear from '@/models/academic_year.js';
// import { createTerm } from '@/controllers/term.js';

// describe('Term Controller', () => {
//   beforeEach(() => {
//     sinon.stub(AcademicYear, "create");
//   });

//   afterEach(() => {
//     AcademicYear.create.restore();
//   });

//   it('should create a new academic term if the input is valid', async () => {
//     const newTerm = {
//       batch_number: '9',
//       start_date: 'August 01, 2024',
//       end_date: 'May 31, 2025',
//     };

//     AcademicYear.create.returns({ id: 9, ...newTerm });

//     const req = {
//       body: newTerm,
//     };

//     const res = {
//       statusCode: null,
//       body: null,
//       status: function (code) {
//         this.statusCode = code;
//         return this;
//       },
//       json: function (data) {
//         this.body = data;
//       },
//     };

//     await createTerm(req, res, () => {});
//     expect(res.statusCode).to.equal(201);
//     expect(res.body.message).to.equal('New Term Created!');
//     expect(res.body.term).to.be.an('object');
//     expect(res.body.term.batch_number).to.equal(newTerm.batch_number);
//     expect(res.body.term.start_date).to.equal(newTerm.start_date);
//     expect(res.body.term.end_date).to.equal(newTerm.end_date);
//   });
// });
