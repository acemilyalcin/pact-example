import {Component} from "react";
import BookClient from "../client/Client";

export default class ListBooks extends Component {
    state = {
        books: []
    }

    bookClient = new BookClient("http://localhost:8080/");

    componentDidMount() {
        this.bookClient.fetch()
            .then(res => {
                const books = res.data
                this.setState({books: books});
            })
    }

    render() {
        return (

            <ul>
                {
                    this.state.books
                        .map(book =>
                            <li>{book.title}</li>
                        )
                }
            </ul>
        )
    }
}