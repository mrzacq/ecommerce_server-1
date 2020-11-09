const request = require('supertest')
const app = require('../app')

describe('Post login success', () => {
    it('Should send object with key email, token, code, msg', (done) => {
        let dataLogin = {
            email: 'admin@mail.com',
            password: "123456",
            role: 'admin'
        }
        return request(app)
            .post('/login')
            .send(dataLogin)
            .then((res) => {
                expect(res).not.toBeNull()
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('email', 'admin@mail.com')
                expect(res.body).toHaveProperty('code', 200)
                expect(res.body).toHaveProperty('role', 'admin')
                expect(res.body).toHaveProperty('msg', 'login succesfully')
                expect(res.body).not.toHaveProperty('password')
                done()
            })
    })
})

describe('POST login failed', function() {
    it('Respon with msg invalid email or password', (done) => {
        let dataLogin = {
            email: 'admin@mail.com',
            password: "12346",
            role: 'admin'
        }
        let errors = ['invalid email or password']
        return request(app)
            .post('/login')
            .send(dataLogin)
            .then((res) => {
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(errors)
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    it('Respon with admin only', (done) => {
        let dataLogin = {
            email: 'admin@mail.com',
            password: "123456",
            role: 'customer'
        }
        return request(app)
            .post('/login')
            .send(dataLogin)
            .then((res) => {
                expect(res.status).toBe(403)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(['invalid email or password','admin only'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// describe('POST login failed', function() {
//     it('Respon with admin only', (done) => {
//         let dataLogin = {
//             email: 'admin@mail.com',
//             password: "123456",
//             role: 'customer'
//         }
//         return request(app)
//             .post('/login')
//             .send(dataLogin)
//             .then((res) => {
//                 expect(res.status).toBe(403)
//                 expect(res.body).toHaveProperty('errors', expect.any(Array))
//                 expect(res.body.errors).toEqual(['admin only'])
//                 done()
//             })
//     })
// })