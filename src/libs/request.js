/**@module request*/

import fetch from "isomorphic-unfetch";

/**
 * request - description
 *
 * @param  {string} url            RESTful API resource URL
 * @param  {string} method = "GET" HTTP method
 * @param  {object} data           description
 * @returns {object}               HTTP response
 */
export default async function request(url, method = "GET", data) {
  const res = await fetch(url, {
    method: method,
    body: JSON.stringify(data)
  });
  return res.json();
}

/**
 * create - alias for request() with POST method parameter
 *
 * @param  {string} url  RESTful API resource URL
 * @param  {object} data description
 * @returns {object}     HTTP response
 */
export async function create(url, data) {
  return request(url, "POST", data);
}

/**
 * update - alias for request() with PUT method parameter
 *
 * @param  {string} url  RESTful API resource URL
 * @param  {object} data description
 * @returns {object}     HTTP response
 */
export async function update(url, data) {
  return request(url, "PUT", data);
}

/**
 * delete - alias for request() with DELETE method parameter
 *
 * @param  {string} url  RESTful API resource URL
 * @param  {object} data description
 * @returns {object}     HTTP response
 */
export async function del(url, data) {
  return request(url, "DELETE", data);
}
