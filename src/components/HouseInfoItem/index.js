import { withRouter } from 'react-router-dom';
import './index.scss';

function HouseInfoItem(props) {
  const {
    title,
    houseCode,
    houseImg,
    desc,
    tags,
    price,
    history,
    style
  } = props;

  let infoContentTags = null

  if (tags.length > 0) {
    infoContentTags = (
      <div className="info-content__tags">
        {tags.map((tag, i) =>
          <span key={tag} className={`tag tag${i % 3 + 1}`}>{tag}</span>
        )}
      </div>
    );
  }

  return (
    <li
      className="house-info-list__item"
      onClick={() => history.push(`/detail/${houseCode}`)}
      style={style}
    >
      <img src={houseImg} alt="house info" />
      <div className="info-content">
        <h3>{title}</h3>
        <p className="info-content__desc">{desc}</p>
        {infoContentTags}
        <p className="info-content__price">
          <strong>{price}</strong>元/月
        </p>
      </div>
    </li>
  );
}

const HouseInfoItemWithRouter = withRouter(HouseInfoItem);

export default HouseInfoItemWithRouter;
