package com.example;

import jakarta.enterprise.context.ApplicationScoped;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Set;

@ApplicationScoped
public class BookService {
    private final Set<Book> books = Collections.newSetFromMap(Collections.synchronizedMap(new LinkedHashMap<>()));

    public Set<Book> getBooks() {
        return books;
    }

    public void addBook(Book book) {
        books.add(book);
    }
}
