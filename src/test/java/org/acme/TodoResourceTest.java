package org.acme;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class TodoResourceTest {

    @Test
    public void testTodoEndpoint() {
        given()
          .when().get("/api/todo")
          .then()
             .statusCode(200)
             .body(is("[]"));
    }

}