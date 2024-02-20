import JobModel from "../models/job.model.js";
import sendMail from "./mailSender.js";
class ProductController {
 
  landingPage(req, res) {
    res.render('index', { userEmail: req.session.userEmail });
  }

  getJob(req, res) {
    var jobs = JobModel.getAll();
    res.render('jobs', { jobs: jobs, userEmail: req.session.userEmail });
  }

  getJobView(req, res) {
    const jobId = parseInt(req.params.id);
    const jobFound = JobModel.getById(jobId);
    if (jobFound) {
      return res.render('DetailViewJob', { jobId: jobId, jobObj: jobFound, userEmail: req.session.userEmail });
    } else {
      return res.send("Product NOt Found Details");
    }
  }

  applyJob(req, res, next) {
    const id = req.params.id;
    if (id) {
      const jobFound = JobModel.getById(id);
      if (jobFound) {
        res.render('applyForm', { jobId: id, userEmail: req.session.userEmail });
      } else {

        res.send("Job Not Found");
      }
    } else {
      res.send("Invalid job ID");
    }
  }


  addApplication(req, res) {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const jobId = parseInt(req.params.id);
    if (isNaN(jobId)) {
      return res.status(400).send('Invalid job ID.');
    }

    const { name, email, contact } = req.body;
    const url = 'documents/' + req.file.filename;
    const newApplicant = {
      name,
      email,
      contact,
      url,
    };
    sendMail(email);
    JobModel.addNewApplicatn(jobId, newApplicant);
    res.redirect('/jobs');
  }


  getNewJob(req, res) {
    return res.render('addingNewJob', { userEmail: req.session.userEmail });
  }

  postNewJob(req, res) {
    const { jobCat, jobDesign, location, companyName, salary, numberOfOpeningins, skillsReq, date } = req.body;
    const currentTime = JobModel.getCurrentTime();
    const salaryObject = {
      first: salary,
      second: null,
    }
    JobModel.addJob(true, jobCat, companyName, jobDesign, location, null, salaryObject, skillsReq, date, numberOfOpeningins, 0, currentTime);
    const jobs = JobModel.getAll();

    res.render('jobs', { jobs, userEmail: req.session.userEmail });
  }

  viewApplicants(req, res) {
    const id = req.params.id;
    const job = JobModel.getById(id);
    res.render('applicantsList', { applications: job.applicants, userEmail: req.session.userEmail });
  }

  getResume(req, res) {
    const filename = req.params.filename;
    const filePath = `public/documents/${filename}`;
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res.status(404).send('File not found');
      }

      // If the file exists, serve it
      res.sendFile(filePath);
    });
  }
  jobUpdate(req, res){
    const id =req.params.id;
    const job = JobModel.getById(id);
    res.render('updateJob' , {job:job});
  }

  postJobUpdate(req , res){
    
    const jobObj = req.body;
    var jobs = JobModel.getAll();
    JobModel.update(req.params.id, jobObj);
    res.redirect('/jobs' );


  }
  deleteJob(req, res){
    JobModel.delete(req.params.id);
    console.log(req.params.id);
    res.redirect('/jobs');
  }
  jobSearch(req, res){
    console.log(req.body);
    const jobs = JobModel.findJobByCriteria(req.body);
    console.log(jobs);
    res.render('jobs', {jobs, userEmail: req.session.userEmail});
  }
}
export default ProductController;

