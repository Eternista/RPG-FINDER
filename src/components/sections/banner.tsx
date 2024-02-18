import React from "react";

interface BannerProps {
    images?: {
        desktop: string;
        mobile: string;
    };
    img? : string;
    title: string;
    description?: string;
}

export const Banner = ({images, title, description, img} : BannerProps) => {
    return (
        <section className="l-sec l-sec--banner">
            <div className="container">
                <div className="row">
                    <div className="col col-banner">
                        <picture>
                        {images ?
                        <>
                            <source srcSet={images?.desktop} media="(min-width: 768px)" />
                            <source srcSet={images?.mobile} media="(min-width: 1px)" />
                        </> : <>
                            <source srcSet={img} media="(min-width: 768px)" />
                            <source srcSet={img} media="(min-width: 1px)" />
                        </>}
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/epPzgAAAABJRU5ErkJggg==" alt={title}/>
                        </picture>
                        <h2>{title}</h2>
                        {description && (<h3 className="p">{description}</h3>)}
                    </div>
                </div>
            </div>
        </section>
    )

}