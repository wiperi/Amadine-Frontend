import { request } from '../utils';

export function registerAPI(email: string, password: string, nameFirst: string, nameLast: string) {
  return request({
    method: 'post',
    url: '/v1/admin/auth/register',
    data: { email, password, nameFirst, nameLast },
  });
}

export function loginAPI(email: string, password: string) {
  return request({
    url: '/v1/admin/auth/login',
    method: 'post',
    data: { email, password },
  });
}

// test

console.log('test');
registerAPI('test@test.com', 'Pass123456', 'Tom', 'Jerry').then((res) => {
  console.log(res);
}, error => {
  console.log(error);
});
