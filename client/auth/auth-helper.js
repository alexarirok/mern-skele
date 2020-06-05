import { signout } from "./api-auth.js"

const auth = {
    isAuthenticated() {
        if(typeof window == "undefined")
            return false
        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
            return false 
    },

    Authenticate(jwt, cb) {
        if(typeof window !== "undefined")
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        cb()
    },
    
    clearJWT(cb) {
        if(typeof window !== "undefined")
            sessionStorage.removeItem('jwt')
        cb()
        signout().then((data) => {
            document.cookie = "t=; expires=Fri, 05 june 2020 00:00:00 UTC; path=/;"
        })
    }
}

export default auth
