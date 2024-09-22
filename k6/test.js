import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  duration: '1m',
  vus: 10,
  thresholds: {
    http_req_failed: ['rate<0.01'],     // http errors should be less than 1%
    http_req_duration: ['p(90)<500'],   // 90 percent of response times must be below 500ms
  },
};

export default function () {
  const res = http.get('https://country-list-graphql.vercel.app/country?code=HK');
  sleep(10);
}