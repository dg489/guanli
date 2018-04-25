import axios from 'axios'

export function getdate(url, params={}) {
	return new Promise((resolve, reject) => {
		axios.get(url,{
			params: params
		})
		.then(response => {
			resolve(response.data)
		})
		.catch(err => {
			reject(err)
		})
	})
}

export function postdate(url, data ={}) {
	return new Promise((resolve,reject) =>{
		axios.post(url,data)
		.then(response => {
			
		})
		.catch(err => {
			reject(err)
		})
	})
}
 