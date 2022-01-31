// 값이 바뀌지 않는 변수는 매개변수로 전달
const amountFor = (perf, play) => {
    let result = 0;
     
    switch (play.type) {
        case "tragedy":
            result = 40000;
            if(perf.audience > 30){
                result += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy": 
        result = 30000;
            if(perf.audience > 20){
                result += 10000 + 500 * (perf.audience - 20);
            } 
            result += 300 * perf.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return result; // 함수 안에서 값이 바뀌는 변수 반환

}
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

    for(let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf, play); // 추출한 함수를 이용



       
        volumeCredits += Math.max(perf.audience - 30, 0);

        if("comedy" === play.type) {
            volumeCredits += Math.floor(perf.audience / 5);
        }

        result += `${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
        totalAmount += thisAmount;

    }

    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;

}