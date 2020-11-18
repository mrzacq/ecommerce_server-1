# Ecommerce-Server
Ecommerce-Server is an application to manage your assets. This app has :
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /login
>Login into registered account

_Request Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    "email": <string>,
    "password": <string>
}
```
_Response (200 - OK)_
```
{
    "token": <automated by jwt>
}
```

_Response (403 - Forbidden)_
```
{
    "errors": [
        "invalid email or password"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "internal server error"
    ]
}
```
---
### POST /register
>register account

_Request Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    "email": <string>,
    "password": <string>
}
```
_Response (200 - OK)_
```
{
    "email": "email",
    "msg": "register success"
}
```

_Response (400 - Bad Requests)_
>if email already exist
```
{
    "errors": [
        "email must be unique",
        "email already exist"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "internal server error"
    ]
}
```
---

### POST /product
>Create product after login only for admin

_Request Params_
```
Not needed
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
{
    "name": <string>,
    "image_url": <string>,
    "price": <integer>,
    "stock": <integer>
}
```
_Response (200 - OK)_
```
{
    "msg": 'sucess add product',
    "product": <product name>
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "name is required",
        "image url is required",
        "image must be url",
        "price is required",
        "price must be greater than zero",
        "stock is required",
        "stock must be greater than zero"
    ]
}
```
_Response (403 - Forbidden)_
```
{
    "errors": [
        "admin only"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "Product not found"
    ]
}
```
---
### GET /product
>Get all product that created by admin

_Request Params_
```
Not needed
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "dataProduct": {
        "id": <auto increment>,
        "name": <string>,
        "image_url": <string>,
        "price": <integer>,
        "UserId": <id admin>,
        "updatedAt": "2020-11-03T14:20:23.225Z",
        "createdAt": "2020-11-03T14:20:23.225Z",
        "User": <exclude password>
    }
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "Product not found"
    ]
}
```

---
### GET /product/:id
>Get product by id that created by admin

_Request Params_
```
req.params.id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "dataProduct": {
        "id": <auto increment>,
        "name": <string>,
        "image_url": <string>,
        "price": <integer>,
        "UserId": <id admin>,
        "updatedAt": "2020-11-03T14:20:23.225Z",
        "createdAt": "2020-11-03T14:20:23.225Z",
        "User": <exclude password>
    }
}
```

_Response (400 - Bad Requests)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "Product not found"
    ]
}
```
---
### PUT /product
>Update task only by admin

_Request Params_
```
req.params.id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
{
    "name": <string>,
    "image_url": <string>,
    "price": <integer>,
    "stock": <integer>
}
```
_Response (200 - OK)_
```
{
    "msg": "success update product"
}
```

_Response (400 - Bad Requests)_
```
{
    "errors": [
        "Authentication failed",
        "Not authorized"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "errors": [
        "product not found"
    ]
}
```
_Response (403 - Forbidden)_
```
{
    "errors": [
        "admin only"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "Product not found"
    ]
}
```
---

### DELETE /product/:id
>Delete product by id only for admin

_Request Params_
```
req.params.id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - Ok)_
```
{
    "msg": "Product deleted"
}
```

_Response (400 - Bad Requests)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
_Response (404 - Not found)_
```
{
    "errors": [
        "Product not found"
    ]
}
```
_Response (403 - Forbidden)_
```
{
    "errors": [
        "admin only"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "Product not found"
    ]
}
```
---

# * CART *
## GET /cart
>Get all cart that created by user

_Request Params_
```
Not needed
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "data": [
        {
            "id": <automated>,
            "quantity": <integer>,
            "ProductId": <integer>,
            "UserId": <integer>,
            "status": <booleant>,
            "createdAt": "2020-11-18T11:38:49.065Z",
            "updatedAt": "2020-11-18T11:39:19.692Z",
            "Product": {...}
        }
    ]
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
---
## POST /cart/:id
>Post cart that created by user and id Product

_Request Params_
```
req.params.id || url/:id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "cart": {
        "id": <automated>,
        "ProductId": <integer>,
        "UserId": <integer>,
        "quantity": <integer>,
        "status": <boolean>,
        "updatedAt": "2020-11-18T12:06:27.226Z",
        "createdAt": "2020-11-18T12:06:27.226Z"
    },
    "msg": "succes add to cart"
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
---
## PATCH /cart/:id
>Update quantity cart that created by user and id cart

_Request Params_
```
req.params.id || url/:id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
{
    "quantity": 1
}
```
_Response (200 - OK)_
```
{
    "data": [
        1
    ],
    "msg": "succes update quantity"
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Authentication failed" or "not authorized"
    ]
}
```
---
## PUT /cart/:id
>Checkout cart and update status to false

_Request Params_
```
req.params.id || url/:id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
{
    "status": <boolean>,
    "ProductId": <integer>,
    "quantity": <integer>
}
```
_Response (200 - OK)_
```
{
    "data": [
        1
    ],
    "msg": "succes checkout"
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Authentication failed" or "not authorized"
    ]
}
```
---
## DELETE /cart/:id
>Delete cart from params id that refer to cart id

_Request Params_
```
req.params.id || url/:id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "msg": "success delete cart"
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Authentication failed" or "not authorized"
    ]
}
```
---

# * BANNER *
### POST /banner
>Create banner after login only for admin

_Request Params_
```
Not needed
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
{
    "title": <string>,
    "image_url": <string>,
    "status": <boolean>
}
```
_Response (200 - OK)_
```
{
    "data": [
        {
            "id": <automated>,
            "title": <string>,
            "image_url": <string>,
            "status": <string>,
            "category": <string>,
            "createdAt": "2020-11-13T14:48:58.583Z",
            "updatedAt": "2020-11-14T01:58:53.082Z",
            "UserId": <integer>
        }...
    ]
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "title is required",
        "image url is required",
        "image must be url",
        "status is required"
    ]
}
```
_Response (403 - Forbidden)_
```
{
    "errors": [
        "admin only"
    ]
}
```
---
### GET /banner
>Get all banner that created by admin

_Request Params_
```
Not needed
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "data": [
        {
            "id": <automated>,
            "title": <string>,
            "image_url": <string>,
            "status": <string>,
            "category": <string>,
            "createdAt": "2020-11-13T14:48:58.583Z",
            "updatedAt": "2020-11-14T01:58:53.082Z",
            "UserId": <integer>
        }...
    ]
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
---
### GET /banner/:id
>Get by by id that created by admin

_Request Params_
```
req.params.id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "data": [
        {
            "id": <automated>,
            "title": <string>,
            "image_url": <string>,
            "status": <string>,
            "category": <string>,
            "createdAt": "2020-11-13T14:48:58.583Z",
            "updatedAt": "2020-11-14T01:58:53.082Z",
            "UserId": <integer>
        }
    ]
}
```

_Response (400 - Bad Requests)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "banner not found"
    ]
}
```
---
### PUT /banner
>Update banner only by admin

_Request Params_
```
req.params.id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
{
    "title": <string>,
    "image_url": <string>,
    "status": <boolean>
}
```
_Response (200 - OK)_
```
{
    "data": [
        1
    ],
    "msg": "succes update banner"
}
```

_Response (400 - Bad Requests)_
```
{
    "errors": [
        "Authentication failed",
        "Not authorized"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "errors": [
        "banner not found"
    ]
}
```
_Response (403 - Forbidden)_
```
{
    "errors": [
        "admin only"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "banner not found"
    ]
}
```
---

### DELETE /banner/:id
>Delete banner by id only for admin

_Request Params_
```
req.params.id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - Ok)_
```
{
    "msg": "succes delete baner"
}
```

_Response (400 - Bad Requests)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
_Response (404 - Not found)_
```
{
    "errors": [
        "banner not found"
    ]
}
```
_Response (403 - Forbidden)_
```
{
    "errors": [
        "admin only"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "banner not found"
    ]
}
```
---