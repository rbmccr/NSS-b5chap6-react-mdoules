const remoteURL = "http://localhost:5002"

class APIManager {

  constructor(resource) {
    this.resource = resource
  }

  get(id) {
    return fetch(`${remoteURL}/${this.resource}/${id}`).then(data => data.json())
  }

  all() {
    return fetch(`${remoteURL}/${this.resource}`).then(data => data.json())
  }

  delete(id) {
    return fetch(`${remoteURL}/${this.resource}/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`${remoteURL}/${this.resource}`))
      .then(e => e.json())
  }
}

export default APIManager