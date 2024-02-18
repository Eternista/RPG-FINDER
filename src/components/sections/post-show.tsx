// PostShow.tsx

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { TextCutter } from '../functions/textCutter';

interface PostShowProps {
    id: number;
    img: number;
    title: string;
    text: string;
    category: number;
    date: string;
}

export const PostShow = ({ id, img, title, text, category, date }: PostShowProps) => {
    const [postCategory, setPostCategory] = useState('');

    useEffect(() => {
        if (category === 3) {
            setPostCategory('Dungeons & Dragons ');
        } else if (category === 4) {
            setPostCategory('Call of Cthulhu');
        } else if (category === 5) {
            setPostCategory('Warhammer');
        } else if (category === 6) {
            setPostCategory('Pathfinder');
        }
    }, [category]);

    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchFeaturedImage = async (mediaId: number) => {
            const response = await fetch(
                `http://rpg-finder.local/wp-json/wp/v2/media/${mediaId}`
            );
            const mediaData = await response.json();
            setImage(mediaData.source_url);
        };
        fetchFeaturedImage(img);
    }, [img]);

    const dateObject = new Date(date);
    const datePart = dateObject.toISOString().slice(0, 10);
    
    return (
        <>
            <div className="col-lg-4 col-sm-12 single-post">
                <div className="single-post_image">
                    <img src={image} alt="" />
                    <strong className="post-category">{postCategory}</strong>
                </div>
                <div className="single-post_content">
                    <h3>{title}</h3>
                    <h4><small>{datePart}</small></h4>
                    <TextCutter text={text} maxWords={20} />       
                    <Link to={`/games/post/${id}`} className="btn btn-primary">See More</Link>
                </div>
            </div>
        </>
    );
};
