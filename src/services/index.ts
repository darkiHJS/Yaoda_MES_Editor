import request from './request';

export async function getTemplateJSON() {
  return request('api/template');
}

export async function getFreeApi(api: string) {
  return request(api);
}
