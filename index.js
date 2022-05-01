const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Verbonden met de mongoDB'))
    .catch(err => console.error('Kan niet verbinden met de DB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

//Create a new course
async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'M. Dima',
        tags: ['node', 'backend'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result);
}

//Get all courses
async function getCourses(){
    const courses = await Course.find();
    console.log(courses);
}

//Get course(s) filtered
async function getCourse(){
    const courses = await Course
    .find({author: 'M. Dima', isPublished: true})
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    //console.log(courses);
    return courses;
}

//Update one course
async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return;

    course.set({
        isPublished: true,
        author: 'Another author'
    });

    const result = await course.save();
    console.log(result);
}

//Update one course Update first
async function updateCourse2(id){
    //const result = await Course.update(
    const result = await Course.findByIdAndUpdate(id,
        //{ _id: id},
        {
            $set: {
                author: "M. Dima",
                isPublished: false
            }
        }, {new: true }
    );
    console.log(result);    
}

//delete one course
async function removeCourse(id){
    //const result = await Course.deleteOne({_id: id});
    //als je het vewijderd document wilt retourneren
    const result = await Course.findByIdAndRemove({_id: id});
    console.log(result);
}

//delete many courses
async function removeManyCourses(){
    const result = await Course.deleteMany({isPublished: true});
    console.log(result);
}


//createCourse();
//getCourses();
//getCourse();

async function run(){
    //const courses = await getCourse();
    //console.log(courses);
    //updateCourse('626e7c5d05fdb5d20680db3d');
    //updateCourse2('626e7c5d05fdb5d20680db3d');
    //removeCourse('626e7c6439f18b6ca27ca510');
    removeManyCourses();
}

run();