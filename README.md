# Quinoa Todo app with React & Vite

## Add extensions

```bash=
quarkus ext add quarkus-hibernate-reactive-rest-data-panache quarkus-resteasy-reactive-jackson reactive-pg-client
```

## Supersonic Subatomic CRUD backend 

```properties
quarkus.rest.path=/api

quarkus.datasource.db-kind=postgresql
quarkus.hibernate-orm.database.generation=drop-and-create
```

```java
@ResourceProperties(path = "/todo")
public interface TodoResource extends PanacheEntityResource<TodoEntity, Long> {
}

@Entity
public class TodoEntity extends PanacheEntity {
    public String text;
}
```

## Http headers for the Web UI

```properties
quarkus.http.filter.others.header.Cache-Control=no-cache
quarkus.http.filter.others.matches=/.*
quarkus.http.filter.others.methods=GET
quarkus.http.filter.others.order=0
quarkus.http.filter.static.header.Cache-Control=max-age=31536000
quarkus.http.filter.static.matches=/static/.+
quarkus.http.filter.static.methods=GET
quarkus.http.filter.static.order=1
```


## Frontend Api using Axios

```javascript
import axios from "axios";

export class TodoApi {
async list() {
return axios.get('/api/todo?sort=-id')
.catch(error => {
console.error(error);
});
}

    async create(text) {
        return axios.post('/api/todo', {text})
            .catch(error => {
                console.error(error);
            });
    }

    async delete(id) {
        return axios.delete(`/api/todo/${id}`)
            .catch(error => {
                console.error(error);
            });
    }
}

const todoApi = new TodoApi();
export default todoApi;
```

## Plug component to Api
```javascript
    componentDidMount() {
        todoApi.list()
            .then(r => this.updateTodoState(r.data));
    }
    
    addTodo = (text) => {
        this.updateSubmitDisabledState(true);
        todoApi.create(text)
            .then(r => this.updateTodoState( [{ text: r.data.text, id: r.data.id }, ...this.state.todo]));
    }
    
    removeTodo = (id) => {
        todoApi.delete(id)
            .then(() => this.updateTodoState(this.state.todo.filter(todo => todo.id !== id)));
    }

```

## Testing

```xml
    <dependency>
      <groupId>io.quarkiverse.quinoa</groupId>
      <artifactId>quarkus-quinoa-testing</artifactId>
      <version>1.0.5</version>
      <scope>test</scope>
    </dependency>
```

```java
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Response;
import io.quarkiverse.quinoa.testing.QuarkusPlaywrightManager;
import io.quarkiverse.quinoa.testing.QuinoaTestProfiles;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.TestProfile;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.net.URL;

@QuarkusTest
@TestProfile(QuinoaTestProfiles.Enable.class)
@QuarkusTestResource(QuarkusPlaywrightManager.class)
public class TodoWebUITest {

    @QuarkusPlaywrightManager.InjectPlaywright
    BrowserContext context;

    @TestHTTPResource("/")
    URL url;

    @Test
    void testContent() {
        final Page page = context.newPage();
        Response response = page.navigate(url.toString());
        Assertions.assertEquals("OK", response.statusText());

        page.waitForLoadState();

        String title = page.title();
        Assertions.assertEquals("Quinoa Demo", title);

        // Make sure the app content is ok
        String greeting = page.innerText("h1");
        Assertions.assertEquals("Ola Quinoa", greeting);
    }
}

```

## SPA routing

```properties
quarkus.quinoa.enable-spa-routing=true
```

```javascript
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Button from "./components/Button";

const App = () =>  {
  return(
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/todo" element={<TodoPage />} />
          </Routes>
      </BrowserRouter>
    );
}

const HomePage = () => {
    return(
        <div style={{ margin: '0 auto', maxWidth: '500px', textAlign: 'center' }}>
            <Title>Hello Quinoa</Title>
            <Link to="/todo"><Button>Todo</Button></Link>
        </div>
    );
}
```

## Docker native

```bash=
quarkus build --clean --native -Dquarkus.native.container-build=true -DskipTests
docker build -f src/main/docker/Dockerfile.native-micro -t quarkus/quinoa-todo .
docker-compose up
```


