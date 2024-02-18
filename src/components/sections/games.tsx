import React from "react";
import { Link } from "react-router-dom";
import cthImg from "../../assets/images/cthullu-cat.jpg";
import dndImg from "../../assets/images/dnd-cat.jpg";
import pathfinderImg from "../../assets/images/pathfinder-cat.jpg";
import warhammerImg from "../../assets/images/warhammer-cat.jpg"


export const GamesList = () => {


    return (
        <section className="l-sec l-sec-gameList">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="mb-5">Rpg Games</h3>
                    </div>
                    <div className="col-12 game-grid">
                        <Link to="/games/4" className="category">
                            <div className="category_img">
                                <img src={cthImg} alt="Call of Cthulhu" />
                            </div>
                            <div className="category_context">
                                <strong className="category-name">Call of Cthulhu</strong>
                            </div>
                        </Link>
                        <Link to="/games/3" className="category">
                            <div className="category_img">
                                <img src={dndImg} alt="Dungeous and Dragons" />
                            </div>
                            <div className="category_context">
                                <strong className="category-name">Dungeous and Dragons</strong>
                            </div>
                        </Link>
                        <Link to="/games/6" className="category">
                            <div className="category_img">
                                <img src={pathfinderImg} alt="Pathfinder" />
                            </div>
                            <div className="category_context">
                                <strong className="category-name">Pathfinder</strong>
                            </div>
                        </Link>
                        <Link to="/games/5" className="category">
                            <div className="category_img">
                                <img src={warhammerImg} alt="Warhammer" />
                            </div>
                            <div className="category_context">
                                <strong className="category-name">Warhammer</strong>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )

}