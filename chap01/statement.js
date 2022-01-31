/*
* 리팩토링을 하고 나면, 반드시 테스트를 진행한다.
*/

export default function statement(invoice, plays) {
    
    let totalAmount = 0; 
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    // 참고 - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    const format = new Intl.NumberFormat("en-US", 
    {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
    }).format;
    
    // 임시 변수를 최대한 제거 => 로컬 범위에 존재하는 이름이 늘어나서 추출 작업이 복잡해짐 
    const playFor = (aPerformance) => plays[aPerformance.playID]
    
    // 값이 바뀌지 않는 변수는 매개변수로 전달
    const amountFor = (aPerformance) => {
        let result = 0;
        
        switch ( playFor(aPerformance).type) {
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
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
        }

        return result; // 함수 안에서 값이 바뀌는 변수 반환

    }
    

    for(let perf of invoice.performances) {
        
        volumeCredits += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
        
        result += `${ playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);

    }

    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;


    function volumeCreditsFor(perf) {
        let volumeCredits = 0;
        volumeCredits += Math.max(perf.audience - 30, 0);

        if ("comedy" === playFor(perf).type) {
            volumeCredits += Math.floor(perf.audience / 5);
        }

        return volumeCredits;
    }
}