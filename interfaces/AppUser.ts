// Root Interface
export default interface AppUser {
    id: string;
    username: string;
    name: string;
    profile: Profile;
    overview?: Overview;
    goals?: Goal[];
    accomplishments?: Accomplishment[];
    createdAt: string;  // ISO Date string
    modifiedAt: string; // ISO Date string
}

// profile Structure
export interface Profile {
    contact: Contact;
    educationList: Education[];
    workList: Work[];
    relationshipsList: Relationship[];
    identity: Identity;
    religionsList: Religion[];
    travelsList: Travel[];
    health: Health;
    activitiesList: Activity[];
    givingList: Giving[];
    finances: Finances;
}

// Contact Information
export interface Contact {
    email: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    address?: string;
    dateOfBirth: string;  // ISO Date string
    age?: number;
    homePhone: string;
    mobilePhone: string;
    website: string;
}

// Education Information
export interface Education {
    school: string;
    degreeType: string;
    degreeName: string;
    city: string;
    state: string;
    country: string;
    location: string;
    status: string;
    completionDate: string; // ISO Date string
    grade: string;
    gradeScale: string;
    description: string;
    personalImportance: string;
    careerImportance: string;
}

// Work Information
export interface Work {
    workTitle: string;
    employer: string;
    industry: string;
    careerLevel: string;
    wage: string;
    wageScale: string;
    city: string;
    state: string;
    country: string;
    location: string;
    startDate: string; // ISO Date string
    endDate: string;   // ISO Date string
    status: string;
    description: string;
    personalImportance: string;
    satisfaction: string;
}

// Relationship Information
export interface Relationship {
    name: string;
    dateOfBirth: string;  // ISO Date string
    relationshipType: string;
    startDate: string;    // ISO Date string
    endDate: string;      // ISO Date string
    interactionFrequency: string;
    status: string;
    relationshipImportance: string;
    description: string;
}

// Identity Information
export interface Identity {
    gender: string;
    sexuality: string;
    relationshipStatus: string;
    nationality: string;
    coreValues: string;
    technologicalLiteracy: string;
    politicalValues: string;
}

// Religion Information
export interface Religion {
    religionName?: string;
}

// Travel Information
export interface Travel {
    travelName?: string;
}

// Health Information
export interface Health {
    healthName?: string;
}

// Activity Information
export interface Activity {
    activityName?: string;
}

// Giving Information
export interface Giving {
    givingName?: string;
}

// Financial Information
export interface Finances {
    financialName?: string;
    housingSituation?: string;
}

// Overview Structure
export interface Overview {
    location?: string;
    education?: OverviewCategory;
    work?: OverviewCategory;
    relationships?: OverviewCategory;
    identity?: OverviewCategory;
    religion?: OverviewCategory;
    travel?: OverviewCategory;
    health?: OverviewCategory;
    hobbies?: OverviewCategory;
    giving?: OverviewCategory;
    finances?: OverviewCategory;
    housing?: OverviewCategory;
    goals?: string;
    achievements?: string;
    summary?: string;
}

// Overview Category
export interface OverviewCategory {
    satisfaction?: string;
    importance?: string;
    changeGoalDescription?: string;
    profileSummary?: string;
    goalsSummary?: string;
    achievementsSummary?: string;
}

// Goal Information
export interface Goal {
    id?: string;
    owner?: string;
    description?: string;
}

// Accomplishment Information
export interface Accomplishment {
    id?: string;
    goalId?: string;
    completedAt?: string;  // ISO Date string
    description?: string;
    notes?: string;
}