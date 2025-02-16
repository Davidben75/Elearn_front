export interface EnrolledLearner {
    id: number;
    status: string;
    enrolledAt: string;
    learner: Learner;
}

export interface EnrollmentInputs {
    courseId: number;
    learners: Learner[];
}

export interface Learner {
    id: number;
    name: string;
    lastName?: string;
    email: string;
}
