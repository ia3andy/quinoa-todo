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
