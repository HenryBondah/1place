document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addStudent').addEventListener('click', addStudentFields);
    document.getElementById('addCourse').addEventListener('click', addCourseField);
    document.getElementById('createClassForm').addEventListener('submit', handleFormSubmit);
    let courseCount = 0;

    function addStudentFields() {
        const container = document.getElementById('studentsContainer');
        const studentDiv = document.createElement('div');
        studentDiv.classList.add('student-entry');

        studentDiv.appendChild(createInputField('Student Name', 'text', 'studentName'));
        studentDiv.appendChild(createInputField('Age', 'number', 'studentAge'));
        studentDiv.appendChild(createFileInput('Student Picture', 'file', 'studentPicture'));
        studentDiv.appendChild(createInputField('Guardian Name', 'text', 'guardianName'));
        studentDiv.appendChild(createInputField('Guardian Phone', 'tel', 'guardianPhone'));
        studentDiv.appendChild(createInputField('Guardian Email', 'email', 'guardianEmail'));
        studentDiv.appendChild(createInputField('Other Information', 'text', 'otherInfo'));

        container.appendChild(studentDiv);
    }

    function addCourseField() {
        courseCount++;
        const container = document.getElementById('coursesContainer');
        container.appendChild(createInputField(`Course ${courseCount}`, 'text', `course${courseCount}`));
    }

    function createInputField(label, type, name) {
        const div = document.createElement('div');
        const labelElem = document.createElement('label');
        labelElem.textContent = label;
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        
        div.appendChild(labelElem);
        div.appendChild(input);
        return div;
    }

    function createFileInput(label, type, name) {
        const div = document.createElement('div');
        const labelElem = document.createElement('label');
        labelElem.textContent = label;
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.accept = 'image/*';
        
        div.appendChild(labelElem);
        div.appendChild(input);
        return div;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        createClass();
    }

    function createClass() {
        const className = document.getElementById('className').value;
        const classData = {
            className: className,
            students: gatherStudentData(),
            courses: gatherCourseData(),
            classSlogan: document.getElementById('classSlogan').value
        };

        let classes = JSON.parse(localStorage.getItem('classes')) || [];
        classes.push(classData);
        localStorage.setItem('classes', JSON.stringify(classes));

        window.location.href = '/public2/classroom/classroom.html';
    }

    function gatherStudentData() {
        let students = [];
        const studentEntries = document.querySelectorAll('.student-entry');
        studentEntries.forEach(entry => {
            students.push({
                name: entry.querySelector('[name="studentName"]').value,
                age: entry.querySelector('[name="studentAge"]').value,
                picture: entry.querySelector('[name="studentPicture"]').files[0]?.name || '',
                guardianName: entry.querySelector('[name="guardianName"]').value,
                guardianPhone: entry.querySelector('[name="guardianPhone"]').value,
                guardianEmail: entry.querySelector('[name="guardianEmail"]').value,
                otherInfo: entry.querySelector('[name="otherInfo"]').value
            });
        });
        return students;
    }

    function gatherCourseData() {
        let courses = [];
        for (let i = 1; i <= courseCount; i++) {
            const courseName = document.getElementById(`course${i}`).value;
            if (courseName) {
                courses.push(courseName);
            }
        }
        return courses;
    }
});
