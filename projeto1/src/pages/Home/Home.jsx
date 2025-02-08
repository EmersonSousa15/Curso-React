import { useState, useEffect } from "react"
import { Card } from "../../components/Card/card";
import './styles.css'

import { CiSearch } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export const Home = () => {
    const [cards, setCards] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);

    const [isLoading, setIsLoading] = useState(false);


    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const apiUrl = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(search)}&page=${page}`;

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);

            return [];
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleSearch().then((data) => setCards(data.hits));
    }, [search, page]);


    const handlePrevPage = () => {
        if (page > 0) {
            setPage(prev => prev - 1);
        }
    }

    const handleNextPage = () => {
        setPage(prev => prev + 1);
    }

    return (
        <section className="home-container">
            <header className="header">
                <h1>Faça uma busca</h1>
                <div className="search-container">
                    <input type="text" placeholder="Pesquise..." onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={() => handleSearch()}>
                        <CiSearch size={32} color="#9f9a9a" />
                    </button>
                </div>
            </header>

            <main className="main">
                {isLoading && <h2>Carregando...</h2>}

                {!isLoading && cards?.map((card, index) => (
                    <Card key={index} author={card?.author} title={card?.title} url={card.url} />
                ))}
            </main>

            <footer className="footer">
                {cards &&
                    <div className="pagination-container">
                        <button onClick={() => handlePrevPage()}>
                            <FaChevronLeft />
                        </button>
                        <button onClick={() => handleNextPage()}>
                            <FaChevronRight />
                        </button>
                    </div>
                }
            </footer>

        </section>
    )
}