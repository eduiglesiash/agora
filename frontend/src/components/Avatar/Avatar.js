import './Avatar.css';

export default function Avatar({ id, thumbnail, name }) {
  const src = `https://randomuser.me/api/portraits/lego/${id}.jpg`
  const altImage = name || 'Alt no declarado'
  return (
    <picture className="Avatar">
      <img src={src} alt={altImage} />
    </picture>
  )
}