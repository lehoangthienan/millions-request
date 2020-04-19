const axios = require('axios')

const mainServerAPI = axios.create()

mainServerAPI.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
mainServerAPI.defaults.timeout = 30000
mainServerAPI.defaults.baseURL = 'http://localhost:3000'

mainServerAPI.interceptors.response.use(
    response => {
        console.log(response.data)
        return response.data
    },
    error => {
      if (error.response) {
        return Promise.reject({ code: error.status, message: error.response.data.message }); // eslint-disable-line
      }
  
      if (error.request) {
        return Promise.reject({ message: 'No response was received' }) // eslint-disable-line
      }
  
      return Promise.reject(error)
    },
  )

for (let i = 0; i< 1000000; i ++) {
    mainServerAPI.post('/test', {
      name: 'An Le'
   })
}
