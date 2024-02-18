import React, { useEffect, useState } from 'react';
import { pageApi } from '../api/pageApi';
import { Banner } from '../sections/banner';
import { About } from '../sections/about';
import { GamesList } from '../sections/games';


function Home() {

    const [bannerData, setBannerData] = useState<any>({
      "images": {
        "desktop": '',
        "mobile": ''
      },
      "title": '',
      "description": ''
    });
    const [aboutData, setAboutData] = useState<any>({
      "image": ' ',
      "title": '',
      "description": ''
    });
    

  useEffect(() => {
    const fetchData = async () => {
        try {
          await pageApi('/home')
          .then(data => {

            setBannerData(
              {
                "images": {
                  "desktop": data.fieldValue.banner.background.desktop.url,
                  "mobile": data.fieldValue.banner.background.mobile.url
                },
                "title": data.fieldValue.banner.title,
                "description": data.fieldValue.banner.text
              }
            );
              console.log(data.fieldValue);
              setAboutData({
                "image": data.fieldValue.about.image.url,
                "title": data.fieldValue.about.title,
                "text": data.fieldValue.about.text,
              })
          })
        } catch (error) {
          console.error('Error in fetching /meeting:', error);
        }
      };
  
      fetchData();
  }, []);

  return (
    <>
      <Banner images={bannerData.images} title={bannerData.title} description={bannerData.description}/>
      <GamesList />
      <About image={aboutData.image} title={aboutData.title} text={aboutData.text} />
    </>
  );
}

export default Home;
