// Import necessary modules
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
// Import the product controller
import productController from './src/controllers/job.Controller.js';
import RecuriterController from './src/controllers/recuriter.controller.js';
import { uploadFile } from './src/middlewares/fileUpload.middleware.js';
import { auth } from './src/middlewares/auth.js';
import { setLastVisit } from './src/middlewares/lastVisit.middleare.js';
// Create an Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up EJS layouts
app.use(ejsLayouts);

// Parse JSON data in requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(setLastVisit);
app.use(session({
    secret:'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false},
  }));


// Set the view engine as EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(path.resolve(), 'src', 'views'));

// Create an instance of the ProductController
const ProductController = new productController();
const recuriterController = new RecuriterController();

// Define a route for the landing page
app.get('/', ProductController.landingPage);
app.get('/jobs', ProductController.getJob);
app.get('/job/:id', ProductController.getJobView);
app.get('/job/:id/apply', ProductController.applyJob);
app.post('/job/:id/apply', uploadFile.single('url'), ProductController.addApplication);
app.get('/job/applicants/:id',auth, ProductController.viewApplicants )

app.get('/uploads/:filename', ProductController.getResume);

app.post('/searchJobs', ProductController.jobSearch);
// setting recurter path
app.get('/register', recuriterController.getRecuriter);
app.post('/register', recuriterController.postRecuriter);

// setting loggin path
app.get('/login',  recuriterController.getLogin);
app.post('/login', recuriterController.postLogin);

//setting logout
app.get('/logout' , recuriterController.logout);

// handling posting a new job

app.get('/postJob', auth,  ProductController.getNewJob);
app.post('/postJob', auth, ProductController.postNewJob);
app.get('/job/update/:id', auth,  ProductController.jobUpdate);
app.post('/job/update/:id', auth, ProductController.postJobUpdate);

app.get('/delete/:id', auth, ProductController.deleteJob);


// Serve static files from the 'views' directory (Not typically needed)
app.use(express.static('views'));

// Export the Express application
export default app;
