# mini-wp

## List of Routes:

| Route                                                     | HTTP   | Request                                                      | On Success                                        | On Error                                         | Description                                 |
| --------------------------------------------------------- | ------ | ------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------ | ------------------------------------------- |
| <span style="color:#0000ff">/users</span>                 | GET    |                                                              | Status: 201<br />Body: all User                   | Status: 500<br />Message: internal server error  | Find all users info                         |
| <span style="color:#0000ff">/users/:id</span>             | GET    |                                                              | Status: 200<br />Body: found User                 | Status: 404<br />Message: not Found              | Find user by ID                             |
| <span style="color:#0000ff">/users</span>                 | POST   | (BODY)<br />name:String(required)<br /><br />email:String(required)<br />password:String(required) | Status:201<br />Body: new User                    | Status: 500<br />Message: internal server error  | Create a new user                           |
| <span style="color:#0000ff">/users/login</span>           | POST   | (BODY)<br />email:String(required)<br />password:String(required) | Status:200<br />Body: token, userId               | Status: 403<br />Message: email/passowrd wrong   | User Login                                  |
| <span style="color:#0000ff">/users/:id</span>             | PUT    | (BODY)<br />name:String<br /><br />email:String              | Status:200<br />Body: updated User                | Status: 404<br />Message: not Found              | Update a new user                           |
| <span style="color:#0000ff">/users/:id</span>             | DELETE |                                                              | Status: 200<br />Body: Deleted User               | Status: 404<br />Message: not Found              | Delete a user                               |
| <span style="color:#0000ff">/users/verify</span>          | GET    | (HEADER)<br />token:String                                   | Status:200<br />Body: msg: 'user authenticated'   | Status: 401<br />Message: user not authenticated | Verify a User                               |
| <span style="color:#0000ff">/articles</span>              | GET    |                                                              | Status: 200<br />Body: all Article                | Status: 500<br />Message: internal server error  | Find all article info                       |
| <span style="color:#0000ff">/articles/:id</span>          | GET    |                                                              | Status: 200<br />Body: found Todo                 | Status: 404<br />Message: not Found              | Find article by id                          |
| <span style="color:#0000ff">/articles</span>              | POST   | (BODY)<br />title:String(required)<br />content:String(required)<br />photo:String(required)<br />userId:String(required) | Status:201<br />Body: new Article                 | Status: 500<br />Message: internal server error  | Create new article by user                  |
| <span style="color:#0000ff">/articles/user/:userId</span> | GET    |                                                              | Status:201<br />Body: all Article find by user id | Status: 500<br />Message: internal server error  | Find article by userId                      |
| <span style="color:#0000ff">/articles/:id</span>          | PATCH  | (BODY)<br />title:String<br />content:String<br />photo:String<br /> | Status: 200<br />Body: updated Article            | Status: 404<br />Message: not Found              | Update an article                           |
| <span style="color:#0000ff">/articles/:id</span>          | DELETE |                                                              | Status: 200<br />Body: deleted Article            | Status: 404<br />Message: not Found              | Delete an article                           |
| <span style="color:#0000ff">/articles/like/:id</span>     | PATCH  |                                                              | Status: 200<br />Body: liked Article              | Status: 500<br />Message: internal server error  | Like an Article, Article like attribute + 1 |
| <span style="color:#0000ff">/articles/like/:id</span>     | PATCH  |                                                              | Status: 201<br />Body: unliked Article            | Status: 500<br />Message: internal server error  | Like an Article, Article like attribute - 1 |
| <span style="color:#0000ff">/tags/getTags</span>          | POST   | (BODY)<br />filePath:String(required)                        | Status: 200<br />Body: generated Tags             | Status: 404<br />Message: internal server error  | Generate Tag from input image               |
| <span style="color:#0000ff">/tags</span>                  | GET    |                                                              | Status: 200<br />Body: All Tags                   | Status: 404<br />Message: internal server error  | Find all tags                               |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run this commands in both client and server folders:

```
$npm install
```

```
$npm run dev
```

Access online server side via http://blogr-server.michaeltim.com

Access online client side via http://blogr.michaeltim.com



Access local server side via http://localhost:3000/

Access local client side via http://localhost:8080/