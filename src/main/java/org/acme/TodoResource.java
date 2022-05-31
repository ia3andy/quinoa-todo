package org.acme;

import io.quarkus.hibernate.reactive.rest.data.panache.PanacheEntityResource;
import io.quarkus.rest.data.panache.ResourceProperties;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@ResourceProperties(path = "/todo")
public interface TodoResource extends PanacheEntityResource<TodoEntity, Long> {
}