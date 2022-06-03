import http from 'k6/http';
import { Trend, Rate, Counter } from "k6/metrics";
import { check, fail, sleep } from "k6";


export let GetCustomerDuration = new Trend('get_customer_duration');
export let GetCustomerFailRate = new Rate('get_customer_fail_rate');
export let GetCustomerSuccessRate = new Rate('get_customer_success_rate');
export let GetCustomerReqs = new Rate('get_customer_reqs');


export default function () {
    let response = http.get(`https://fakerestapi.azurewebsites.net/api/v1/Activities`)
    
    
    GetCustomerDuration.add(response.timings.duration);
    GetCustomerReqs.add(1);
    GetCustomerFailRate.add(response.status == 0 || response.status > 399);
    GetCustomerSuccessRate.add(response.status < 399);


    let durationMsg = 'Max Duration ${1000/1000}s'
    
    if(!check(response, {
        'max duration': r => r.timings.duration < 1000,
    })){
        fail(durationMsg);
    }
    

    sleep(1);
}
