import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pageApi } from '../api/pageApi';
import { gamePostApi } from '../api/gamePostApi';
import { Banner } from '../sections/banner';
import { PostShow } from '../sections/post-show';

interface PostData {
  id: number;
  featured_media: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  categories: number[];
  date: string;
}

function Games() {
  const { category } = useParams<{ category?: string }>();
  const [bannerData, setBannerData] = useState<any>({
    images: {
      desktop: '',
      mobile: ''
    },
    title: '',
    description: ''
  });
  const [postsData, setPostsData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(category ? parseInt(category, 10) : null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageData = await pageApi('/games/');
        setBannerData({
          images: {
            desktop: pageData.fieldValue.banner.background.desktop.url,
            mobile: pageData.fieldValue.banner.background.mobile.url
          },
          title: pageData.fieldValue.banner.title,
          description: pageData.fieldValue.banner.text
        });
      } catch (error) {
        console.error('Error in fetching /meeting:', error);
      }

      try {
        const gameData = await gamePostApi('');
        const updatedPostsData = gameData.map((item: PostData) => ({
          id: item.id,
          img: item.featured_media,
          title: item.title.rendered,
          text: item.content.rendered,
          category: item.categories[0],
          date: item.date,
        }));
        setPostsData(updatedPostsData);
      } catch (error) {
        console.error('Something goes wrong with fetching game posts');
      }
    };

    fetchData();
  }, [category]);

  const filteredPosts = postsData.filter((post: any) => {
    const matchesSearchTerm = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory !== null ? post.category === selectedCategory : true;

    return matchesSearchTerm && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (sortDirection === 'asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  return (
    <>
      <Banner images={bannerData.images} title={bannerData.title} description={bannerData.description} />
      <section className="l-sec l-sec--posts">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="post-filters">
                <input
                  type="text"
                  placeholder="Search by title"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='btn btn--search'
                />
                <button className='btn btn--seg' onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
                  {sortDirection === 'asc' ? 'Data Desc' : 'Data Asc'}
                </button>
                <select
                  className='btn btn--cat'
                  value={selectedCategory !== null ? selectedCategory.toString() : ''}
                  onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">All Categories</option>
                  <option value="3">Dungeons & Dragons</option>
                  <option value="4">Call of Cthulhu</option>
                  <option value="5">Warhammer</option>
                  <option value="6">Pathfinder</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            {sortedPosts.map((item: any) => (
              <PostShow key={item.id} id={item.id} img={item.img} title={item.title} text={item.text} category={item.category} date={item.date} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Games;