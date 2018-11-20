import APIManager from "./APIManager"

const remoteURL = "http://localhost:5002"

class AnimalManager extends APIManager {

  getAll() {
    return this.all()
  }

  getAnimal(id) {
    return this.get(id)
  }

  removeAnimal(id) {
    return this.delete(id)
  }

}

export default new AnimalManager("animals")