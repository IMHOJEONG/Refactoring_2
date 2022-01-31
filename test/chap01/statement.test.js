import { expect } from 'chai';
import invoices from '../../chap01/invoices.js';
import plays from '../../chap01/plays.js';
import statement from '../../chap01/statement.js';

describe('chap01 - statement test code', ()=>{
    let result;
    beforeEach(()=>{
        result = statement(invoices[0], plays);
    })
    it('statement check', ()=>{
        const answer = "청구 내역 (고객명: BigCo)\nHamlet: $650.00 (55석)\nAs You Like It: $580.00 (35석)\nOthello: $500.00 (40석)\n총액: $1,730.00\n적립 포인트: 47점";
        expect(answer.trim()).equal(result.trim());
    }); 
})