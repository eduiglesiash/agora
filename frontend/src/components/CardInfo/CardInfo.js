import './CardInfo.css'
import { config } from '../../config/config'
import classname from 'classname'


export default function CardInfo({ cardType, number, text }){
    const type = config.colorTags[cardType]
    const typeStyle = classname("Tag", type)
    return (
        <article className="Card">
            <h2 className="Card__title">{text}</h2>
            <span className={typeStyle}>{number}</span>
        </article>
    )
}