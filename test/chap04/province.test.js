import sampleProvinceData from '../../chap04/sampleProvinceData';
import Province from '../../chap04/Province';
import { expect } from 'chai';

describe('province', ()=>{
    let asia;
    beforeEach(()=>{
        asia = new Province(sampleProvinceData());
    })
    
    it('shortfall', ()=>{

        expect(asia.shortfall).equal(5);
    });
    
    it('profit', ()=>{
        
        expect(asia.profit).equal(230);
    })
});