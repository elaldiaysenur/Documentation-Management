export class mdlProject{
    id: string;
    projectName: string;
    createdDate: Date;
    updatedDate: Date;
    createdPerson: string;
    updatedPerson: string;
    totalContent: number;
    visibilityRole: number;

    constructor(id: string, projectName: string, createdDate: Date, updatedDate: Date, createdPerson: string, updatedPerson: string, totalContent: number, visibilityRole: number)
    {
        this.id = id;
        this.projectName = projectName;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.createdPerson = createdPerson;
        this.updatedPerson = updatedPerson;
        this.totalContent = totalContent;
        this.visibilityRole = visibilityRole;
    }
}

export class mdlContent{
    id: string;
    contentName: string;
    createdDate: Date;
    updatedDate: Date;
    createdPerson: string;
    updatedPerson: string;
    version: number;
    content: string;
    contentTags: mdlContentTag[];
    projectId: string;

    constructor(id: string, contentName: string, createdDate: Date, updatedDate: Date, createdPerson: string, updatedPerson: string, version: number, content: string, contentTags: mdlContentTag[], projectId: string)
    {
        this.id = id;
        this.contentName = contentName;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.createdPerson = createdPerson;
        this.updatedPerson = updatedPerson;
        this.version = version;
        this.content = content;
        this.contentTags = contentTags;
        this.projectId = projectId;
    }

}


export class mdlUser{
    id: string;
    name: string;
    surname: string;
    password: string;
    role: enmUserRole;
    createdDate: Date;
    updatedDate: Date;
    createdPerson: string;
    updatedPerson: string;
    totalProject: number;

    constructor(id: string, name: string, surname: string, password: string, role: enmUserRole,createdDate: Date, updatedDate: Date, createdPerson: string, updatedPerson: string, totalProject: number)
    {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.role = role;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.createdPerson = createdPerson;
        this.updatedPerson = updatedPerson;
        this.totalProject = totalProject;
    }

}

export class mdlVisibilityProjects{
    id: string;
    userId: string;
    projectId: string

    constructor(id: string, userId: string, projectId: string)
    {
        this.id = id;
        this.userId = userId;
        this.projectId = projectId;
    }

}

export class mdlContentTag{
  id!: string;
  tag!: string; 
}


enum enmUserRole{
    user,
    admin,
}

export interface IUserProp{
    user: mdlUser;
  }

export interface IProjectProp{
    project: mdlProject;
}

export interface IContentProp{
    content: mdlContent;
}


export class IProject {
    project: any;
    projectsControl!: string;
    userId?: string;
    visibilityProject?: mdlVisibilityProjects;
  }

export interface IContent {
    content: mdlContent;
    projectId?: string;
  }





export  interface IContentList{
    projectId?: string;
  }

export interface IDeleteContent{
    contentId: string;
    projectId?: string;
  }

 export  interface IAddContent{
    projectId: string;
  }

 export interface IOnUserProjectAddButton{
    userId?: string;
    project: mdlProject;
  }

  export interface IOnUserProjectRemoveButton{
    userId?: string;
    visibilityProjectId?: string;
  }

  export interface IProjectsList{
    projectsControl: string;
    userId?: string;
  }

  export interface IAddContentModal{
    projectId: string;
  }




  export interface IProtected{
    loggedIn: boolean,
    children: any,
} 



export interface IUserDetailUpdateButton {
  user: mdlUser;
  updatedUser: mdlUser;
  buttonActive: boolean;
  setButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUserDetailUndoButton{
  user: mdlUser,
  updatedUser: mdlUser,
  setUpdatedUser: React.Dispatch<React.SetStateAction<mdlUser>>,
  buttonActive: boolean,
}

export interface IProjectDetailUndoButton{
  project: mdlProject;
  setUpdatedProject: React.Dispatch<React.SetStateAction<mdlProject>>;
  buttonActive: boolean;
}

export interface IProjectDetailUpdateButton{
  project: mdlProject;
  buttonActive: boolean;
  setButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  updatedProject: mdlProject;
}

export interface IContentDetailUndoButton{
  content: mdlContent,
  updatedContent: mdlContent,
  setUpdatedContent: React.Dispatch<React.SetStateAction<mdlContent>>,
  buttonActive: boolean,
}

export interface IContentDetailUpdateButton {
  content: mdlContent;
  updatedContent: mdlContent;
  buttonActive: boolean;
  setButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
}
