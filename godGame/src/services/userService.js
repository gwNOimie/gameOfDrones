import request from 'request-promise-native'

class UserService {
  login (user, password) {
    const options = {
      method: 'POST',
      uri: 'http://localhost:3000',
      body: {
        user,
        password
      },
      json: true // Automatically stringifies the body to JSON
    }
    return request(options)
  }
}

export default new UserService()
