import './styles.css'
import { FaRegUserCircle } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { CiLink } from "react-icons/ci";


export const Card = ({ author, title, url }) => {


    if (!author || !title || !url) return

    return (

        <div className='card-container'>
            <div className='item author'>
                <FaRegUserCircle size={25} color="#9f9a9a" />
                <p>

                    <strong>{author}</strong>
                </p>
            </div>
            <div className='item'>
                <FaBook size={25} color="#9f9a9a" />
                <p>

                    <strong>{title}</strong>
                </p>
            </div>
            <div className='item url'>
                <CiLink size={45}/>
                <a href={url} target='_blank'>
                    {url}
                </a>
            </div>
        </div>
    )
}