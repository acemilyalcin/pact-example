package com.example;

import au.com.dius.pact.provider.junit5.HttpTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junit5.PactVerificationInvocationContextProvider;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.loader.PactBroker;
import au.com.dius.pact.provider.junitsupport.target.TestTarget;
import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Set;

import static org.mockito.Mockito.when;

@QuarkusTest
@Provider("backend")
@PactBroker(url = "http://localhost:9999")
public class BookContractTest {

    @InjectMock
    BookService bookService;

    @ConfigProperty(name = "quarkus.http.test-port")
    int quarkusPort;

    @TestTarget
    HttpTestTarget target = new HttpTestTarget("localhost", this.quarkusPort);

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    void pactVerificationTestTemplate(PactVerificationContext context) {
        when(bookService.getBooks()).thenReturn(Set.of(new Book("Contract Testing", "XYZ")));
        context.verifyInteraction();
    }

    @BeforeEach
    void beforeEach(PactVerificationContext context) {
        context.setTarget(new HttpTestTarget("localhost", this.quarkusPort));
    }
}