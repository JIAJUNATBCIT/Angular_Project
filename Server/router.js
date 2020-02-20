var HomeController   = require('./Controllers/HomeController');
var UserController   = require('./Controllers/UserController');
const authMiddleware = require('./authHelper')
const cors           = require('cors');


// Routes
module.exports = function(app){  
    // Main Routes
    app.get('/',      HomeController.Index);

    // Sign in
    app.post('/auth', cors(),
        // middleware that handles the sign in process
        authMiddleware.signIn,
        authMiddleware.signJWTForUser
    )

    app.post('/User/Register', cors(),
        UserController.RegisterUser)
    
    app.post('/User/Update', cors(),
        authMiddleware.requireJWT, UserController.UpdateUser)

    app.post('/User/UpdateSalary', cors(),
        authMiddleware.requireJWT, UserController.UpdateSalary)

    app.get('/User/AllUsers', cors(),
        authMiddleware.requireJWT, UserController.GetAllUsers)

    app.get('/User/AllUsersWithSalary', cors(),
        authMiddleware.requireJWT, UserController.GetAllUsersWithSalary)

    // Accessible to authenticated user. CORS must be enabled
    // for client App to access it.
    app.get('/User/StaffAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.StaffAreaJwt)

    // Accessible to manager or admin. CORS must be enabled for
    // client App to access it.
    app.get('/User/ManagerAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.ManagerAreaJwt)

    // Accessible to manager or admin. CORS must be enabled for
    // client App to access it.
    app.get('/User/HRAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.HRAreaJwt)

};
