import request from "./request"

export async function getTemplateJSON() {
  return request('api/template')
}