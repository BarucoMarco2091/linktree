import { Header } from "../../Components/Header"
import { Input } from "../../Components/Input/input"
import { useState, type FormEvent, useEffect } from "react"
import { FiTrash } from 'react-icons/fi'
// import para acessar o firestore
import { db } from "../../Services/firebaseConnection"
// addDoc: adicionar documento dentro da coleção, gera um id automatico
// onSnapshot: monitora o banco em tempo real
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc,
} from "firebase/firestore"

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")
    // colocar no useState pra renderizar
    const [links, setLinks] = useState<LinkProps[]>([])

    // usar useEffect porque quer fazer tudo quando carrega a aplicação 
    // [] vazio porque quer que quando montar a aplicação ele chame o que esta dentro
    useEffect(() => {

        const linksRef = collection(db, "links")
        // query é pra fazer busca personalizada ou ordenação 
        // asc é crescente
        const queryRef = query(linksRef, orderBy("created", "asc"))
        // fazer a busca
        // snapshot: uma foto do banco
        const unsub = onSnapshot(queryRef, (snapshot) => {
            // colocar dentro de uum array
            let lista = [] as LinkProps[]
            // as LinkProps[]: fala que é uma lista de objetos 
            // percorrer a lista pode acessar cada documento e propriedade 
            // data: valor
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista)
        })

        // função unmount pra ser desmontado quando sair
        return () => {
            unsub();
        }

    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault()
        if (nameInput === "" || urlInput === "") {
            alert("Preencha todos os campos")
            return;
        }
        // cadastro no banco de dados, db: conexão com o banco
        // "links": nome da collection
        // por ultimo colocar o que você quer colocar
        // é uma promise poderia usar async e await oou .then e .catch
        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })
            .then(() => {
                setNameInput("") // apagar os campos
                setUrlInput("") // apagar os campos
                console.log("cadastrado com sucesso")
            })
            .catch((error) => {
                console.log("Erro ao cadastrar no banco" + error)
            })
    }

    // mandar o id do link que você quer deletar 
    async function handleDeleteLink(id: string) {
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef)
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input
                    placeholder="Digite o nome do link..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
                <Input
                    type="url"
                    placeholder="Digite a url..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                        <input
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                        <input
                            type="color"
                            value={backgroundColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {nameInput !== '' && (
                    <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-2">Veja como está ficando</label>
                        <article className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3"
                            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
                        >
                            <p className="font-medium" style={{ color: textColorInput }}>{nameInput}</p>
                        </article>
                    </div>
                )}

                <button type="submit" className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mb-7">
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus links
            </h2>

            {links.map((link) => (
                <article
                    key={link.id}
                    className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                    style={{ backgroundColor: link.bg, color: link.color }}
                >
                    <p>{link.name}</p>
                    <div>
                        <button
                            className="border border-dashed p-1 rounded bg-neutral-900"
                            
                            onClick={() => handleDeleteLink(link.id)}
                        >
                            <FiTrash size={18} color="#FFF" />
                        </button>
                    </div>
                </article>
            ))} 
            
        </div>
    )
}