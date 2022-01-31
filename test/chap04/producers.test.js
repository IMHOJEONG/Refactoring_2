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