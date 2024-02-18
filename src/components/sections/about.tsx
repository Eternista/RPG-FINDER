interface AboutProps {
    image: string;
    title: string;
    text: string;
}


export const About = ({image, title, text} : AboutProps) => {

    return (
        <section className="l-sec l-sec-about">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-12">
                        <div className="about about-image">
                            <img src={image} alt={title} />
                        </div>
                        <div className="about about-context">
                            <h3 className="h2">{title}</h3>
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}