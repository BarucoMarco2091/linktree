import { useEffect, useState, type ReactNode } from 'react'
import { auth } from '../Services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router'

interface PrivateProps {
    children: ReactNode;
}
// any: não vou falar o que vai retornar
export function Private({ children }: PrivateProps): any {
    // fazer controle, criar 2 estados
    const [loading, setLoading] = useState(true) // começar carregando
    const [signed, setSigned] = useState(false) // não tem usuário logado

    // quando o componente é montado o useeffect
    useEffect(() => {
        // verificar se tem usuário logado

        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }
                // salvar no localStorage
                localStorage.setItem("@reactlinks", JSON.stringify(userData))
                setLoading(false)
                setSigned(true) // esta logado
            }else{
                setLoading(false)
                setSigned(false) // não esta logado
            }
        })

        // cancelar o olheiro (onAuthStateChanged) pra não perder performances 
        return () => {
            unsub()
        }
    }, [])

    if(loading) {
        return <div></div>
    }

    if(!signed) {
        return <Navigate to="/login"/>
    }

    // fornecer onde vai renderizar a rota
    return children;
}