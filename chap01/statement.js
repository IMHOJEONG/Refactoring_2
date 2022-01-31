/*
* 리팩토링을 하고 나면, 반드시 테스트를 진행한다.
*/

function renderPlainText(data, plays) {
    
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
    
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return renderPlainText(statementData, plays);  
    
    // 임시 변수를 최대한 제거 => 로컬 범위에 존재하는 이름이 늘어나서 추출 작업이 복잡해짐 
    function enrichPerformance(aPerformance){
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }    
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
    
    function amountFor(aPerformance){
        let result = 0;
        
        switch ( aPerformance.play.type) {
            case "tragedy":
                result = 40000;
                if(aPerformance.audience > 30){
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
            case "comedy": 
            result = 30000;
            if(aPerformance.audience > 20){
                result += 10000 + 500 * (aPerformance.audience - 20);
            } 
            result += 300 * aPerformance.audience;
            break;
            default:
                throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
            }
            
            return result; // 함수 안에서 값이 바뀌는 변수 반환
            
    }
    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        
        if ("comedy" === aPerformance.play.type) {
            result += Math.floor(aPerformance.audience / 5);
        }
        
        return result;
    }    
    
    function totalAmount(data) {
            
        let result = 0;
            for (let perf of data.performances) {
                
                result += perf.amount;
                
            }
            return result;
        }
        function totalVolumeCredits(data) {
            let volumeCredits = 0;
            for (let perf of data.performances) {
                
                volumeCredits += perf.volumeCredits; // 추출한 함수를 이용해 값을 누적
                
            }
            return volumeCredits;
        }
    }