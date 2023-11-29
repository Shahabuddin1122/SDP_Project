import { useState, useEffect } from "react";
import styles from "./Community.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Community = () => {
  const navigate = useNavigate();
  const handleChange = () => {
    navigate('/community');
  };
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    axios.get('https://heritage-u8vo.onrender.com/community_summary')
      .then(response => setCommunities(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={styles.community} id="com">
      <div className={styles.allCommunity}>
        <button className={styles.buttons} onClick={handleChange}>
          <b className={styles.seeAllArticles}>SEE ALL ARTICLES</b>
        </button>
      </div>
      <div className={styles.articles}>
      {communities.map(community => (
        <div key={community._id} className={styles.groupParent}>
          <div className={styles.images1Wrapper}>
            <img className={styles.images1Icon} src={community.attachment} />
          </div>
          <div className={styles.wearYourStoryHandmadeJeweParent}>
            {/* <div className={styles.wearYourStory}>
              {community.community.date}
            </div> */}
            <div className={styles.handmadeJewelleryIs}>
              " {community.message} "
            </div>
            {/* <button className={styles.readArticle}>READ ARTICLE</button> */}
          </div>
        </div>
         ))}
        {/* <div className={styles.groupParent}>
          <div className={styles.images1Wrapper}>
            <img className={styles.images1Icon} alt="" src="./images/images-1@2x.png" />
          </div>
          <div className={styles.wearYourStoryHandmadeJeweParent}>
            <div className={styles.wearYourStory}>
              Wear Your Story: Handmade Jewelry, Crafted with Heart and Soul
            </div>
            <div className={styles.handmadeJewelleryIs}>
              Handmade jewellery is a labor of love, meticulously crafted by
              artisans who pour their passion and expertise into every piece.
              Each creation is a unique expression of creativity and
              craftsmanship, offering wearers a personal connection to the
              artistry behind their adornments.
            </div>
            <button className={styles.readArticle}>READ ARTICLE</button>
          </div>
        </div>
        <div className={styles.groupParent}>
          <img
            className={styles.shitolpati1Icon}
            alt=""
            src="./images/shitolpati-1@2x.png"
          />
          <div className={styles.wearYourStoryHandmadeJeweParent}>
            <div className={styles.wearYourStory}>
              Cooling Comfort Woven with Centuries of Tradition
            </div>
            <div className={styles.handmadeJewelleryIs}>
              Shital Pati is a kind of handcrafted mat with decorative designs
              that feels cold by nature. Making Shital pati is a centuries-old
              art tradition of Bangladesh. It is made by weaving together strips
              of a green cane. UNESCO has recognized the Traditional Art of
              Shital Pati weaving of Sylhet.
            </div>
            <button className={styles.readArticle}>READ ARTICLE</button>
          </div>
        </div>
        <div className={styles.groupParent}>
          <img
            className={styles.shitolpati1Icon}
            alt=""
            src="./images/download-2-1@2x.png"
          />
          <div className={styles.wearYourStoryHandmadeJeweParent}>
            <div className={styles.wearYourStory}>
              Artisans: Crafting Dreams with Love and Tradition
            </div>
            <div className={styles.handmadeJewelleryIs}>
              Artisans are the heart and soul of craftsmanship, infusing their
              creations with boundless love and dedication. Each product they
              craft is a labor of passion, a testament to their unwavering
              commitment to preserving tradition and showcasing the beauty of
              their skills.
            </div>
            <button className={styles.readArticle}>READ ARTICLE</button>
          </div>
        </div> */}
      </div>
      <div className={styles.header}>
        <b className={styles.communityHubFueling}>
          Community Hub: Fueling Creativity Together
        </b>
      </div>
    </div>
  );
};

export default Community;
