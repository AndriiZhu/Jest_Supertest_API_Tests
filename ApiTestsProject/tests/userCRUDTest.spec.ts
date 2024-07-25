import { environment } from '../config/environment'
import * as functions from '../functions/userFunctions'
import { createRandomUserData } from "../data/userdata";

var newUserId;

describe('User CRUD requests', () => {

    it('Create new user', async () => {
        const response = await functions.postRequest('/users', environment.bearerToken, createRandomUserData())

        expect(response.status).toBe(201)
        newUserId = response.body.id
    })

    it('Update created user data', async () => {
        const data = createRandomUserData()

        // Get request
        const getResponse = await functions.getRequest('/users', environment.bearerToken)
        const getResponseBody = JSON.parse(await getResponse.text)

        var userBeforeUpdate

        getResponseBody.forEach(user => {
            if (user.id == newUserId) {
                userBeforeUpdate = user
                return
            }
        });

        expect(getResponse.status).toBe(200)

        // Patch request
        const patchResponse = await functions.patchRequest(`/users/${newUserId}`, environment.bearerToken, data)

        expect(patchResponse.status).toBe(200)
        expect(patchResponse.body.name).not.toBe(userBeforeUpdate.name)
        expect(patchResponse.body.email).not.toBe(userBeforeUpdate.email)
        expect(patchResponse.body.name).toBe(data.name)
        expect(patchResponse.body.email).toBe(data.email)
    })

    it('Delete created user', async () => {
        // Delete request
        const response = await functions.deleteRequest(`/users/${newUserId}`, environment.bearerToken)

        expect(response.status).toBe(204)

        // Get request
        const getResponse = await functions.getRequest('/users', environment.bearerToken)
        const getResponseBody = JSON.parse(await getResponse.text)

        var userIsDeleted = true

        getResponseBody.forEach(user => {
            if (user.id == newUserId) {
                userIsDeleted = false;
                return console.error(`User ${newUserId} is not deleted`);
            }
        });

        expect(userIsDeleted).toBe(true);

    })
})
