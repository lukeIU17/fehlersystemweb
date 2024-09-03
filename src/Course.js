class Course {

    constructor(courseID, courseName) {
        this.courseID = courseID;
        this.courseName = courseName;
    }

    getCourseID() {
        return this.courseID;
    }

    getCourseName() {
        return this.courseName;
    }
}

export default Course;