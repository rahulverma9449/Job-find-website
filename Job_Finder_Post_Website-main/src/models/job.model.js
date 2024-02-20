

export default class JobModel {
    constructor(id, active, techType, orgName, tech, location, mode, salary, skills, applyDate, numberOfOpenings, applicants, postedTime) {
        this.id = id;
        this.active = active;
        this.techType = techType;
        this.orgName = orgName;
        this.tech = tech;
        this.location = location;
        this.mode = mode;
        this.salary = salary;
        this.skills = skills;
        this.applyDate = applyDate;
        this.numberOfOpenings = numberOfOpenings;
        this.applicants = applicants,

            this.postedTime = postedTime;
    }

    static addJob(active, techType, orgName, tech, location, mode, salary, skills, applyDate, numberOfOpenings, applicants, postedTime) {

        const newObj = new JobModel(
            jobs.length + 1,
            active,
            techType,
            orgName,
            tech,
            location,
            mode,
            salary,
            skills,
            applyDate,
            numberOfOpenings,
            applicants, // Use the formatted applicants data
            postedTime
        );

        jobs.push(newObj);
    }

    static addNewApplicatn(id, newApplicant) {
        const job = jobs.find(job => job.id === id);
        if (job) {
            if (!job.applicants) {
                job.applicants = [];
            }

            job.applicants.push(newApplicant);
        } else {
            console.log(`Job with ID -${id}- not found.`);
        }
    }
    static update(jobId, jobObj) {
            jobs[jobId-1].location = jobObj.location;
            jobs[jobId-1].orgName = jobObj.companyName;
            jobs[jobId-1].salary.first = jobObj.salary;
            jobs[jobId-1].numberOfOpenings  = jobObj.numberOfOpeningins;
            jobs[jobId-1].skills = jobObj.skillsReq;
            jobs[jobId-1].applyDate = jobObj.date;    
    }


    static getCurrentTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        };
        return now.toLocaleString(undefined, options);
    }

    static getAll() {
        return jobs;
    }
    static getById(id) {
        return jobs.find((p) => p.id == id);
    }
    static delete(id){
        const index = jobs.findIndex(
            (p) => p.id == id
          );
          jobs.splice(index, 1);
    }
    static findJobByCriteria(value) {
        const lowerCaseValue = typeof value === 'string' ? value.toLowerCase() : '';

    return jobs.filter(product => {
        return Object.values(product).some(prop => {
            if (typeof prop === 'string') {
                return prop.toLowerCase().includes(lowerCaseValue);
            }
            return false;
        });
    });
    }
}

var jobs = [
    new JobModel(
        1,
        true,
        'Tech',
        "Coding Ninja",
        "SDE",
        "Gurgaon",
        'Hybrid',
        { first: 12, second: 13 },
        ["Java", "C++", "HTML", 'React', 'Express.js', 'Node.js'],
        '2025-01-10', // Apply date
        5, // Number of openings
        [],// List of applicants or applicant count
        "10/6/2023, 8:45:12 AM",
    ),
    new JobModel(
        2,
        true,
        'Tech',
        "TechCorp",
        "Web Developer",
        "San Francisco",
        'Remote',
        { first: 15, second: 18 },
        ["JavaScript", "HTML", "CSS", "React"],
        '2025-02-15',
        3,
        [
            {
                name: "Alice Johnson",
                email: "alice@example.com",
                contact: "555-555-5555",
                url: "documents/1696852935480-Faizan Ahmadre.pdf"
            },
            {
                name: "Bob Brown",
                email: "bob@example.com",
                contact: "555-123-4567",
                url: "documents/1696852935480-Faizan Ahmadre.pdf"
            },
        ],
        "4/20/2022, 2:15:30 PM",
    ),
    new JobModel(
        3,
        false,
        'Non Tech',
        "Data Insights",
        "Data Analyst",
        "New York",
        'Onsite',
        { first: 14, second: 16 },
        ["Python", "SQL", "Data Visualization"],
        '2025-03-20',
        2,
        [
            {
                name: "Alice Johnson",
                email: "alice@example.com",
                contact: "555-555-5555",
                url: "documents/1696852935480-Faizan Ahmadre.pdf"
            },
            {
                name: "Bob Brown",
                email: "bob@example.com",
                contact: "555-123-4567",
                url: "documents/1696852935480-Faizan Ahmadre.pdf"
            },
        ],
        "8/12/2021, 11:30:45 AM"
    ),
    new JobModel(
        4,
        true,
        'Tech',
        "E-commerce Inc.",
        "UI/UX Designer",
        "Los Angeles",
        'Hybrid',
        { first: 16, second: 20 },
        ["UI/UX Design", "Adobe XD", "Figma"],
        '2025-04-05',
        4,
        [
            {
                name: "Alice Johnson",
                email: "alice@example.com",
                contact: "555-555-5555",
                url: "documents/1696852935480-Faizan Ahmadre.pdf"
            },
            {
                name: "Bob Brown",
                email: "bob@example.com",
                contact: "555-123-4567",
                url: "documents/1696852935480-Faizan Ahmadre.pdf"
            },
        ],
        "8/12/2021, 11:30:45 AM"
    ),

    new JobModel(
        5,
        false,
        'Tech',
        "JavTech",
        "Java",
        "Lcuknow",
        'Hybrid',
        { first: 16, second: 20 },
        ["UI/UX Design", "Adobe XD", "Figma"],
        '2025-04-05',
        4,
        [],
        "8/12/2021, 11:30:45 AM"
    ),

    
    
   
];

