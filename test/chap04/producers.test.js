import { expect } from "chai";
import Province from "../../chap04/Province";

describe('no producers', ()=>{
    let noProducers;
    beforeEach(()=>{
        const data = {
            name: "No producers",
            producers: [],
            demand: 30,
            price: 20
        
        }
        noProducers = new Province(data);
    });

    it('shortfall', ()=>{
        expect(noProducers.shortfall).equal(30);
    })
    it('profit', ()=>{
        expect(noProducers.profit).equal(0);
    })
})

describe('생산자 수 필드에 문자열을 대입한다(string for producers)', ()=>{
    it('', ()=>{
        const data = {
            name: "String producers",
            producers: "",
            demand: 30,
            price: 20
        };

        const prov = new Province(data);
        expect(prov.shortfall).equal(0);
    })
})