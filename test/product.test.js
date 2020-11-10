const request = require('supertest');
const app = require("../app");
const { User, sequelize } = require('../models');
const jwt = require('jsonwebtoken');
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
      email: user.email
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
      request(app)
        .post('/product')
        .set('token', userToken)
        .set('Accept', 'application/json')
        .send({
          name: 'bakpao daging',
          image_url: 'https://selerasa.com/wp-content/uploads/2016/09/images_bakpao-daging-ayam.png',
          price: 12000,
          stock: 10
        })
        .end((err, res) => {
          if(err) return done(err)
          else{
            const {status, body} = res
            expect(body).not.toBeNull()
            expect(status).toBe(201);
            expect(body).toHaveProperty('msg', 'success add product');
            expect(body).toHaveProperty('product', 'bakpao daging');
            done();
          }
        })
    });
  
    it(`Create Product with an Empty "name"`, function(done) {
      const dataTest = {
          name: '',
          image_url: 'https://selerasa.com/wp-content/uploads/2016/09/images_bakpao-daging-ayam.png',
          price: 12000,
          stock: 10
      }
      let errors = ['name is required']
      request(app)
        .post('/product')
        .set('token', userToken)
        .set('Accept', 'application/json')
        .send(dataTest)
        .end((err, res) => {
          if(err) return done(err)
          else{
            const { status, body } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty('errors', expect.any(Array))
            expect(body.errors).toEqual(errors);
            done();
          }
      })
    });
      
      it(`Create Product with wrong "image_url" format`, function(done) {
        const dataTest = {
          name: 'bakpao daging',
          image_url: 'bakpaodapgingppng',
          price: 12000,
          stock: 10
        }
        let errors = ['input must be url']
        return request(app)
        .post('/product')
        .set('token', userToken)
        .set('Accept', 'application/json')
        .send(dataTest)
        .then((response) => {
          const { status, body } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('errors', expect.any(Array))
        expect(body.errors).toEqual(errors)
        done();
      })
      .catch(err => {
        // console.log(err);
        done(err);
      })
    });
  
    test(`Create Product with negative "price" value`, function(done) {
      const dataTest = {
          name: 'bakpao daging',
          image_url: 'https://selerasa.com/wp-content/uploads/2016/09/images_bakpao-daging-ayam.png',
          price: -12000,
          stock: 10
      }
      request(app)
      .post('/product')
      .set('token', userToken)
      .set('Accept', 'application/json')
      .send({
        name: 'bakpao daging',
        image_url: 'https://selerasa.com/wp-content/uploads/2016/09/images_bakpao-daging-ayam.png',
        price: -12000,
        stock: 10
      })
      .end((err, response) => {
        if(err) return done(err)
        else{
          let errors = [{msg:'price must be greater than zero'}]
            const { status, body } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty('errors', expect.any(Array))
            expect(body.errors).toEqual(errors);
            return done();
          }
      })
    });
  
    test(`Create Product with negative "stock" value`, function(done) {
      const dataTest = {
          name: 'bakpao daging',
          image_url: 'https://selerasa.com/wp-content/uploads/2016/09/images_bakpao-daging-ayam.png',
          price: 12000,
          stock: -10
      }
      // console.log(dataTest, 'ini datatest')
      request(app)
      .post('/product')
        .set('token', userToken)
        .set('Accept', 'application/json')
        .send({
          name: 'bakpao daging',
          image_url: 'https://selerasa.com/wp-content/uploads/2016/09/images_bakpao-daging-ayam.png',
          price: 12000,
          stock: -10
      })
        .end((err, res) => {
          if(err) return done(err)
          else{
            let errorrr = [{msg:'stock must be greater than zero'}]
            const { status, body } = res;
            // console.log(res.body.errors, 'darti stock errror yang price masih masuk')
            expect(status).toBe(400);
            expect(body).toHaveProperty('errors', expect.any(Array))
            expect(body.errors).toEqual(errorrr);
            return done();
        }
        })
    });
  });

describe('GET /product', () => {
  it('Get all product', (done) => {
    return request(app)
      .get('/product')
      .set('token', userToken)
      .set('Accept', 'application/json')
      .then(res => {
        // console.log(res.body, res.status)
        const { status, body } = res
        expect(status).toBe(200)
        expect(body).not.toBeNull()
        expect(body).toHaveProperty('dataProduct', expect.any(Array))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Failed authentication', (done) => {
    let token = '' // token kosong
    let errors = ['Authentication failed']
    return request(app)
    .get('/product')
    // .set('token', token)
    .set('Accept', 'application/json')
    .then(res => {
      // console.log(res.body)
      const { status, body } = res
      expect(status).toBe(400)
      expect(body).not.toBeNull()
      expect(body.errors).toEqual(errors)
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})

describe('GET /product/:id', () => {
  it('Get product by id', (done) => {
    let target = 1
    return request(app)
    .get('/product/' + target)
    .set('token', userToken)
    .set('Accept', 'application/json')
    .then(res => {
      // console.log(res.body)
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
  it('Product Not found', (done) => {
    let target = 0
    return request(app)
      .delete('/product/' + target)
      .set('token', userToken)
      .set('Accept', 'application/json')
      .then(res => {
        const { status, body } = res
        expect(status).toBe(404)
        expect(body).toHaveProperty('errors', expect.any(Array))
        expect(body).not.toBeNull()
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
describe('PUT /product/:id', () => {
  it('Update product', (done) => {
    let target = 1
    let dataUpdate = {
      name: 'rog',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/7/22/64681733/64681733_125efcea-de08-4ecf-a8aa-dd6818e68c9c_721_721',
      price: 10000000,
      stock: 2
    }
    return request(app)
      .put('/product/' + target)
      .set('token', userToken)
      .set('Accept', 'application/json')
      .send(dataUpdate)
      .then(res => {
        const { status, body } = res
        // console.log(res.body)
        expect(status).toBe(200)
        expect(body).not.toBeNull()
        expect(body).toHaveProperty('msg', 'success update product')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it(`Update Product with wrong empty input`, function(done) {
    const dataTest = {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
    let errors = [{msg: 'price must be greater than zero'}, {msg: 'stock must be greater than zero'},'name is required', 'image url is required','input must be url', 'price is required', 'stock is required']
    return request(app)
    .post('/product')
    .set('token', userToken)
    .set('Accept', 'application/json')
    .send(dataTest)
    .then((response) => {
      const { status, body } = response;
      expect(status).toBe(400);
      expect(body).toHaveProperty('errors', expect.any(Array))
    expect(body.errors).toEqual(errors)
    done();
  })
  .catch(err => {
    // console.log(err);
    done(err);
  })
});
  it('Update product not found id', (done) => {
    let target = 0
    let dataUpdate = {
      name: 'rog',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/7/22/64681733/64681733_125efcea-de08-4ecf-a8aa-dd6818e68c9c_721_721',
      price: 10000000,
      stock: 2
    }
    return request(app)
      .put('/product/' + target)
      .set('token', userToken)
      .set('Accept', 'application/json')
      .send(dataUpdate)
      .then(res => {
        const { status, body } = res
        // console.log(res.body)
        expect(status).toBe(404)
        expect(body).toHaveProperty('errors', expect.any(Array))
        expect(body).not.toBeNull()
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Update product with negative price and stock', (done) => {
    let target = 1
    let dataUpdate = {
      name: 'rog',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/7/22/64681733/64681733_125efcea-de08-4ecf-a8aa-dd6818e68c9c_721_721',
      price: -10000000,
      stock: -2
    }
    return request(app)
      .put('/product/' + target)
      .set('token', userToken)
      .set('Accept', 'application/json')
      .send(dataUpdate)
      .then(res => {
        const { status, body } = res
        // console.log(res.body)
        let errorrr = [{msg: 'price must be greater than zero'},{msg:'stock must be greater than zero'}]
        expect(status).toBe(400);
        expect(body).toHaveProperty('errors', expect.any(Array))
        expect(body.errors).toEqual(errorrr);
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
describe('DELETE /product/:id', () => {
  it('Delete product by id', (done) => {
    let target = 1
    return request(app)
      .delete('/product/' + target)
      .set('token', userToken)
      .set('Accept', 'application/json')
      .then(res => {
        const {status, body} = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('msg', 'Product deleted')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  
  it('Product Not found', (done) => {
    let target = 0
    return request(app)
      .delete('/product/' + target)
      .set('token', userToken)
      .set('Accept', 'application/json')
      .then(res => {
        const { status, body } = res
        expect(status).toBe(404)
        expect(body).toHaveProperty('errors', expect.any(Array))
        expect(body).not.toBeNull()
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})