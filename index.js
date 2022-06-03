import Activities from "./scenarios/GET/Activities.js";
import { group , sleep } from 'k6';


export default () => {
    group('Endpoint Activities', () => {
        Activities();
    });

    sleep(1);
}