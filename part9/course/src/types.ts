interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CourseNormalPart extends CoursePartBase {
  type: 'normal'
  description: string
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartBase {
  type: 'submission'
  description: string
  exerciseSubmissionLink: string
}

interface CourseSpecialPart extends CoursePartBase {
  type: 'special'
  description: string
  requirements: string[]
}


export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart