# Quinoa Todo app with React & Vite

## Add extensions

```bash=
quarkus ext add quarkus-hibernate-reactive-rest-data-panache quarkus-resteasy-reactive-jackson quarkus-resteasy-reactive-links reactive-pg-client
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

    @Column(updatable = false, insertable = false)
    @Temporal(value = TemporalType.TIMESTAMP)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    public Date createdAt;

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
return axios.get('/api/todo?sort=-createdAt')
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
            .then(r => {
                this.setState({
                    ...this.state,
                    todo: r.data
                });
            })
    }

    addTodo = (text) => {
        this.setState({
            ...this.state,
            submitDisabled: true
        });
        todoApi.create(text)
            .then(r => {
                this.setState({
                    ...this.state,
                    todo: [{ text: r.data.text, id: r.data.id }, ...this.state.todo]
                });
            })
    }

    removeTodo = (id) => {
        todoApi.delete(id)
            .then(() => {
                this.setState({todo: this.state.todo.filter(todo => todo.id !== id)})
            })
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

