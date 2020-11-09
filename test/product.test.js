const request = require('supertest');
const app = require("../app");
const { User, sequelize } = require('../models');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const { queryInterface, Sequelize } = sequelize;

let userToken = ''
const userData = {
    email: 'admin@mail.com',
    password: '123456',
    role: 'admin'
}
beforeAll(done => {
  User.findOne({where: {email: userData.email}})
  .then(user => {
    userToken = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }, process.env.SECRET );
    done();
  })
  .catch(err => {
    done(err);
  })
})

afterAll(async (done) => {
  try {
    await queryInterface.dropTable('Products');
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER
      }
    });
    done();
  } catch (err) {
    done(err);
  }
})


describe('POST /product', function() {
    it('Create Product', function(done) {
      return request(app)
        .post('/product')
        .set('token', userToken)
        .set('Accept', 'application/json')
        .send({
          name: 'bakpao daging',
          image_url: 'https://selerasa.com/wp-content/uploads/2016/09/images_bakpao-daging-ayam.png',
          price: 12000,
          stock: 10
        })
        .then((res) => {
          const {status, body} = res
          expect(body).not.toBeNull()
          expect(status).toBe(201);
          expect(body).toHaveProperty('msg', 'success add product');
          expect(body).toHaveProperty('product', 'bakpao daging');
          done();
        })
        .catch(err => {
          done(err);
        })
    });
  
    // it(`Create Product with an Empty "name"`, function(done) {
    //   const dataTest = {
    //       name: '',
    //       image_url: 'https://selerasa.com/wp-content/uploads/2016/09/images_bakpao-daging-ayam.png',
    //       price: 12000,
    //       stock: 10
    //   }
    //   let errors = ['name is required']
    //   return request(app)
    //     .post('/product')
    //     .set('token', userToken)
    //     .set('Accept', 'application/json')
    //     .send(dataTest)
    //   .then((response) => {
    //     const { status, body } = response;
    //     expect(status).toBe(400);
    //     expect(body).toHaveProperty('errors', expect.any(Array))
    //     expect(body.errors).toEqual(errors);
    //     done();
    //   })
    //   .catch(err => {
      //     // console.log(err);
      //     done(err);
      //   })
      // });
      
    //   it(`Create Product with wrong "image_url" format`, function(done) {
    //     const dataTest = {
    //       name: 'bakpao daging',
    //       image_url: 'bakpaodapgingppng',
    //       price: 12000,
    //       stock: 10
    //     }
    //     let errors = ['input must be url']
    //     return request(app)
    //     .post('/product')
    //     .set('token', userToken)
    //     .set('Accept', 'application/json')
    //     .send(dataTest)
    //     .then((response) => {
    //       const { status, body } = response;
    //       expect(status).toBe(400);
    //       expect(body).toHaveProperty('errors', expect.any(Array))
    //     expect(body.errors).toEqual(errors)
    //     done();
    //   })
    //   .catch(err => {
    //     // console.log(err);
    //     done(err);
    //   })
    // });
  
    // it(`Create Product with negative "price" value`, function(done) {
    //   const dataTest = {
    //       name: 'bakpao daging',
    //       image_url: 'https://selerasa.com/wp-content/uploads/2016/09/images_bakpao-daging-ayam.png',
    //       price: -12000,
    //       stock: 10
    //   }
    //   let errors = [{msg:'price must be greater than zero'}]
    //   return request(app)
    //     .post('/product')
    //     .set('token', userToken)
    //     .set('Accept', 'application/json')
    //     .send(dataTest)
    //   .then((response) => {
    //     // console.log(response.body.errors)
    //     const { status, body } = response;
    //     expect(status).toBe(400);
    //     expect(body).toHaveProperty('errors', expect.any(Array))
    //     expect(body.errors).toEqual(errors);
    //     done();
    //   })
    //   .catch(err => {
    //     // console.log(err);
    //     done(err);
    //   })
    // });
  
  //   it(`Create Product with negative "stock" value`, function(done) {
  //     const dataTest = {
  //         name: 'bakpao daging',
  //         image_url: 'https://selerasa.com/wp-content/uploads/2016/09/images_bakpao-daging-ayam.png',
  //         price: 12000,
  //         stock: -10
  //     }
  //     let errors = [{msg:'stock must be greater than zero'}]
  //     return request(app)
  //       .post('/product')
  //       .set('token', userToken)
  //       .set('Accept', 'application/json')
  //       .send(dataTest)
  //     .then((response) => {
  //       const { status, body } = response;
  //       expect(status).toBe(400);
  //       expect(body).toHaveProperty('errors', expect.any(Array))
  //       expect(body.errors).toEqual(errors);
  //       done();
  //     })
  //     .catch(err => {
  //       // console.log(err);
  //       done(err);
  //     })
  //   });
  
  });

// describe('GET /product', () => {
//   it('Get all product', (done) => {
//     return request(app)
//       .get('/product')
//       .set('token', userToken)
//       .set('Accept', 'application/json')
//       .then(res => {
//         console.log(res.body, res.status)
//         const { status, body } = res
//         expect(status).toBe(200)
//         expect(body).not.toBeNull()
//         expect(body).toHaveProperty('dataProduct', expect.any(Array))
//         done()
//       })
//       .catch(err => {
//         done(err)
//       })
//   })
// })

describe('GET /product/:id', () => {
  it('Get product by id', (done) => {
    let target = 1
    return request(app)
    .get('/product/' + target)
    .set('token', userToken)
    .set('Accept', 'application/json')
    .then(res => {
      console.log(res.body)
      const { status, body } = res
      expect(status).toBe(200)
      expect(body).not.toBeNull()
      expect(body).toHaveProperty('dataProduct', expect.any(Object))
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})

// describe('DELETE /product/:id', () => {
//   it('Delete product by id', (done) => {
//     let target = 1
//     return request(app)
//       .delete('/product/' + target)
//       .set('token', userToken)
//       .set('Accept', 'application/json')
//       .then(res => {
//         const {status, body} = res
//         expect(status).toBe(200)
//         expect(body).toHaveProperty('msg', 'Product deleted')
//         done()
//       })
//       .catch(err => {
//         done(err)
//       })
//   })
// })