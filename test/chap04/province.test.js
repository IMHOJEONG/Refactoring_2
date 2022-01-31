const assert = require('assert');
import sampleProvinceData from '../../chap04/sampleProvinceData';
import Province from '../../chap04/Province';

describe('province', ()=>{
    it('shortfall', ()=>{

        // 1) fixture 설정 
        const asia = new Province(sampleProvinceData());

        // 2) 검증
        assert.equal(asia.shortfall, 5);
    });
});