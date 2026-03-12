import { Header } from "../../Components/Header"
import { Input } from "../../Components/Input/input"
import { useState, type FormEvent, useEffect } from "react"

import { db } from "../../Services/firebaseConnection"
import {
    setDoc, // criar um documento mas agente escreve o nome
    doc,
    getDoc // buscar  1x um documento 
} from 'firebase/firestore'

export function Networks() {
    const [facebook, setFacebook] = useState("")
    const [youtube, setYoutube] = useState("")
    const [instagram, setInstagram] = useState("")

    useEffect(() => {

        function loadLinks() {
            // buscar links
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                // verificar se está vazio, undefined
                if(snapshot.data() !== undefined) {
                    // ? pode ser vazio, se não existir vai colocar como vazio , senão colocar ?  gera erro
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }
            })
        }

        loadLinks()

    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault();
        // cadastrar uma nova collection, pois ela não pertence ao "links"
        // setDoc(doc(conexão(db), nome da collection, nome do documento))
        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagram: instagram,
            youtube: youtube
        })
        .then(() => {
            console.log("cadastrado com sucesso")
        })
        .catch((error) => {
            console.log("Erro" + error)
        })
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>
            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input
                type="url"
                placeholder="Digite a url do facebook..."
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                />

                 <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
                <Input
                type="url"
                placeholder="Digite a url do instagram..."
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                />

                 <label className="text-white font-medium mt-2 mb-2">Link do youtube</label>
                <Input
                type="url"
                placeholder="Digite a url do youtube..."
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                />

                <button
                className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium" 
                type="submit"
                >Salvar links
                </button>
            </form>
        </div>
    )
}