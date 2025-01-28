import {Component} from "react";
import BookClient from "../client/Client";

export default class AddBook extends Component {
    state = {
        title: "",
        author: ""
    }

    bookClient = new BookClient("http://localhost:8080/");

    handleTitleChange = event => {
        this.setState({title: event.target.value});
    }

    handleAuthorChange = event => {
        this.setState({author: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author
        };

        this.bookClient.create(book)
            .then(res => {
                console.log(res.data);
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" onChange={this.handleTitleChange}/>
                    </label>
                    <br/>
                    <label>
                        Author:
                        <input type="text" name="author" onChange={this.handleAuthorChange}/>
                    </label>
                    <br/>
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}