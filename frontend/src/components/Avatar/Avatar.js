import './Avatar.css';
import { config } from '../../config/config'


export default function Avatar({ thumbnail, name }) {

  const ramdonID = Math.floor(Math.random() * 10);
  
  const generateURLImage = () => {
    if (thumbnail) {
      return config.strapi.path + thumbnail[0].url
    } else {
      return `https://randomuser.me/api/portraits/lego/${ramdonID}.jpg`
    }
  }
  return (
    <picture className="Avatar">
      <img src={generateURLImage()} alt="" />
    </picture>
  )
}
