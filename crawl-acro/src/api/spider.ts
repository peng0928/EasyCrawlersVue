import http from './http'

export interface CreateProjectParams {
    projectName: string
    tags: string
    remarks?: string // 备注是可选的
}

// 项目创建成功的响应类型
export interface ProjectResult {
    projectName: string
    tags: string[]
    remark?: string
    createTime: string
}

export interface ProjectListResult {
    page: int
    size: int
}

// 创建项目
export const createProject = (data: CreateProjectParams) => {
    return http.post<ProjectResult>('/project/create', data)
}

// 获取项目列表
export const getProjectList = (data: ProjectListResult) => {
    return http.post<ProjectResult[]>('/project/list', data)
}