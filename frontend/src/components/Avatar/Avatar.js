import './Avatar.css';

export default function Avatar({thumbnail, name}){
    const srcImage = thumbnail || 'https://eu.ui-avatars.com/api/?name=John+Doe'
    const altImage = name || 'Alt no declarado'
    return (
        <figure className="Avatar">
          <img src={srcImage} alt={altImage} />
        </figure>
    )
}