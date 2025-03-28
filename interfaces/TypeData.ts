export default interface TypeData {
    states: TypeGroup;
    countries: TypeGroup;
    genders: TypeGroup;
    threeLevelList: TypeGroup;
    fiveLevelList: TypeGroup;
    sevenLevelList: TypeGroup;
    educationDegreeList: TypeGroup;
    educationStatusList: TypeGroup;
    educationGradeScaleList: TypeGroup;
    workIndustryList: TypeGroup;
    workCareerLevelList: TypeGroup;
    workWageScaleList: TypeGroup;
    workStatusList: TypeGroup;
    relationshipTypeList: TypeGroup;
    relationshipStatusList: TypeGroup;
    frequenciesList: TypeGroup;
}

export interface TypeGroup {
    id: number;
    name: string;
    description: string;
    version: number;
    data: TypeListItem[];
    lastUpdated: string | null;
}

export interface TypeListItem {
    id: number;
    value: string;
}