/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: {
    'User': { kind: 'OBJECT'; name: 'User'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'email': { name: 'email'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'username': { name: 'username'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'firstName': { name: 'firstName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'lastName': { name: 'lastName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'ID': unknown;
    'String': unknown;
    'SignResponse': { kind: 'OBJECT'; name: 'SignResponse'; fields: { 'accessToken': { name: 'accessToken'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'refreshToken': { name: 'refreshToken'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'user': { name: 'user'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'LogoutResponse': { kind: 'OBJECT'; name: 'LogoutResponse'; fields: { 'loggedOut': { name: 'loggedOut'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; }; };
    'Boolean': unknown;
    'Resume': { kind: 'OBJECT'; name: 'Resume'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'resumeTitle': { name: 'resumeTitle'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'resumeUrl': { name: 'resumeUrl'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'resumeFormat': { name: 'resumeFormat'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'ENUM'; name: 'ResumeFormat'; ofType: null; }; } }; }; };
    'ResumeFormat': { kind: 'ENUM'; name: 'ResumeFormat'; type: 'DOCX' | 'PDF'; };
    'ApplicationPreview': { kind: 'OBJECT'; name: 'ApplicationPreview'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'candidateId': { name: 'candidateId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'candidateName': { name: 'candidateName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'candidatePosition': { name: 'candidatePosition'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'vacancyId': { name: 'vacancyId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'vacancyTitle': { name: 'vacancyTitle'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'Vacancy': { kind: 'OBJECT'; name: 'Vacancy'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'title': { name: 'title'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'description': { name: 'description'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'minSalary': { name: 'minSalary'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'maxSalary': { name: 'maxSalary'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'applications': { name: 'applications'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'ApplicationPreview'; ofType: null; }; } }; }; };
    'Int': unknown;
    'Application': { kind: 'OBJECT'; name: 'Application'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'telInterview': { name: 'telInterview'; type: { kind: 'ENUM'; name: 'InterviewStatus'; ofType: null; } }; 'telInterviewComment': { name: 'telInterviewComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'hrInterview': { name: 'hrInterview'; type: { kind: 'ENUM'; name: 'InterviewStatus'; ofType: null; } }; 'hrInterviewComment': { name: 'hrInterviewComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'techInterview': { name: 'techInterview'; type: { kind: 'ENUM'; name: 'InterviewStatus'; ofType: null; } }; 'techInterviewComment': { name: 'techInterviewComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'testTask': { name: 'testTask'; type: { kind: 'ENUM'; name: 'TestTaskStatus'; ofType: null; } }; 'testTaskComment': { name: 'testTaskComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'offer': { name: 'offer'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'offerComment': { name: 'offerComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'jobStartComment': { name: 'jobStartComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'refusalReason': { name: 'refusalReason'; type: { kind: 'ENUM'; name: 'RefusalReason'; ofType: null; } }; 'refusalReasonComment': { name: 'refusalReasonComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'vacancy': { name: 'vacancy'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Vacancy'; ofType: null; }; } }; 'candidate': { name: 'candidate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Candidate'; ofType: null; }; } }; }; };
    'InterviewStatus': { kind: 'ENUM'; name: 'InterviewStatus'; type: 'SCHEDULED' | 'COMPLETED' | 'NOT_COMPLETED'; };
    'TestTaskStatus': { kind: 'ENUM'; name: 'TestTaskStatus'; type: 'NOT_ASKED' | 'COMPLETED' | 'NOT_COMPLETED' | 'REFUSAL_TO_COMPLETE'; };
    'RefusalReason': { kind: 'ENUM'; name: 'RefusalReason'; type: 'CANDIDATE_REFUSAL' | 'HR_REFUSAL' | 'TECH_REFUSAL'; };
    'DateTime': unknown;
    'Candidate': { kind: 'OBJECT'; name: 'Candidate'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'firstName': { name: 'firstName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'lastName': { name: 'lastName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'phone': { name: 'phone'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'email': { name: 'email'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'position': { name: 'position'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'sex': { name: 'sex'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'ENUM'; name: 'Sex'; ofType: null; }; } }; 'dateOfBirth': { name: 'dateOfBirth'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; } }; 'imageUrl': { name: 'imageUrl'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'resumes': { name: 'resumes'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Resume'; ofType: null; }; } }; 'applications': { name: 'applications'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Application'; ofType: null; }; } }; }; };
    'Sex': { kind: 'ENUM'; name: 'Sex'; type: 'MALE' | 'FEMALE' | 'UNKNOWN'; };
    'MutateApplicationResponse': { kind: 'OBJECT'; name: 'MutateApplicationResponse'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'isSuccess': { name: 'isSuccess'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'hello': { name: 'hello'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'candidates': { name: 'candidates'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Candidate'; ofType: null; }; }; }; } }; 'availableCandidates': { name: 'availableCandidates'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Candidate'; ofType: null; }; }; }; } }; 'candidate': { name: 'candidate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Candidate'; ofType: null; }; } }; 'resume': { name: 'resume'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Resume'; ofType: null; }; } }; 'vacancy': { name: 'vacancy'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Vacancy'; ofType: null; }; } }; 'vacancies': { name: 'vacancies'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Vacancy'; ofType: null; }; }; }; } }; 'application': { name: 'application'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Application'; ofType: null; }; } }; 'applications': { name: 'applications'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Application'; ofType: null; }; }; }; } }; }; };
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'signUp': { name: 'signUp'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'SignResponse'; ofType: null; }; } }; 'signIn': { name: 'signIn'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'SignResponse'; ofType: null; }; } }; 'logout': { name: 'logout'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'LogoutResponse'; ofType: null; }; } }; 'getNewTokens': { name: 'getNewTokens'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'SignResponse'; ofType: null; }; } }; 'createCandidate': { name: 'createCandidate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Candidate'; ofType: null; }; } }; 'updateCandidate': { name: 'updateCandidate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Candidate'; ofType: null; }; } }; 'removeCandidate': { name: 'removeCandidate'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Candidate'; ofType: null; }; } }; 'removeResume': { name: 'removeResume'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Resume'; ofType: null; }; } }; 'createVacancy': { name: 'createVacancy'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Vacancy'; ofType: null; }; } }; 'createApplication': { name: 'createApplication'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'MutateApplicationResponse'; ofType: null; }; } }; 'updateApplication': { name: 'updateApplication'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Application'; ofType: null; }; } }; }; };
    'SignUpInput': { kind: 'INPUT_OBJECT'; name: 'SignUpInput'; inputFields: [{ name: 'email'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'username'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'firstName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'lastName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'SignInInput': { kind: 'INPUT_OBJECT'; name: 'SignInInput'; inputFields: [{ name: 'email'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }]; };
    'CreateCandidateInput': { kind: 'INPUT_OBJECT'; name: 'CreateCandidateInput'; inputFields: [{ name: 'firstName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'lastName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'phone'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'email'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'position'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'sex'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'ENUM'; name: 'Sex'; ofType: null; }; }; defaultValue: null }, { name: 'dateOfBirth'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; }; defaultValue: null }]; };
    'UpdateCandidateInput': { kind: 'INPUT_OBJECT'; name: 'UpdateCandidateInput'; inputFields: [{ name: 'firstName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'lastName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'phone'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'email'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'position'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'sex'; type: { kind: 'ENUM'; name: 'Sex'; ofType: null; }; defaultValue: null }, { name: 'dateOfBirth'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; }; defaultValue: null }, { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }]; };
    'CreateVacancyInput': { kind: 'INPUT_OBJECT'; name: 'CreateVacancyInput'; inputFields: [{ name: 'title'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'description'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'minSalary'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }, { name: 'maxSalary'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; defaultValue: null }]; };
    'CreateApplicationInput': { kind: 'INPUT_OBJECT'; name: 'CreateApplicationInput'; inputFields: [{ name: 'vacancyId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }, { name: 'candidateId'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; }; defaultValue: null }]; };
    'UpdateApplicationInput': { kind: 'INPUT_OBJECT'; name: 'UpdateApplicationInput'; inputFields: [{ name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'telInterview'; type: { kind: 'ENUM'; name: 'InterviewStatus'; ofType: null; }; defaultValue: null }, { name: 'telInterviewComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'hrInterview'; type: { kind: 'ENUM'; name: 'InterviewStatus'; ofType: null; }; defaultValue: null }, { name: 'hrInterviewComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'techInterview'; type: { kind: 'ENUM'; name: 'InterviewStatus'; ofType: null; }; defaultValue: null }, { name: 'techInterviewComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'testTask'; type: { kind: 'ENUM'; name: 'TestTaskStatus'; ofType: null; }; defaultValue: null }, { name: 'testTaskComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'offer'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; defaultValue: null }, { name: 'offerComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'jobStartComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'refusalReason'; type: { kind: 'ENUM'; name: 'RefusalReason'; ofType: null; }; defaultValue: null }, { name: 'refusalReasonComment'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
  };
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}