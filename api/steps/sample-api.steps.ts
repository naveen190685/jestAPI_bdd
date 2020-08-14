import { loadFeature, defineFeature } from 'jest-cucumber';
import { ApiLib } from '../helper/apiLib';
import * as request from 'supertest';

const feature = loadFeature('./api/features/sample-api.feature');

defineFeature(feature, (test) => {
    test('Testing a sample api', ({ given, when, then, and }) => {
        jest.setTimeout(15000);
        let myP: Promise<request.Response>;

        const apiTest = new ApiLib();
        given(/user has an API end point (.*)/, (endpoint) => {
            apiTest.setEndPoint(endpoint);
        });

        // and(/user have parameters (.*) and (.*)/, (param1, param2) => {
        //     apiTest.addParameter(param1, param2);
        // });

        and(/api has parameters (.*)/, (param) => {
            apiTest.addParameters(param);
        });

        and(/user has method as (.*)/, (method) => {
            apiTest.setMethod(method);
        });

        when('user fires the request to API', () => {
            // apiTest.getResponse();
        });

        // then(/user should get response code as (\d+)/, (status) => {
        //     console.log("matched");
        // });

        // then(/user should get response code as (\d*)/, (status) => {
        //     console.log("matched");
        // });

        // then(/user should get response code as (\\d*)/, (status) => {
        //     console.log("matched");
        // });

        then(/user should get response code as ([0-9]*)/, (status) => {
            myP = new Promise<request.Response>((resolve, reject) => {
                apiTest.getResponse().then((data) => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
            });
            return expect(myP.then((result) => {
                    expect(result['status']).toEqual(Number(status));
                    return true;
                }).catch((err) => {
                    console.error('ERROR => ' + err);
                }).finally(() => {
                    console.log('END OF TEST');
                })
            ).resolves.toBeTruthy();
        });
    });
});
