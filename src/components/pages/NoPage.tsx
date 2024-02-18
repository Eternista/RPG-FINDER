import errorImage from '../../assets/images/404.jpg'

export const NoPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <img className="img-404" src={errorImage} />
                </div>
            </div>
        </div>
    )
}