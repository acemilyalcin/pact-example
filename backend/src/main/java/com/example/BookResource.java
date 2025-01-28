package com.example;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

import java.util.Set;

@Path("book")
public class BookResource {

    @Inject
    BookService bookService;

    @GET
    public Set<Book> list() {
        return bookService.getBooks();
    }

    @POST
    public Response add(Book book) {
        bookService.addBook(book);
        return Response.ok(book).build();
    }
}
