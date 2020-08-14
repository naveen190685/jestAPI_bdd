import * as request from 'supertest';

export class ApiLib {
    private baseUrl = '';
    private method = '';
    private parameters = new Map();

    public setEndPoint(url: string) {
        this.baseUrl = url;
    }

    public setMethod(apiMethod: string) {
        this.method = apiMethod.toLowerCase();
    }

    public addParameter(param: string, val: string) {
        this.parameters.set(param, val);
    }

    public addParameters(param: string) {
        const myObj = JSON.parse(param);
        for (const value of Object.keys(myObj)) {
            this.parameters.set(value, myObj[value]);
        }
    }

    public async getResponse() {
        if (this.parameters.size !== 0) {
            this.baseUrl = this.baseUrl + '?';
        }
        let i = 0;
        this.parameters.forEach((key, value) => {
            this.baseUrl = this.baseUrl + value + '=' + key;
            if (i < (this.parameters.size - 1)) {
                this.baseUrl = this.baseUrl + '&';
            }
            i = i + 1;
        });
        let obj;
        switch (this.method) {
            case 'get':
                obj = await request('').get(this.baseUrl);

                break;
            case 'post':
                obj = await request('').post(this.baseUrl);

                break;
            default:
                // return new Error('Please enter valid method type for the api');
                break;
        }
        return obj;
    }
}
