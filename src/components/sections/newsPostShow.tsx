// PostShow.tsx

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { TextCutter } from '../functions/textCutter';

interface PostShowProps {
    id: number;
    img: number;
    title: string;
    text: string;
    date: string;
}

export const NewsPostShow = ({ id, img, title, text, date }: PostShowProps) => {

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
                </div>
                <div className="single-post_content">
                    <h3>{title}</h3>
                    <h4><small>{datePart}</small></h4>
                    <TextCutter text={text} maxWords={20} />       
                    <Link to={`/news/post/${id}`} className="btn btn-primary">See More</Link>
                </div>
            </div>
        </>
    );
};
