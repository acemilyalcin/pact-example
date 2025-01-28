import axios from "axios";

class BookClient {
    constructor(host) {
        this.host = host;
    }

    headers = {"Accept": "application/json"};

    create(book) {
        return axios.post(`${this.host}/book`, book, {headers: this.headers})
    }

    fetch() {
        return axios.get(`${this.host}/book`, {headers: this.headers})
    }
}

export default BookClient;