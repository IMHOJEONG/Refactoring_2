import sampleProvinceData from '../../chap04/sampleProvinceData';
import Province from '../../chap04/Province';
import { expect } from 'chai';

describe('province', ()=>{
    it('shortfall', ()=>{

        // 1) fixture 설정 
        const asia = new Province(sampleProvinceData());

        // 2) 검증
        expect(asia.shortfall).equal(5);
    });
    
    it('profit', ()=>{
        const asia = new Province(sampleProvinceData());
        expect(asia.profit).equal(230);
    })
});