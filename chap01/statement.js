/*
* 리팩토링을 하고 나면, 반드시 테스트를 진행한다.
*/
import createStatementData from "./createStatementData";

function renderPlainText(data) {
    
    let result = `청구 내역 (고객명: ${data.customer})\n`;
    

    for(let perf of data.performances) {
        
        result += `${ perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
        
    }
    
    
    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
    return result;
    
    
    
    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber/100);
    }
    
}

export default function statement(invoice, plays) {
    
    return renderPlainText(createStatementData(invoice, plays));  
    
}