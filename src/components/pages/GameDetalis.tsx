import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gamePostApi } from '../api/gamePostApi';
import { Banner } from '../sections/banner';

interface PostDataProps {
  id: number;
  featured_media: number;
  title: string;
  content: string;
  date: string;
}

const GameDetails = () => {
  const [postId, setPostId] = useState<number | null>(null);
  const [postData, setPostData] = useState<PostDataProps | null>(null);
  const [image, setImage] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname;
    const number = url.match(/\d+/);
    if (number) {
      setPostId(Number(number[0]));
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      if (postId !== null) {
        try {
          const gameData = await gamePostApi(`/${postId}`);
          setPostData({
            id: gameData.id,
            featured_media: gameData.featured_media,
            title: gameData.title.rendered,
            content: gameData.content.rendered,
            date: gameData.date,
          });

          // Fetch featured image after receiving post data
          fetchFeaturedImage(gameData.featured_media);
        } catch (error) {
          console.error('Something goes wrong with fetching game posts');
        }
      }
    };

    const fetchFeaturedImage = async (mediaId: number) => {
      try {
        const response = await fetch(
          `http://rpg-finder.local/wp-json/wp/v2/media/${mediaId}`
        );
        const mediaData = await response.json();
        setImage(mediaData.source_url);
      } catch (error) {
        console.error('Something goes wrong with fetching featured image');
      }
    };

    fetchData();
  }, [postId]);

  const contentToRender = postData !== null ? (
    <>
    <Banner img={image} title={postData.title} description={postData.date && new Date(postData.date).toISOString().slice(0, 10)}/>
      <section className='l-sec l-sec--context'>
        <div className="container">

          <div className="row">
            <div className='col-12' dangerouslySetInnerHTML={{ __html: postData.content }} />
          </div>

        </div>
      </section>
    </>
  ) : (
    'Loading...'
  );

  return <>{contentToRender}</>;
};

export default GameDetails;