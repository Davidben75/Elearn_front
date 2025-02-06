const CourseCard = ({
    course,
}: {
    course: {
        name: string;
        description: string;
        created: string;
        lastUpdate: string;
    };
}) => (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <header className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{course.name}</h3>
        </header>
        <div className="p-4">
            <p className="text-gray-600 mb-4">{course.description}</p>
            <footer className="text-sm text-gray-500">
                <time dateTime={course.created}>Created: {course.created}</time>
                <br />
                <time dateTime={course.lastUpdate}>
                    Last Update: {course.lastUpdate}
                </time>
            </footer>
        </div>
    </article>
);

const CourseGrid = () => {
    const courses = [
        {
            name: "Course 1",
            description: "Description of course 1",
            created: "2021-01-01",
            lastUpdate: "2021-02-01",
        },
        {
            name: "Course 2",
            description: "Description of course 2",
            created: "2021-01-01",
            lastUpdate: "2021-02-01",
        },
        {
            name: "Course 3",
            description: "Description of course 3",
            created: "2021-01-01",
            lastUpdate: "2021-02-01",
        },
        {
            name: "Course 4",
            description: "Description of course 4",
            created: "2021-01-01",
            lastUpdate: "2021-02-01",
        },
        {
            name: "Course 5",
            description: "Description of course 5",
            created: "2021-01-01",
            lastUpdate: "2021-02-01",
        },
        {
            name: "Course 6",
            description: "Description of course 6",
            created: "2021-01-01",
            lastUpdate: "2021-02-01",
        },
        {
            name: "Course 7",
            description: "Description of course 7",
            created: "2021-01-01",
            lastUpdate: "2021-02-01",
        },
        {
            name: "Course 8",
            description: "Description of course 8",
            created: "2021-01-01",
            lastUpdate: "2021-02-01",
        },
        {
            name: "Course 9",
            description: "Description of course 9",
            created: "2021-01-01",
            lastUpdate: "2021-02-01",
        },
    ];

    return (
        <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))}
            </div>
        </section>
    );
};

export default CourseGrid;
