import request from 'request-promise-native'

class UserService {
  login (name, password) {
    const options = {
      method: 'POST',
      uri: 'http://localhost:3000/',
      body: {
        name,
        password
      },
      json: true // Automatically stringifies the body to JSON
    }
    return request(options)
  }
}

export default new UserService()
