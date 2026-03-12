// importar pra usar no footer
import { Social } from "../../Components/Social"
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { useEffect, useState } from "react"
// trazer do banco de dados
import { db } from "../../Services/firebaseConnection"

import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore'

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinksProps {
    facebook: string;
    youtube: string;
    instagram: string;
}

export function Home() {
    const [links, setLinks] = useState<LinkProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

    useEffect(() => {
        function loadLinks() {
            // collection(conexão com banco, "nome da coleção ")
            const linksRef = collection(db, "links")
            // query: ordenar
            const queryRef = query(linksRef, orderBy("created", "asc"))
            // buscar
            getDocs(queryRef)
                .then((snapshot) => {
                    let lista = [] as LinkProps[]
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            name: doc.data().name,
                            url: doc.data().url,
                            bg: doc.data().bg,
                            color: doc.data().color,
                        })
                    })

                    setLinks(lista)
                })
        }

        loadLinks()
    }, [])

    // pode usar 2 useEffect
    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
                .then((snapshot) => {
                    if (snapshot.data() !== undefined) {
                        setSocialLinks({
                            facebook: snapshot.data()?.facebook,
                            instagram: snapshot.data()?.instagram,
                            youtube: snapshot.data()?.youtube,
                        })
                    }
                })
        }

        loadLinks()
    }, [])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Marco Aurélio Tamaki Baruco</h1>
            <span className="text-gray-50 mb-5 mt-20">Veja meus links 👇</span>
            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((link) => (
                    <section
                        style={{ backgroundColor: link.bg }}
                        key={link.id}
                        className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                        <a href={link.url} target="_blank">
                            <p className="text-base md:text-lg" style={{ color: link.color }}>
                                {link.name}
                            </p>
                        </a>
                    </section>
                ))}

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">

                        <Social url={socialLinks?.facebook}>
                            <FaFacebook size={35} color="#FFF" />
                        </Social>

                        <Social url={socialLinks?.youtube}>
                            <FaYoutube size={35} color="#FFF" />
                        </Social>

                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={35} color="#FFF" />
                        </Social>
                    </footer>
                )}
                
            </main>
            
        </div>
    )
}

// &&: verificar se é undefined, Object.keys(socialLinks).length > 0: verificar se tem alguma propriedades
// && renderiza o footer