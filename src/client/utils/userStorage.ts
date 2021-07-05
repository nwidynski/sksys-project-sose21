type User = {
    id: string,
    email: string,
    firstname:string,
    surname: string,
    createdAt: string,
    updatedAt: string
}

export namespace UserStorage {
    export const writeObj = (key: string, obj: User) => {
        sessionStorage.setItem(key, JSON.stringify(obj));     
    }
    
    export const readObj = (key:string): User => {
        return JSON.parse(String(sessionStorage.getItem(key)))  
    }
}

export default UserStorage;


