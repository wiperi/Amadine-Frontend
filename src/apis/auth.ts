import { request } from '../utils';

export function registerApi(email: string, password: string, nameFirst: string, nameLast: string) {
  return request({
    method: 'post',
    url: '/v1/admin/auth/register',
    data: { email, password, nameFirst, nameLast },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
}

export function loginApi(email: string, password: string) {
  return request({
    url: '/v1/admin/auth/login',
    method: 'post',
    data: { email, password },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
}
